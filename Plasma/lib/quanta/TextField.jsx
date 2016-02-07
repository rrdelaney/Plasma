import React, { Component } from 'react'
import { applyStyles } from 'reyle/react'
import { font, positive, negative } from './vars'

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
      ? this.styles.valid
      : this.styles.invalid

    const isWaiting = this.state.waiting
      ? this.styles.waiting
      : ''

    return <div className={`${this.styles.textField} ${isValid} ${isWaiting}`}>
      <input
        type="text"
        placeholder={this.props.placeholder}
        onChange={this.onChange}
        value={this.state.value} />
    </div>
  }
}

applyStyles({
  textField: {
    border: 'solid 1px rgb(177, 177, 177)',
    display: 'block',
    padding: '.3rem .3rem .3rem .3rem',
    margin: '1rem 0',
    transition: 'border-color .2s',
    width: '20rem',
    '::before': {
      position: 'fixed'
    }
  },
  waiting: {
    '::before': {
      content: '"➜"'
    }
  },
  valid: {
    borderColor: positive,
    '::before': {
      content: '"✔"',
      color: positive
    }
  },
  invalid: {
    borderColor: negative,
    '::before': {
      content: '"✖"',
      color: negative
    }
  },
  '%input': {
    border: 'none',
    fontFamily: font,
    fontSize: '16px',
    marginLeft: '1.3rem',
    width: '18rem',
    ':focus': {
      outline: 'none'
    }
  }
})(TextField)
