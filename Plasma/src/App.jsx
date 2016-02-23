import React, { Component } from 'react'
import { connect } from 'react-redux'
import re from './actions'

const selector = (state) => ({
  ...state
})

@connect(selector, re.action)
export default class App extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      text: ''
    }
  }

  handleUpdate (event) {
    this.setState({
      text: event.target.value
    })
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
      <button className='ui red button' onClick={actions.clearTodos}>Clear</button>
      <button className='ui green button' onClick={::this.addTodo}>Add</button>
      <div className='ui input'>
        <input type='text' value={this.state.text} onChange={::this.handleUpdate} placeholder='TODO item'/>
      </div>

      <ul className='ui list'>
        {todo.todos.map((t) =>
          <li className='ui item' key={t}>{t}</li>)
        }
      </ul>
    </div>
  }
}
