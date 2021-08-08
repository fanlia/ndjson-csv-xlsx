
const { Duplex } = require('stream')
const unzipper = require('unzipper')
const Saxophone = require('saxophone')

const kSource = Symbol('source')

const parse_xml = (stream, callback) => {

    return new Promise((resolve, reject) => {
        const parser = new Saxophone()

        let tags = []

        parser.on('tagopen', tagopen => {
            tags.unshift({
                ...tagopen,
            })
        })

        parser.on('tagclose', tagclose => {
            if (tags.length > 0) {
                callback(tags)
            }
            tags.shift()
        })

        parser.on('text', text => {
            if (tags.length > 0) {
                tags[0].text = text.contents
            }
        })

        parser.on('finish', () => {
            resolve()
        })

        parser.on('error', (e) => {
            reject(e)
        })

        stream.pipe(parser)

    })
}

const parse_xlsx = async (xlsx, push) => {

    const sharedStrings = []

    await parse_xml(xlsx.sharedStrings, (tags) => {
        if (tags.length > 2 && tags[0].name === 't' && tags[1].name === 'si') {
            sharedStrings.push(tags[0].text)
        }
    })

    let row_data = []
    await parse_xml(xlsx.sheet, (tags) => {
        if (tags.length > 3 && tags[0].name === 'v' && tags[1].name === 'c' && tags[2].name === 'row') {
            const v = parseInt(tags[0].text)
            let [_, col, row, type] = tags[1].attrs.match(/r="(\w+)(\d+)" t="(\w+)"/)
            const text = sharedStrings[v]
            if (row_data.length > 0 && row_data[0].row !== row) {
                const data = row_data.reduce((m, d) => ({ ...m, [d.col]: d.text }), {})
                push(data)
                row_data = []
            }
            row_data.push({row, col, text})
        }
    })
    if (row_data.length > 0) {
        const data = row_data.reduce((m, d) => ({ ...m, [d.col]: d.text }), {})
        push(data)
        row_data = []
    }
}

const parse = () => {

    const stream = new Duplex({
        readableObjectMode: true,
        construct(callback) {
            const xlsx = {}
            this[kSource] = unzipper.Parse()
            this[kSource].on('entry', (entry) => {
                const fileName = entry.path;
                const type = entry.type; // 'Directory' or 'File'
                const size = entry.vars.uncompressedSize; // There is also compressedSize;

                if (fileName === "xl/sharedStrings.xml") {
                    xlsx.sharedStrings = entry
                // } else if (fileName === 'xl/styles.xml') {
                //     xlsx.styles = entry
                // } else if (fileName === 'xl/workbook.xml') {
                //     xlsx.workbook = entry
                } else if (fileName === 'xl/worksheets/sheet1.xml') {
                    xlsx.sheet = entry
                } else {
                    entry.autodrain();
                }
                // this.push({fileName, type, size})

            }).on('finish', () => {
                const push = (data) => this.push(data)
                parse_xlsx(xlsx, push).catch(err => this.destroy(err))

            })
            callback()
        },

        write(chunk, encoding, callback) {
            this[kSource].write(chunk)
            callback()
        },

        read(size) {

        },
    })

    return stream
}

exports.parse = parse
