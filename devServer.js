"use strict"

let path = require('path')
let webpack = require('webpack')
let gutil = require('gulp-util')
let express = require('express')

const APP_PORT = 3000

module.exports = (config, cb) => {
  let app = express()

  let compiler = webpack(config, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err)
    }
  })

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true,
    quiet: true,
    stats: {
      colors: true
    }
  }))

  app.use(require('webpack-hot-middleware')(compiler, {
    reload: true
  }))

  app.use(express.static('resources'))

  app.listen(APP_PORT, 'localhost', err => {
    gutil.log(`[${gutil.colors.grey('dev')}]`, 'Listening at', gutil.colors.cyan(`http://localhost:${APP_PORT}`))

    if (err) {
      gutil.log(`[${gutil.colors.grey('dev')}]`, err)
    }
  })
}
