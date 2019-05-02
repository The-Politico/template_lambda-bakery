const path = require('path');
const glob = require('glob');

const { SRC_PATH, DIST_PATH } = require('./paths');

module.exports = glob.sync(`${SRC_PATH}/**/renderer/index.js`).map(fp => {
  const name = fp.split(SRC_PATH)[1].split('/renderer/index.js')[0];
  const compSrcPath = fp.split('/renderer/index.js')[0];
  const staticPath = path.join(DIST_PATH, name);

  return {
    name,
    staticPath,
    srcPath: compSrcPath,
  };
});
