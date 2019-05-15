module.exports = function(api) {
  api.cache(true);

  const presets = [];
  const plugins = [
    [ 'babel-plugin-webpack-alias', {
      'config': 'config/webpack.client.common.js',
    }],
    '@babel/plugin-transform-modules-commonjs',
  ];

  return {
    presets,
    plugins,
    babelrcRoots: ['./../'],
  };
};
