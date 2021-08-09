
const fs = require('fs')
const { xlsx } = require('..')

process.stdin
.pipe(xlsx.parse({ selector: 'Sheet1' }))
.pipe(xlsx.stringify({ header: true }))
.pipe(process.stdout)
