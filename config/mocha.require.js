const path = require('path');

require('dotenv').config({
  path: path.resolve(__dirname, '../dev/test/.env'),
});

require('@babel/register')({
  extends: path.join(__dirname, 'bakery.babel.dev.js'),
});
