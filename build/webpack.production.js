const path = require('path');
const WebpackMerge = require('webpack-merge');
const WoxWebpackRuntimePlugin = require('@wox/loader/server');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BasicConfigs = require('./webpack.base');
const cwd = process.cwd();

module.exports = WebpackMerge(BasicConfigs, {
  mode: 'production',
  output: {
    path: path.resolve(cwd, 'dist'),
    publicPath: ''
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins:[
    new WoxWebpackRuntimePlugin().loadCommonCase(),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ]
})