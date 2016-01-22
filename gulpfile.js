"use strict"

let path = require('path')
let webpack = require('webpack')
let nodemon = require('nodemon')
let gulp = require('gulp')
let env = require('gulp-env')
let gutil = require('gulp-util')
let babel = require('gulp-babel')
let watch = require('gulp-watch')
let plumber = require('gulp-plumber')
let devServer = require('./devServer')
let config = require('./makeWebpackConfig')

gulp.task('client', function (cb) {
  devServer(config('debug'))
  cb()
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

gulp.task('server', function (cb) {
  let status = `[${gutil.colors.grey('server')}]`
  
  let startServer = () => {
    gutil.log(status, 'Starting nodemon...')
    nodemon({
      script: '_server/index.js',
      ext: 'js json',
      watch: ['none'],
      stdout: false,
      env: {
        NODE_PATH: '_lib'
      }
    })
    
    nodemon.on('start', () => gutil.log(status, 'Starting server!'))
    nodemon.on('stdout', msg => gutil.log(status, msg.toString()))
    nodemon.on('stderr', msg => gutil.log(status, msg.toString()))
    
    cb()
  }
  
  let fileChanged = fname => {
    gutil.log(status, `${path.relative(__dirname, fname)} changed!`)
    nodemon.restart()
  }
  
  let logError = e => {
    gutil.log(status, e.message)
    console.log(e.codeFrame)
  }
  
  let compileLib = () => {
    let envs = env.set({ NODE_ENV: 'server' })
    gutil.log(status, 'Compiling lib...')
    gulp.src('lib/**/*.{js,jsx}')
      .on('end', startServer)
      .pipe(plumber())
      .pipe(watch('lib/**/*.{js,jsx}'))
      .on('change', fileChanged)
      .pipe(envs)
      .pipe(babel())
      .on('error', logError)
      .pipe(gulp.dest('_lib'))
      .pipe(envs.reset)
  }
  
  let compileServer = () => {
    let envs = env.set({ NODE_ENV: 'server' })
    gutil.log(status, 'Compiling server...')
    gulp.src('server/**/*.{js,jsx}')
      .on('end', compileLib)
      .pipe(plumber())
      .pipe(watch('server/**/*.{js,jsx}'))
      .on('change', fileChanged)
      .pipe(envs)
      .pipe(babel())
      .on('error', logError)
      .pipe(gulp.dest('_server'))
      .pipe(envs.reset)
  }
  
  compileServer()
})

gulp.task('debug', ['server', 'client'])
