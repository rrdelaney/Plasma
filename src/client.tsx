import * as React from 'react'
import { render } from 'react-dom'
import { match, Router, browserHistory } from 'react-router'

import { routes } from './app'

const root = document.getElementById('root')

match({ routes, history: browserHistory }, (err, redirect, renderProps) => {
  render(<Router {...renderProps} />, root)
})
