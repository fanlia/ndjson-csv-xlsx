
const fs = require('fs')
const { json } = require('..')

process.stdin
.pipe(json.parse())
.pipe(json.stringify())
.pipe(process.stdout)
