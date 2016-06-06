import React, { Component } from 'react'
import { connect } from 'react-redux'
import re from './actions'
import { TextField, Button, Heading } from './quanta'
import Demo from './quanta/Demo'

@connect(_ => _, re.action)
export default class App extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      text: ''
    }
  }

  handleUpdate (text) {
    this.setState({ text })
  }

  addTodo () {
    this.props.actions.addTodo(this.state.text)
    this.setState({
      text: ''
    })
  }

  render () {
    const { actions, todo } = this.props

    return <div className='ui container'>
      <Demo />
    </div>
  }
}
