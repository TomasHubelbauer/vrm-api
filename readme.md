# Victron VRM API Node

0. Create `userName.js` and `password.js` with `export default '…';` contents
1. `node login` to use the user name and password for `token.js` and `userId.js`
2. `node getInstallations` to get `siteId.js` of the first/only installation
3. `node makeCharts` for the WIP PV yield versus battery SOC charts

Re-run `node login` in case the token expires.

## To-Do

### Finalize the `makeCharts.js` script

I want to plot PV production, PV consumption, battery consumption and battery
SOC for each day.

### Look into more of the API endpoints

https://vrm-api-docs.victronenergy.com

I have looked at the absolute basics only so far, I have yet to look at the
widgets sections.

### Look into using access token over a bearer token in the scripts

Currently the scripts exchange the user name and password for a bearer token
which is used in `X-Authorization`, e.g.: `Bearer $token`.

It might make sense to not effectively impersonate the user by using the bearer
token but instead register an access token and use that to appear as a 3rd party
integration in the logs etc.

https://vrm-api-docs.victronenergy.com/#/operations/users/idUser/accesstokens/create

I need to verify this would actually appear different in the logs still.
