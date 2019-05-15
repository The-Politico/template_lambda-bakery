const glob = require('glob');
const fs = require('fs-extra');

// Cleans out the client files
function sweep() {
  const files = glob.sync('./dist/client/**');
  return Promise.all(files.map(f => fs.remove(f)));
};

module.exports = sweep;

if (require.main === module) {
  sweep();
}
