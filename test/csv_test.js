
const fs = require('fs')
const { csv } = require('..')

process.stdin
.pipe(csv.parse())
.pipe(csv.stringify())
.pipe(process.stdout)
