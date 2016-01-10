import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Button, ButtonGroup, TextField, Heading } from 'quanta'

class Page extends Component {
  onClick () {
    alert('clicked!')
  }

  render () {
    return <div>
      <Heading>Hey!</Heading>
    </div>
  }
}

document.body.appendChild((() => {
  let reactRoot = document.createElement('div')
  reactRoot.id = 'root'

  return reactRoot
})())

ReactDOM.render(<Page />, document.getElementById('root'))
