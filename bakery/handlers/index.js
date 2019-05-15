import glob from 'glob';
import path from 'path';

const actions = {};

const modules = glob.sync('*.js', { cwd: __dirname });

modules.forEach((file) => {
  if (file === path.basename(__filename)) return; // Ignore this file
  const module = require(path.join(__dirname, file));
  // Ignore files without exported ACTION
  if (module.ACTION) actions[module.ACTION] = module.default;
});

export default actions;
