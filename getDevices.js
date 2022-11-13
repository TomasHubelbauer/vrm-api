import siteId from './siteId.js';
import token from './token.js';

// https://vrm-api-docs.victronenergy.com/#/operations/installations/idSite/system-overview
const url = `https://vrmapi.victronenergy.com/v2/installations/${siteId}/system-overview`;
const headers = { 'X-Authorization': `Bearer ${token}` };
const response = await fetch(url, { headers });
const data = await response.json();

if (!data.success) {
  throw new Error('The returned response did not indicate a success.');
}

if (!data.records?.devices?.length) {
  throw new Error('The response data array is either missing or empty.');
}

for (const device of data.records.devices) {
  console.log(device.name);
}
