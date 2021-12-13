# ndjson-csv-xlsx
stream from and to ndjson, csv, xlsx, json

## features

- unified api, just `.parse` and `.stringify`
- stream from and to

## usage
```sh
npm i ndjson-csv-xlsx
```

## tests

```sh
cat test/data.ndjson | node test/ndjson_test.js
cat test/data.csv | node test/csv_test.js
cat test/data.xlsx | node test/xlsx_test.js
cat test/data.json | node test/json_test.js
```

## license

MIT
