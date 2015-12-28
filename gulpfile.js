"use strict"

let gulp = require('gulp')
let webpack = require('webpack')
let gutil = require('gulp-util')
let devServer = require('./devServer')
let config = require('./webpack.config')

gulp.task('debug', function (cb) {
	devServer(config('debug'))
})

gulp.task('build', function(cb) {
	webpack(config('production'), function (err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err)
    }

    gutil.log('[webpack]', stats.toString({
      colors: true
    }))

    cb()
  })
})