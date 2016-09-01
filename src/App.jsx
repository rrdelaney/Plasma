import React, { Component } from 'react'
import { connect } from './hzql'

@connect.await(hz => props => ({
  info: hz('info').findAll({ username: props.username })
}))
class UserInfo extends Component {
  render () {
    return <pre>{JSON.stringify(this.props.info)}</pre>
  }
}

@connect.live(hz => props => ({
  users: hz('users')
}))
export default class App extends Component {
  render () {
    return <div>
      {!this.props.users ? 'Loading' : this.props.users.map(u =>
        <div key={u.id}>
          <h3>Username: {u.id}</h3>
          <UserInfo username={u.id} />
        </div>
      )}
    </div>
  }
}
