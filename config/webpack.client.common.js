const path = require('path');
const mapKeys = require('lodash/mapKeys');
const mapValues = require('lodash/mapValues');
const assign = require('lodash/assign');
const templates = require('./constants').templates;
const aliases = require('./constants').aliases;

const entries = mapValues(
  mapKeys(
    assign({}, templates), ({ name }) => `${name}`
  ), ({ srcPath }) => ([
    'whatwg-fetch',
    path.join(srcPath, 'index.js'),
  ])
);

module.exports = {
  entry: entries,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              [require.resolve('@babel/preset-env'), {
                'targets': {
                  'browsers': 'last 2 versions',
                },
              }],
              require.resolve('@babel/preset-react'),
            ],
            plugins: [
              require.resolve('@babel/plugin-proposal-class-properties'),
            ],
          },
        },
      }, {
        test: /\.md$/,
        loader: require.resolve('@politico/markdown-react-loader'),
      }, {
        test: /\.txt$/,
        loader: path.resolve(__dirname, 'loaders/text.js'),
      }, {
        test: /\.csv$/,
        loader: require.resolve('csv-loader'),
        options: {
          dynamicTyping: true,
          header: true,
          trimHeaders: true,
          skipEmptyLines: true,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: aliases,
  },
};
