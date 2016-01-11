"use strict"

let gulp = require('gulp')
let env = require('gulp-env')
let webpack = require('webpack')
let gutil = require('gulp-util')
let devServer = require('./devServer')
let config = require('./makeWebpackConfig')

gulp.task('debug', function (cb) {
  devServer(config('debug'))
})

gulp.task('build', function(cb) {
  env.set({
    NODE_ENV: 'production'
  })

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
