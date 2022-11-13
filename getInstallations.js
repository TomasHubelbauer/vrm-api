import fs from 'fs';
import token from './token.js';
import userId from './userId.js';

// https://vrm-api-docs.victronenergy.com/#/operations/users/idUser/installations
const url = `https://vrmapi.victronenergy.com/v2/users/${userId}/installations`;
const headers = { 'X-Authorization': `Bearer ${token}` };
const response = await fetch(url, { headers });
const data = await response.json();

if (!data.success) {
  throw new Error('The returned response did not indicate a success.');
}

if (!data.records?.length) {
  throw new Error('The response data array is either missing or empty.');
}

if (data.records.length > 1) {
  console.log('Note that multiple installations exist, using the first.');
}

await fs.promises.writeFile('siteId.js', `export default '${data.records[0].idSite}';\n`);
