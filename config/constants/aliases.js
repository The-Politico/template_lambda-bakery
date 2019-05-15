const path = require('path');

// These aliases are shared across compilers.
module.exports = {
  Bakery: path.resolve(__dirname, '../../bakery/'),
  Client: path.resolve(__dirname, '../../client/'),
  Config: path.resolve(__dirname, '..'),
  Dev: path.resolve(__dirname, '../../dev/'),
  Dist: path.resolve(__dirname, '../../dist/'),
  'package.json': path.resolve(__dirname, '../../package.json'),
  'politico-components': 'politico-style/js/lib/components/base',
};
