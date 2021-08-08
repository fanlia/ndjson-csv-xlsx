
const fs = require('fs')
const { ndjson } = require('..')

process.stdin
.pipe(ndjson.parse())
.pipe(ndjson.stringify())
.pipe(process.stdout)
