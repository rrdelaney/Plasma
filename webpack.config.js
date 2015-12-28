"use strict"

let path = require('path')
let extend = require('util')._extend
let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let ExtractTextPlugin = require('extract-text-webpack-plugin')

const SRC_DIR = 'src'
const ENTRY_FILE = 'index.jsx'
const TARGET_DIR = 'target'
const TARGET_FILE = 'app.js'

let baseConfig = {
	entry: path.join(__dirname, SRC_DIR, ENTRY_FILE),
	output: {
		path: path.join(__dirname, TARGET_DIR),
		filename: TARGET_FILE
	},
	module: {
		loaders: [
			{
				test: /\.(jsx|js)$/,
				loader: 'babel',
				exclude: /node_modules/
			}, {
				test: /.css$/,
				loader: 'style!css?modules',
				exclude: 'node_modules'
			}, {
				test: /.json$/,
				loader: 'json-loader'
			}
		]
	},
	resolve: {
    extensions: ['', '.jsx', '.js', '.json'],
    modulesDirectories: ['node_modules']
  }
}

function makeDevelopment (config) {
	return extend(config, {
		entry: [
			config.entry,
			'webpack-hot-middleware/client?http://localhost:3000',
			'webpack/hot/only-dev-server'
		],
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.DefinePlugin({
				NODE_ENV: 'development',
				DEBUG: true
			}),
			new HtmlWebpackPlugin()
		],
		debug: true,
		devtool: 'eval-source-map'
	})
}

function makeProduction (config) {
	// config.module.loaders[1].loader = ExtractTextPlugin('style-loader', 'css-loader?modules') // Hacky
		
	return extend(config, {
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
			new HtmlWebpackPlugin({
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        },
        inject: true
      }),
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