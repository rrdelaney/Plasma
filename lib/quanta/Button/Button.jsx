import React from 'react'
import { button } from './Button.css'

export default function Button (props) {
  return <div className={button}>{props.children}</div>
}
