
const ndjson = require('ndjson')
const csv = require('fast-csv')
const xlsxparse = require('xlsx-parse-stream')
const XLSXWriteStream = require('@atomictech/xlsx-write-stream').default
const StreamArray = require('stream-json/streamers/StreamArray')
const {stringer} = require('stream-json/Stringer')
const {disassembler} = require('stream-json/Disassembler')
const {chain}  = require('stream-chain')

exports.ndjson = {
    parse: (...args) => ndjson.parse(...args),
    stringify: (...args) => ndjson.stringify(...args),
}
exports.csv = {
    parse: (...args) => csv.parse(...args),
    stringify: (...args) => csv.format(...args),
}
exports.xlsx = {
    parse: (...args) => xlsxparse(...args),
    stringify: (...args) => new XLSXWriteStream(...args),
}
exports.json = {
    parse: (...args) => chain([
        StreamArray.withParser(...args),
        data => data.value,
    ]),
    stringify: (options, ...args) => chain([
        disassembler(),
        stringer({ ...options, makeArray: true }),
    ]),
}
