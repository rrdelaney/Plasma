"use strict"

let path = require('path')
let extend = require('util')._extend
let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let ProgressBar = require('progress')
let chalk = require('chalk')

const SRC_DIR = 'client'
const ENTRY_FILE = 'index.jsx'
const TARGET_DIR = '_client'
const TARGET_FILE = 'app.js'
const TARGET_CSS = 'app.css'

function displayProgress () {
  var progressBar

  return (percent, message) => {
    if (percent === 0) {
      if (progressBar) progressBar.update(1, { message: 'done!' })
      progressBar = new ProgressBar(`[dev] [:bar] ${chalk.green(':percent')} :message`, {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: 100,
        renderThrottle: 2,
        message: message
      })
    } else {
      progressBar.update(percent, {
        message: percent === 1 ? 'done!' : message
      })
    }
  }
}

let baseConfig = {
  entry: [
    'babel-polyfill',
    path.join(__dirname, SRC_DIR, ENTRY_FILE)
  ],
  output: {
    path: path.join(__dirname, TARGET_DIR),
    filename: TARGET_FILE
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          'plugins': ['transform-regenerator'],
          'presets': ['react-hmre']
        }
      }, {
        test: /.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules!postcss'),
        exclude: 'node_modules'
      }, {
        test: /.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
        exclude: /(lib|src)/
      }, {
        test: /.json$/,
        loader: 'json-loader'
      }
    ]
  },
  resolve: {
    extensions: ['', '.jsx', '.js', '.json'],
    modulesDirectories: ['node_modules', 'lib']
  },
  postcss: () => [
    require('autoprefixer')(),
    require('postcss-import')(),
    require('postcss-custom-properties')(),
    require('postcss-color-function')()
  ]
}

function makeDevelopment (config) {
  return extend(config, {
    entry: [
      ...config.entry,
      'webpack-hot-middleware/client?http://localhost:3000',
      'webpack/hot/only-dev-server'
    ],
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        NODE_ENV: 'development',
        DEBUG: true
      }),
      new webpack.ProgressPlugin(displayProgress()),
      new ExtractTextPlugin(TARGET_CSS, { disable: true })
    ],
    debug: true,
    devtool: 'source-map'
  })
}

function makeProduction (config) {
  return extend(config, {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.ProgressPlugin(displayProgress()),
      new ExtractTextPlugin(TARGET_CSS, { allChunks: true }),
      new webpack.DefinePlugin({
        NODE_ENV: 'production',
        DEBUG: false
      })
    ]
  })
}

module.exports = env => env === 'production'
  ? makeProduction(Object.create(baseConfig))
  : makeDevelopment(Object.create(baseConfig))
