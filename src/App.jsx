import React, { Component } from 'react'
import { connect } from 'hzql'

@connect.liveAwait(hz => props => ({
  deltas: hz('delta')
}))
export default class App extends Component {
  newDelta (e) {
    this.props.horizon('delta').store({
      text: e.key
    })
  }

  componentDidMount () {
    if (typeof window !== 'undefined') window.addEventListener('keydown', ::this.newDelta)
  }

  render () {
    let text = this.props.deltas.map(d => d.text).join('->')
    return <textarea value={text} />
  }
}
