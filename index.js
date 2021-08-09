
const ndjson = require('ndjson')
const csv = require('fast-csv')
const xlsxparse = require('xlsx-parse-stream')
const XLSXWriteStream = require('@atomictech/xlsx-write-stream').default

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
