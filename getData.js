import siteId from './siteId.js';
import token from './token.js';

// https://vrm-api-docs.victronenergy.com/#/operations/installations/idSite/data-download
const url = `https://vrmapi.victronenergy.com/v2/installations/${siteId}/data-download?datatype=kwh&format=csv&debug=true&async=false&start=0`;
const headers = { 'X-Authorization': `Bearer ${token}` };
const response = await fetch(url, { headers });
const data = await response.text();

const rows = data.split(/\r\n/g);
const columns = rows.shift().split(',');
const units = rows.shift().split(',');

for (const row of rows) {
  const cells = row.split(',');
  for (let index = 0; index < columns.length; index++) {
    const cell = cells[index];
    const unit = units[index];
    if (!cell) {
      continue;
    }

    const column = columns[index];
    console.log(`${index === 0 ? '' : '\t'}${column}: ${cell} ${unit}`);
  }
}
