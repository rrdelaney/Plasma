import 'babel-polyfill'
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'
import { StyleSheet } from 'reyle'
import Example from 'quanta/Example'
import Container from 'plasma/Container'
import configureStore from 'plasma/store'

const DEBUG = process.env.NODE_ENV !== 'production'
const APP_HOST = DEBUG ? 'localhost' : '0.0.0.0'
const APP_PORT = DEBUG ? 3001 : 80

const app = express()

app.use(express.static('static'))

app.get('/', (req, res) => {
  const store = configureStore({
    test: false
  })

  const initialState = JSON.stringify(store.getState())
  const content = renderToString(
    <Container store={store}>
      <Example />
    </Container>
  )

  let { components, css } = StyleSheet.getCSS()

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

app.listen(APP_PORT, APP_HOST, err => {
  console.log('Listening at ' + APP_PORT)
})
