const path = require('path');
const nodeExternals = require('webpack-node-externals');
const mapKeys = require('lodash/mapKeys');
const mapValues = require('lodash/mapValues');
const assign = require('lodash/assign');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const common = require('./webpack.templates.common.js');
const constants = require('./constants');

const templates = constants.templates;

const entries = mapValues(
  mapKeys(
    assign({}, templates), ({ name }) => `${name}/render`
  ), ({ srcPath }) => ([
    'fetch-everywhere',
    path.join(srcPath, 'renderer/index.js'),
  ])
);

module.exports = {
  target: 'node',
  mode: 'production',
  entry: entries,
  output: {
    path: path.resolve(__dirname, '../templates/dist/'),
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  devtool: 'cheap-module-eval-source-map',
  resolve: common.resolve,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: true,
                  },
                },
              ],
              '@babel/preset-react',
            ],
            plugins: ['@babel/proposal-class-properties'],
          },
        },
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              exportOnlyLocals: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.md$/,
        loader: '@politico/markdown-react-loader',
      },
      {
        test: /\.txt$/,
        loader: path.resolve(__dirname, 'loaders/text.js'),
      },
      {
        test: /STATIC_HASH$/,
        loader: path.resolve(__dirname, 'loaders/text.js'),
      },
    ],
  },
  externals: [
    nodeExternals({
      whitelist: ['politico-style', /module-*/, 'lodash-es'],
    }),
    {
      react: {
        commonjs: 'react',
        amd: 'react',
      },
      'react-dom': {
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    },
  ],
  optimization: { minimize: false },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, 'envs/.env.renderer'),
    }),
    new MinifyPlugin(),
  ],
};
