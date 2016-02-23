import React, { Component } from 'react'
import { connect } from 'react-redux'
import re from './actions'
import { TextField, Button } from './quanta'

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
      <Button onClick={actions.clearTodos}>Clear</Button>
      <Button onClick={::this.addTodo}>Add</Button>
      <TextField validate="number" value={this.state.text} onChange={::this.handleUpdate} placeholder='TODO item'/>

      <ul>
        {todo.todos.map((t) =>
          <li key={t}>{t}</li>)
        }
      </ul>
    </div>
  }
}
