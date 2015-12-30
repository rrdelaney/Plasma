import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Button, ButtonGroup } from 'quanta'

class Page extends Component {
  onClick () {
    alert('clicked!')
  }

  render () {
    return <ButtonGroup>
      <Button>Hello, its me</Button>
      <Button>Hello, its you</Button>
      <Button>Hello, its who?</Button>
    </ButtonGroup>
  }
}

document.body.appendChild((() => {
  let reactRoot = document.createElement('div')
  reactRoot.id = 'root'

  return reactRoot
})())

ReactDOM.render(<Page />, document.getElementById('root'))
