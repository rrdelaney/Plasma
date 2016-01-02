import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Button, ButtonGroup, TextField } from 'quanta'

class Page extends Component {
  onClick () {
    alert('clicked!')
  }

  render () {
    return <TextField />
  }
}

document.body.appendChild((() => {
  let reactRoot = document.createElement('div')
  reactRoot.id = 'root'

  return reactRoot
})())

ReactDOM.render(<Page />, document.getElementById('root'))
