import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { StyleSheet } from 'reyle'
import { loadIntoDOM } from 'reyle/dom'
import Example from 'quanta/Example'
import Container from 'plasma/Container'
import configureStore from 'plasma/store'

loadIntoDOM(StyleSheet)

const store = configureStore(window.__REDUX_INIT)

window.onload = () => {
  if (document.getElementById('root') === null) {
    let reactRoot = document.createElement('div')
    reactRoot.id = 'root'
    document.body.appendChild(reactRoot)
  }

  ReactDOM.render(
    <Container store={store}>
      <Example />
    </Container>,
    document.getElementById('root'))
}
