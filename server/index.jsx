import 'babel-polyfill'
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import { DevTools } from 'devtools'
import { Stylesheet } from 'stylesheet'
import Example from 'quanta/Example'
import Container from 'plasma/Container'
import configureStore from 'plasma/store'

const APP_PORT = 3001

const app = express()

app.use((req, res) => {
  const store = configureStore({
    test: false
  })

  const initialState = JSON.stringify(store.getState())
  const content = renderToString(
    <Container store={store}>
      <Example />
    </Container>
  )

  let { components, css } = Stylesheet.getCSS()

  res.send(`
    <!doctype html>
    <html>
      <head>
        <script>window.__REDUX_INIT = ${initialState}</script>
        <script src="app.js"></script>
        <style data-components="components" data-stylesheet="static">
          ${css}
        </style>
      </head>
      <body>
        <div id="root">${content}</div>
      </body>
    </html>
  `)
})

app.listen(APP_PORT, 'localhost', err => {
  console.log('Listening at ' + APP_PORT)
})
