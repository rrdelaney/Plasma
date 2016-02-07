# React Update

A decorator for react components to provide state update boilerplate

Example:

```jsx
import React, { Component } from 'react'
import update from 'react-update'

@update
class Input extends Component {
  state = {
    value: ''
  }

  render () {
    return <input onChange={::this.update('value')} />
  }
}
