"use strict"

let path = require('path')
let del = require('del')
let delay = require('delay')
let webpack = require('webpack')
let nodemon = require('nodemon')
let gulp = require('gulp')
let env = require('gulp-env')
let gutil = require('gulp-util')
let babel = require('gulp-babel')
let watch = require('gulp-watch')
let batch = require('gulp-batch')
let plumber = require('gulp-plumber')
let devServer = require('./devServer')
let config = require('./makeWebpackConfig')

gulp.task('clean', function (cb) {
  return del(['_lib/**', '_server/**', '_client/**', '_target/**'])
})

gulp.task('ui:debug', ['server:debug'], function (cb) {
  devServer(config('debug'))
  cb()
})

gulp.task('ui:build', ['clean'], function (cb) {
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

gulp.task('server:build', ['server:build:src', 'server:build:lib'], function () {
  return gulp.src('package.json')
    .pipe(gulp.dest('target'))
})

gulp.task('server:build:lib', ['clean'], function () {
  let status = `[${gutil.colors.grey('server')}]`
  let envs = env.set({
    NODE_ENV: 'production'
  })

  gutil.log(status, 'Compiling lib...')

  return gulp.src('lib/**/*.{js,jsx}')
    .pipe(plumber())
    .pipe(envs)
    .pipe(babel())
    .on('error', e => { gutil.log(status, e.message); console.log(e.codeFrame) })
    .pipe(gulp.dest('target/node_modules'))
    .pipe(envs.reset)
})

gulp.task('server:build:src', ['clean'], function () {
  let status = `[${gutil.colors.grey('server')}]`
  let envs = env.set({
    NODE_ENV: 'production'
  })

  gutil.log(status, 'Compiling server...')

  return gulp.src(['src/**/*.{js,jsx}', '!src/**/client.{js,jsx}'])
    .pipe(plumber())
    .pipe(envs)
    .pipe(babel())
    .on('error', e => { gutil.log(status, e.message); console.log(e.codeFrame) })
    .pipe(gulp.dest('target'))
    .pipe(envs.reset)
})

gulp.task('server:debug', ['server:watch:lib', 'server:watch:src'], function () {
  let status = `[${gutil.colors.grey('server')}]`

  gutil.log(status, 'Starting nodemon...')
  nodemon({
    script: '_server/server.js',
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
})

gulp.task('server:watch:src', ['clean'], function (cb) {
  const SOURCES = ['src/**/*.{js,jsx}', '!src/**/client.{js,jsx}']
  const DEST = '_server'
  let status = `[${gutil.colors.grey('server')}]`
  let envs = env.set({ NODE_ENV: 'server' })
  let fileChanged = fname => {
    gutil.log(status, `${path.relative(__dirname, fname)} changed!`)
    nodemon.restart()
  }

  let watchSources = () => {
    gulp.src(SOURCES)
      .pipe(watch('lib/**/*.{js,jsx}'))
      .on('change', fileChanged)
      .pipe(plumber())
      .pipe(envs)
      .pipe(babel())
      .on('error', e => { gutil.log(status, e.message); console.log(e.codeFrame) })
      .pipe(envs.reset)
      .pipe(gulp.dest(DEST))
  }

  gutil.log(status, 'Compiling src...')

  return gulp.src(SOURCES)
    .pipe(plumber())
    .pipe(envs)
    .pipe(babel())
    .on('error', e => { gutil.log(status, e.message); console.log(e.codeFrame) })
    .pipe(envs.reset)
    .pipe(gulp.dest(DEST))
    .on('end', watchSources)
})

gulp.task('server:watch:lib', ['clean'], function (cb) {
  const SOURCES = 'lib/**/*.{js,jsx}'
  const DEST = '_lib'
  let status = `[${gutil.colors.grey('server')}]`
  let envs = env.set({ NODE_ENV: 'server' })
  let fileChanged = fname => {
    gutil.log(status, `${path.relative(__dirname, fname)} changed!`)
    nodemon.restart()
  }

  let watchSources = () => {
    gulp.src(SOURCES)
      .pipe(watch('lib/**/*.{js,jsx}'))
      .on('change', fileChanged)
      .pipe(plumber())
      .pipe(envs)
      .pipe(babel())
      .on('error', e => { gutil.log(status, e.message); console.log(e.codeFrame) })
      .pipe(envs.reset)
      .pipe(gulp.dest(DEST))
  }

  gutil.log(status, 'Compiling lib...')

  return gulp.src(SOURCES)
    .pipe(plumber())
    .pipe(envs)
    .pipe(babel())
    .on('error', e => { gutil.log(status, e.message); console.log(e.codeFrame) })
    .pipe(envs.reset)
    .pipe(gulp.dest(DEST))
    .on('end', watchSources)
})

gulp.task('debug', ['ui:debug'])
gulp.task('build', ['ui:build', 'server:build'])
