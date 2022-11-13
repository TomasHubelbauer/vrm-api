import fs from 'fs';
import password from './password.js';
import userName from './userName.js';

// https://vrm-api-docs.victronenergy.com/#/operations/auth/login
const url = 'https://vrmapi.victronenergy.com/v2/auth/login';

// Use `remember_me` to get a long-lived token
const body = { username: userName, password, remember_me: true };
const response = await fetch(url, { method: 'POST', body: JSON.stringify(body) });
const data = await response.json();

if (!data.token) {
  throw new Error(`The response object did not contain a 'token' field.`);
}

if (!data.idUser) {
  throw new Error(`The response object did not contain a 'idUser' field.`);
}

await fs.promises.writeFile('token.js', `export default '${data.token}';\n`);
await fs.promises.writeFile('userId.js', `export default '${data.idUser}';\n`);
