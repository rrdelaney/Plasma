import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'quanta'

class Page extends Component {
  render () {
    return <Button>Hello!</Button>
  }
}

document.body.appendChild((() => {
  let reactRoot = document.createElement('div')
  reactRoot.id = 'root'

  return reactRoot
})())

ReactDOM.render(<Page />, document.getElementById('root'))
