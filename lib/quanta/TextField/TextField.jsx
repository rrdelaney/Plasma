import React, { Component } from 'react'
import { textField } from './TextField.css'

export default class TextField extends Component {
  constructor(props) {
    super(props)

    this.validateInput = this.validateInput.bind(this)
    this.onChange = this.onChange.bind(this)
    this.state = {
      valid: null,
      value: ''
    }
  }

  onChange(e) {
    const value = e.target.value

    this.setState({ value })
    this.validateInput(value)

    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  validateInput (value) {
    if (this.props.validate) {
      const isValid = this.props.validate(value)

      if (isValid.then) {
        isValid.then(valid => {
          this.setState({ valid })
        })
      } else {
        this.setState({ valid: isValid })
      }
    }
  }

  render () {
    return <input className={textField} type="text" onChange={this.onChange} value={this.state.value} />
  }
}
