import siteId from './siteId.js';
import token from './token.js';

// https://vrm-api-docs.victronenergy.com/#/operations/installations/idSite/diagnostics
const url = `https://vrmapi.victronenergy.com/v2/installations/${siteId}/diagnostics`;
const headers = { 'X-Authorization': `Bearer ${token}` };
const response = await fetch(url, { headers });
const data = await response.json();

if (!data.success) {
  throw new Error('The returned response did not indicate a success.');
}

if (!data.records?.length) {
  throw new Error('The response data array is either missing or empty.');
}

const desiredAttributes = [
  47, // Voltage
  49, // Current
  50, // Consumed Amphours
  51, // State of charge
  52, // Time to go
];

for (const record of data.records) {
  if (!desiredAttributes.includes(record.idDataAttribute)) {
    continue;
  }

  console.log(record.description, record.formattedValue);
}
