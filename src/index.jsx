import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Stylesheet } from 'stylesheet'
import { Button, TextField, Heading } from 'quanta'
import { Editor } from 'cosmic'

class Example extends Component {
  render () {
    return <div>
      <section>
        <Heading>Buttons</Heading>
        <hr />
        <Button>Add</Button>
        <Button secondary>Go</Button>
        <Button negative>Stop</Button>
      </section>
      <section>
        <Heading>Text Field</Heading>
        <hr />
        <TextField placeholder="Input" />
        <TextField placeholder="Number" validate="number" />
        <TextField placeholder="Phone Number" validate="phone" />
      </section>
      <section>
        <Heading>Headings</Heading>
        <hr />
        <Heading>Normal</Heading>
        <Heading small>Small</Heading>
        <Heading large>Large</Heading>
        <Heading bold>Bold</Heading>
        <Heading italic>Italic</Heading>
      </section>
    </div>
    // return <Editor placeholder="heu"/>
  }
}

Stylesheet.load()

document.body.appendChild((() => {
  let reactRoot = document.createElement('div')
  reactRoot.id = 'root'

  return reactRoot
})())

ReactDOM.render(<Example />, document.getElementById('root'))
