const cli = require('cli-progress');
const colors = require('colors');

const progress = new cli.Bar({}, cli.Presets.shades_classic);

module.exports = {
  progress,
  log: msg => console.log(colors.cyan(msg)),
  start: (msg, group = 'time') => {
    console.log(colors.green(`\n✳️: ${msg}\n`));
    console.time(group);
  },
  end: (group = 'time') => {
    console.log(colors.green('✅: Done'));
    console.timeEnd(group);
    console.log('\n');
  },
};
