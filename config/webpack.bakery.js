const path = require('path');

module.exports = {
  resolve: {
    alias: {
      Root: path.resolve(__dirname, '..'),
      Bakery: path.resolve(__dirname, '../templates/dist'),
      Config: path.resolve(__dirname, '../config'),
      BakeryUtils: path.resolve(__dirname, '../templates/src/common/utils'),
      ServerConstants: path.resolve(__dirname, '../bakery/src/constants'),
      ServerUtils: path.resolve(__dirname, '../bakery/src/utils'),
      ServerHandlers: path.resolve(__dirname, '../bakery/src/handlers'),
    },
  },
};
