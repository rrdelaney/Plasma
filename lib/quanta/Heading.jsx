import React from 'react'
import { useStyle } from 'stylesheet'
import { font } from './vars'

export default function Heading (props) {
  const styles = Object.keys(props).filter(key =>
    !!this.styles[key]
  ).map(key =>
    this.styles[key]
  )

  return <div className={`${this.styles.heading} ${styles.join(' ')}`}>
    {props.children}
  </div>
}

useStyle({
  heading: {
    fontFamily: font,
    fontSize: '32px',
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