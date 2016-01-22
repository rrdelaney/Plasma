import 'babel-polyfill'
import express from 'express'
import React from 'react'
import ReactDomServer from 'react-dom/server'
import { Stylesheet } from 'stylesheet'
import Example from 'quanta/Example'

const APP_PORT = 3001

const app = express()

app.get('/example', (req, res) => {
  let { components, css } = Stylesheet.getCSS()
  res.send(`
<html>
  <head>
    <script src="app.js"></script>
    <style data-components="components" data-stylesheet="static">
      ${css}
    </style>
  </head>
  <body>
    <div id="root">${ReactDomServer.renderToString(<Example />)}</div>
  </body>
</html>`)
})

app.listen(APP_PORT, 'localhost', err => {
  console.log('Listening at ' + APP_PORT)
})