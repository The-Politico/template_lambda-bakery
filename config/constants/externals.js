// These modules are ES modules and need to be compiled by renderer
// webpack config. They're passed as whitelist to nodeExternals.
module.exports = [
  'politico-style',
  /module-*/,
  /.*.css/,
  'lodash-es',
  '@politico/graphics-kit',
  '@politico/interactive-style',
  '@politico/interactive-style-elections',
];
