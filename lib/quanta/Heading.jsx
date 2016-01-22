import React from 'react'
import { useStyle } from 'stylesheet'
import { font } from './vars'

useStyle('heading', {
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
