const config = require('config')
const fs = require('fs')

for (const database of config.get('databases')) {
  for (const table of database[1]) {
    const dst = `${config.get('dst')}/${database[0]}.${table}.ndjson.gz`
    if (fs.existsSync(dst)) {
      console.error(`${dst}: skipped`)
      continue
    }
    console.log(`ogr2ogr -overwrite -f GeoJSONSeq -lco RS=NO -lco COORDINATE_PRECISION=9 -lco SIGNIFICANT_FIGURES=7 /vsistdout/ PG:"dbname='${database[0]}' host='${config.get('host')}' port='${config.get('port')}' user='${config.get('user')}' password='${config.get('password')}'" -sql "SELECT * FROM ${table}" | gzip -9 > ${dst}; echo ${dst}: complete`)
  }
}
