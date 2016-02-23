import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Container, { configureStore } from './Container'

const store = configureStore(window.__REDUX_INIT)

window.onload = () => {
  if (document.getElementById('root') === null) {
    let reactRoot = document.createElement('div')
    reactRoot.id = 'root'
    document.body.appendChild(reactRoot)
  }

  ReactDOM.render(
    <Container store={store}>
      <App />
    </Container>,
    document.getElementById('root'))
}
