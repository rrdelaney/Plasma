import React from 'react'
import style, { button } from './Button.css'

export default function Button (props) {
  const styles = Object.keys(props).filter(key =>
    !!style[key]
  ).map(key =>
    style[key]
  )

  return <div className={`${button} ${styles.join(' ')}`}
    onClick={props.onClick}>
    {props.children}
  </div>
}

Button.propsType = {
  type: React.PropTypes.string,
  onClick: React.PropTypes.func
}
