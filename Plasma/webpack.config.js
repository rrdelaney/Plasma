'use strict'

let webpack = require('webpack')
let path = require('path')

const DEBUG = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: [
    'babel-polyfill',
    path.join(__dirname, 'src', 'client.jsx')
  ],
  output: {
    path: DEBUG ? '_client' : 'target/static',
    filename: 'app.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        loader: 'babel',
        exclude: /node_modules/
      }, {
        test: /\.json$/,
        loader: 'json'
      }, {
        test: /\.css$/,
        loader: 'style!css-loader?modules',
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: 'style!css-loader',
        exclude: /src/
      }, {
        test: /\.(ttf|eot|svg|png)$/,
        loader: 'file-loader'
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff'
      }
    ]
  },
  resolve: {
    extensions: ['', '.jsx', '.js', '.json'],
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    })
  ]
}
