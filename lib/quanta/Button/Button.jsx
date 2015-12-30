import React from 'react'
import { button, success, fail, warn } from './Button.css'

export default function Button ({type, children, onClick}) {
  let buttonType = type === 'success'
    ? success
    : type === 'fail'
    ? fail
    : type === 'warn'
    ? warn
    : ''

  return <div
    className={`${button} ${buttonType}`}
    onClick={onClick}>
    {children}
  </div>
}

Button.propsType = {
  type: React.PropTypes.string,
  onClick: React.PropTypes.func
}
