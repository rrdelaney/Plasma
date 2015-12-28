"use strict"

let path = require('path')
let webpack = require('webpack')
let gutil = require('gulp-util')
let express = require('express')

module.exports = (config, cb) => {
  let app = express()

  let compiler = webpack(config, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err)
    }

    gutil.log(`[${gutil.colors.grey('ui')}]`, 'Listening at', gutil.colors.cyan('http://localhost:3000'))
  })

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true,
    stats: {
      colors: true
    }
  }))

  app.use(require('webpack-hot-middleware')(compiler))

  app.use(express.static('resources'))

  app.listen(3000, 'localhost', err => {
    if (err) {
      gutil.log(`[${gutil.colors.grey('ui')}]`, err)
    }
  })
}
