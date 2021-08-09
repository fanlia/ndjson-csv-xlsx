# ndjson-csv-xlsx
ndjson, csv, xlsx parser and builder

## features

- unified api, just `.parse` and `.stringify`
- stream in and out

## usage
```sh
npm i ndjson-csv-xlsx
```

## tests

```sh
cat test/data.ndjson | node test/ndjson_test.js
cat test/data.csv | node test/csv_test.js
cat test/data.xlsx | node test/xlsx_test.js
```
