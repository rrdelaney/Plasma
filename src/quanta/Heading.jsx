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
    fontSize: '48px',
    fontWeight: '300'
  },
  small: {
    fontSize: '36px'
  },
  large: {
    fontSize: '64px'
  },
  bold: {
    fontWeight: 'bold'
  },
  underline: {
    textDecoration: 'underline'
  },
  italic: {
    fontStyle: 'italic'
  }
})(Heading)
