import siteId from './siteId.js';
import token from './token.js';

// https://vrm-api-docs.victronenergy.com/#/operations/installations/idSite/stats
const url = `https://vrmapi.victronenergy.com/v2/installations/${siteId}/stats`;
const headers = { 'X-Authorization': `Bearer ${token}` };
const response = await fetch(url, { headers });
const data = await response.json();

if (!data.success) {
  console.log(data);
  throw new Error('The returned response did not indicate a success.');
}

console.log(JSON.stringify(data, null, 2));
