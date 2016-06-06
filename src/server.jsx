import 'babel-polyfill'

import soular from 'soular'
import serveStatic from 'soular/static'
import router from 'soular/react-router'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore } from 'redux'

import { StyleSheet } from 'reyle'

import App from './App'
import Container, { configureStore } from './Container'

const DEBUG = process.env.NODE_ENV !== 'production'
const APP_PORT = DEBUG ? 3001 : 8080

const routes = {
  path: '/',
  component: App
}

soular('*')

.use(router(routes, content => {
  const store = configureStore({
    todo: {
      todos: ['THING']
    }
  })

  const initialState = JSON.stringify(store.getState())

  const app = renderToString(
    <Container store={store}>
      {content}
    </Container>
  )

  let { components, css } = StyleSheet.getCSS()

  return `
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
        <div id="root">${app}</div>
      </body>
    </html>
  `
}))

.use(serveStatic('', 'static'))

.listen(APP_PORT)

.on('listening', () => console.log(`Listening at ${APP_PORT}`))
