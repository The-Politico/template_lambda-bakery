const glob = require('glob');
const fs = require('fs-extra');

const SWEEP_FILES = [
  'client.js',
  'client.css',
  'styles.css',
  'page.js',
  '_build.js',
  '_hydrate.js',

  'client-*.js',
  'client-*.css',
  'styles-*.css',
  'page-*.js',
  '_build-*.js',
  '_hydrate-*.js',

  '.DS_Store',
];

function sweep(directory) {
  const files = glob.sync(`${directory}/**/{${SWEEP_FILES.join()}}`);
  return Promise.all(files.map(f => {
    return fs.remove(f);
  }));
};

module.exports = sweep;

if (require.main === module) {
  sweep('./templates/dist');
}
