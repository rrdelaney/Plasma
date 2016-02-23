import React from 'react'
import { applyStyles } from 'reyle'
import { font } from './vars'

export default function Heading (props) {
  const styles = Object.keys(props).filter(key =>
    !!Heading.styles[key]
  ).map(key =>
    Heading.styles[key]
  )

  return <div className={`${Heading.styles.heading} ${styles.join(' ')}`}>
    {props.children}
  </div>
}

applyStyles({
  heading: {
    fontFamily: font,
    fontSize: '30px',
    fontWeight: 'bold'
  },
  small: {
    fontSize: '24px'
  },
  large: {
    fontSize: '48px'
  },
  underline: {
    textDecoration: 'underline'
  },
  italic: {
    fontStyle: 'italic'
  }
})(Heading)
