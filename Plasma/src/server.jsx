import 'babel-polyfill'
import Koa from 'koa'
import { route, proxy, statik } from 'libk'

const { GET } = route

import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'

import { StyleSheet } from 'reyle'

import App from './App'
import Container, { configureStore } from './Container'

const DEBUG = process.env.NODE_ENV !== 'production'
const APP_PORT = DEBUG ? 3001 : 8080

const app = new Koa()

app.use(GET('/')(async ctx => {
  const store = configureStore({
    todo: {
      todos: ['THING']
    }
  })

  const initialState = JSON.stringify(store.getState())

  const content = renderToString(
    <Container store={store}>
      <App />
    </Container>
  )

  let { components, css } = StyleSheet.getCSS()

  ctx.body = `
    <!doctype html>
    <html>
      <head>
        <script>window.__REDUX_INIT = ${initialState}</script>
        <script src="app.js"></script>
        <style data-components="${components}" data-stylesheet="static">
          ${css}
        </style>
      </head>
      <body>
        <div id="root">${content}</div>
      </body>
    </html>
  `
}))

app.use(statik('', 'static'))

if (DEBUG) {
  app.use(proxy('http://localhost:3000'))
}

app.listen(APP_PORT)
console.log(`Listening at ${APP_PORT}`)
