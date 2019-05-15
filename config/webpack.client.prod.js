const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const merge = require('webpack-merge');
const common = require('./webpack.client.common.js');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const HASH = fs.readFileSync(path.join(__dirname, './STATIC_HASH'));

const config = {
  mode: 'production',
  output: {
    filename: `[name]/client-${HASH}.js`,
    path: path.join(__dirname, '../dist/client/'),
  },
  module: {
    rules: [
      {
        test: /theme.*\.scss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
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
      },
      {
        test: /\.scss$/,
        exclude: /theme.*\.scss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
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
      },
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        }],
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        extractComments: true,
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, 'envs/.env.prod'),
    }),
    new MiniCssExtractPlugin({
      filename: `[name]/styles-${HASH}.css`,
    }),
  ],
  stats: 'errors-only',
};

module.exports = merge(common, config);
