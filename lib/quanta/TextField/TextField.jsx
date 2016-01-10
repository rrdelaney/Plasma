import React, { Component } from 'react'
import { textField, valid, invalid, waiting } from './TextField.css'

export default class TextField extends Component {
  constructor(props) {
    super(props)

    this.validateInput = this.validateInput.bind(this)
    this.onChange = this.onChange.bind(this)
    this.state = {
      valid: null,
      value: '',
      waiting: false
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
    const validateNum = num => num.match(/^\d+$/g) !== null
    const validatePhone = num => num.match(/^(\d{3}-\d{3}-\d{4})|(\d{10})$/) !== null

    if (this.props.validate) {
      const validate = this.props.validate === 'number'
        ? validateNum
        : this.props.validate === 'phone'
        ? validatePhone
        : this.props.validate

      const isValid = validate(value)

      if (isValid.then) {
        this.setState({
          valid: null,
          waiting: true
        })

        isValid.then(valid => {
          this.setState({ valid })
        })
      } else {
        this.setState({ valid: isValid })
      }
    }
  }

  render () {
    const isValid = this.state.valid === null || this.state.value === ''
      ? ''
      : this.state.valid === true
      ? valid
      : invalid

    const isWaiting = this.state.waiting
      ? waiting
      : ''

    return <div className={`${textField} ${isValid} ${isWaiting}`}>
      <input
        type="text"
        placeholder={this.props.placeholder}
        onChange={this.onChange}
        value={this.state.value} />
    </div>
  }
}
