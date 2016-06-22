import * as React from 'react'
import { Router, Route, browserHistory } from 'react-router'

const App = {
  English () {
    return <div>Hello world!</div>
  },

  Spanish () {
    return <div>Hõla world!</div>
  }
}

export const routes = <Router history={browserHistory}>
  <Route path='/' component={App.English} />
  <Route path='/es' component={App.Spanish} />
</Router>
