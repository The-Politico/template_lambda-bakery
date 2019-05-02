const path = require('path');
const glob = require('glob');

const srcPath = path.join(__dirname, '../../templates/src/');
const distPath = path.join(__dirname, '../../templates/dist/');

module.exports = glob.sync(`${srcPath}/**/components/App.jsx`).map(fp => {
  const name = fp.split(srcPath)[1].split('/components/App.jsx')[0];
  const compSrcPath = fp.split('/components/App.jsx')[0];
  const staticPath = path.join(distPath, name);

  let renderer = () => '';
  try {
    renderer = require(`${distPath}${name}/render`).default;
  } catch (e) {
    if (!(e.code === 'MODULE_NOT_FOUND')) {
      throw e;
    }
  }

  let example = null;
  try {
    example = require(`${srcPath}/example`);
  } catch (e) {
    if (!(e.code === 'MODULE_NOT_FOUND')) {
      throw e;
    }
  }

  return {
    name,
    staticPath,
    renderer,
    example,
    srcPath: compSrcPath,
  };
});
