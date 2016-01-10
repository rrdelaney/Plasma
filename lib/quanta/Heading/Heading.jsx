import React from 'react'
import style, { heading } from './Heading.css'

export default function Heading (props) {
  const styles = Object.keys(props).filter(key =>
    !!style[key]
  ).map(key =>
    style[key]
  )

  return <div className={`${heading} ${styles.join(' ')}`}>
    {props.children}
  </div>
}
