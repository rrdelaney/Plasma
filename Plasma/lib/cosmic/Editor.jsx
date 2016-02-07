import React, { Component } from 'react'
import { Rope } from 'nucleus'
import { StyleSheet } from 'reyle'

var keymap

const { editor } = StyleSheet.create({
  editor: {
    color: 'white',
    backgroundColor: 'black',
    ':focus': {
      border: '2px solid black'
    }
  }
})

export default class Editor extends Component {
  constructor (props) {
    super(props)
    this.content = new Rope(props.placeholder)
  }

  onEdit (e) {
    e.preventDefault()
    console.log(`key hit ${e.which}\n        ${keymap[e.which]}`)
    this.content.insert(this.content.length, keymap[e.which])
    this.forceUpdate()
  }

  render () {
    return <div onKeyDown={::this.onEdit} className={editor} tabIndex="1">
      {[...this.content].map(node => {
        return <span key={node.id}>{node.value}</span>
      })}
    </div>
  }
}

keymap = {
    32: ' ',
    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    65: 'a',
    66: 'b',
    67: 'c',
    68: 'd',
    69: 'e',
    70: 'f',
    71: 'g',
    72: 'h',
    73: 'i',
    74: 'j',
    75: 'k',
    76: 'l',
    77: 'm',
    78: 'n',
    79: 'o',
    80: 'p',
    81: 'q',
    82: 'r',
    83: 's',
    84: 't',
    85: 'u',
    86: 'v',
    87: 'w',
    88: 'x',
    89: 'y',
    90: 'z'
}
