import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Stylesheet } from 'stylesheet'
import Example from './Example'

Stylesheet.loadIntoDOM()

document.body.appendChild((() => {
  let reactRoot = document.createElement('div')
  reactRoot.id = 'root'

  return reactRoot
})())

ReactDOM.render(<Example />, document.getElementById('root'))
