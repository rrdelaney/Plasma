import React, { Component } from 'react'
import { connect } from 'hzql'

export default connect.live(hz => props => ({
  users: hz('users')
}))(({ users }) => <pre>Users: {JSON.stringify(users)}</pre>)
