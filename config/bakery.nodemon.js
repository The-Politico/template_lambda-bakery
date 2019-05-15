const path = require('path');
const nodemon = require('nodemon');

const BAKERY_DIR = path.resolve(__dirname, '../bakery/');
const BABEL_CONFIG = path.resolve(__dirname, '../config/bakery.babel.dev.js');
const SERVER_SCRIPT = path.resolve(__dirname, '../dev/bakery/index.js');

nodemon({
  watch: BAKERY_DIR,
  exec: `babel-node --config-file  ${BABEL_CONFIG} ${SERVER_SCRIPT}`,
});

nodemon.on('start', function() {
  console.log('App has started!');
}).on('quit', function() {
  console.log('App has quit!');
  process.exit();
}).on('restart', function(files) {
  console.log('App restarted due to: ', files);
});
