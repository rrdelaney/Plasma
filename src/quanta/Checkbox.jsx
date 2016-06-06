import React, { Component } from 'react'
import { applyStyles } from 'reyle'
import { font } from './vars'

export default class Checkbox extends Component {
  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)

    this.state = {
      checked: false
    }
  }

  onChange (e) {
    const checked = e.target.value

    this.setState({ checked })

    if (this.props.onChange) {
      this.props.onChange(checked)
    }
  }

  render () {
    return <div>
      <input type="checkbox" onChange={this.onChange} value={this.state.checked}/>
    </div>
  }
}
