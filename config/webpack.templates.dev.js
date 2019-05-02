require('dotenv').config();
const portfinder = require('portfinder');
const merge = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const constants = require('./constants');
const common = require('./webpack.templates.common.js');

const templates = constants.templates;

const pages = templates.map(({ name }) => new HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../templates/src/common/templates/dev.html'),
  filename: `${name}/index.html`,
  chunks: [`${name}`],
}));

portfinder.basePort = 3000;

module.exports = portfinder.getPortPromise().then(port => merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    compress: true,
    open: true,
    contentBase: './templates/example',
    hot: true,
    host: 'localhost',
    disableHostCheck: true,
    port,
  },
  module: {
    rules: [{
      test: /theme.*\.scss$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      }],
    }, {
      test: /\.scss$/,
      exclude: /theme.*\.s?css$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
          sourceMap: true,
        },
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      }],
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      }],
    }, {
      test: /\.html$/,
      use: [
        {
          loader: require.resolve('html-loader'),
          options: {
            minimize: true,
            removeComments: false,
            collapseWhitespace: false,
          },
        },
      ],
    },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: path.resolve(__dirname, 'envs/.env.dev'),
    }),
    ...pages,
  ],
}));
