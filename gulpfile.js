'use strict'

let path = require('path')
let nodemon = require('nodemon')
let gulp = require('gulp')
let gutil = require('gulp-util')
let babel = require('gulp-babel')
let watch = require('gulp-watch')
let plumber = require('gulp-plumber')

gulp.task('clean', function () {
  return del(['target/**'])
})

gulp.task('watch', ['clean'], function () {
  const SOURCES = 'src/**/*.{js,jsx}'
  const DEST = 'target'
  let status = `[${gutil.colors.grey('server')}]`
  let fileChanged = fname => {
    gutil.log(status, `${path.relative(__dirname, fname)} changed!`)
    nodemon.restart()
  }

  let watchSources = () => {
    gulp.src(SOURCES)
      .pipe(watch('lib/**/*.{js,jsx}'))
      .on('change', fileChanged)
      .pipe(plumber())
      .pipe(babel())
      .on('error', e => { gutil.log(status, e.message); console.log(e.codeFrame) })
      .pipe(gulp.dest(DEST))
  }

  gutil.log(status, 'Compiling src...')

  return gulp.src(SOURCES)
    .pipe(plumber())
    .pipe(babel())
    .on('error', e => { gutil.log(status, e.message); console.log(e.codeFrame) })
    .pipe(gulp.dest(DEST))
    .on('end', watchSources)
})

gulp.task('debug', ['watch'], function () {
  let status = `[${gutil.colors.grey('server')}]`

  gutil.log(status, 'Starting nodemon...')
  nodemon({
    script: 'target/server.js',
    ext: 'js json',
    watch: ['none'],
    stdout: false
  })

  nodemon.on('start', () => gutil.log(status, 'Starting server!'))
  nodemon.on('stdout', msg => gutil.log(status, msg.toString()))
  nodemon.on('stderr', msg => gutil.log(status, msg.toString()))
})

gulp.task('compile', ['clean'], function () {
  let status = `[${gutil.colors.grey('server')}]`
  gutil.log(status, 'Compiling lib...')

  return gulp.src('lib/**/*.{js,jsx}')
    .pipe(plumber())
    .pipe(babel())
    .on('error', e => { gutil.log(status, e.message); console.log(e.codeFrame) })
    .pipe(gulp.dest('target/node_modules'))
})

gulp.task('build', ['compile'], function () {
  return gulp.src('package.json')
    .pipe(gulp.dest('target'))
})
