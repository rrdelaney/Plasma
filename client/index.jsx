import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Stylesheet } from 'stylesheet'
import Example from 'quanta/Example'

Stylesheet.loadIntoDOM()

window.onload = () => {
  if (document.getElementById('root') === null) {
    let reactRoot = document.createElement('div')
    reactRoot.id = 'root'
    document.body.appendChild(reactRoot)
  }

  ReactDOM.render(<Example />, document.getElementById('root'))
}
