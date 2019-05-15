const portfinder = require('portfinder');

const server = require('Bakery/server/');

portfinder.basePort = 3333;

portfinder.getPortPromise().then(port => {
  server.listen(port, () => console.log(`Bakery server listening on port ${port}!`));
});
