/* DEVELOPMENT SERVER */
const portfinder = require('portfinder');
require('dotenv').config();

const server = require('./src');

portfinder.basePort = 3333;

portfinder.getPortPromise().then(port => {
  server.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
