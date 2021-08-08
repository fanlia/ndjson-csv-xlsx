
const fs = require('fs')
const { csv } = require('..')

process.stdin
.pipe(csv.parse())
.pipe(csv.format())
.pipe(process.stdout)
