
const fs = require('fs')
const { xlsx, csv } = require('..')

process.stdin
.pipe(xlsx.parse())
.pipe(csv.format())
.pipe(process.stdout)
