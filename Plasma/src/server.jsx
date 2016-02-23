import 'babel-polyfill'
import express from 'express'
import proxy from 'proxy-middleware'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'

import App from './App'
import Container, { configureStore } from './Container'

const DEBUG = process.env.NODE_ENV !== 'production'
const APP_HOST = DEBUG ? 'localhost' : '0.0.0.0'
const APP_PORT = DEBUG ? 3001 : 80

const app = express()
app.use(express.static('static'))

app.get('/', (req, res) => {
  const store = configureStore({
    todo: {
      todos: []
    }
  })

  const initialState = JSON.stringify(store.getState())

  const content = renderToString(
    <Container store={store}>
      <App />
    </Container>
  )

  res.send(`
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/semantic.min.css">
        <script>window.__REDUX_INIT = ${initialState}</script>
        <script src="app.js"></script>
        <style data-components="components" data-stylesheet="static">
        </style>
      </head>
      <body>
        <div id="root">${content}</div>
      </body>
    </html>
  `)
})

if (DEBUG) {
  app.use('/', proxy('http://localhost:3000'))
}

app.listen(APP_PORT, APP_HOST, err => {
  console.log('Listening at ' + APP_PORT)
})
