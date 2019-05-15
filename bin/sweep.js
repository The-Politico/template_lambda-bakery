const glob = require('glob');
const fs = require('fs-extra');

function sweepClient() {
  const files = glob.sync('./dist/client/**');
  return Promise.all(files.map(f => fs.remove(f)));
};

module.exports = sweep;

if (require.main === module) {
  sweepClient();
}
