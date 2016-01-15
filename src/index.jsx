import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Button, ButtonGroup, TextField, Heading } from 'quanta'
import { Editor } from 'cosmic'

class Example extends Component {
  render () {
    // return <div>
    //   <section>
    //     <h1>Buttons</h1>
    //     <Button>Add</Button>
    //     <Button success>Go</Button>
    //     <Button fail>Stop</Button>
    //     <Button warn>Continue</Button>
    //   </section>
    //   <section>
    //     <h1>Button Groups</h1>
    //     <ButtonGroup>
    //       <Button>Add</Button>
    //       <Button success>Go</Button>
    //       <Button fail>Stop</Button>
    //       <Button warn>Continue</Button>
    //     </ButtonGroup>
    //   </section>
    // </div>
    return <Editor placeholder="heu"/>
  }
}

document.body.appendChild((() => {
  let reactRoot = document.createElement('div')
  reactRoot.id = 'root'

  return reactRoot
})())

ReactDOM.render(<Example />, document.getElementById('root'))
