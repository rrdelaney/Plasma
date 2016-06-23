import * as React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
// import { AppContainer } from 'react-hot-loader'

import routes from './app'

const root = document.getElementById('root')

render(<Router history={browserHistory}>{routes}</Router>, root)
