import React from 'react'
import { Stylesheet } from 'stylesheet'
import { font } from './vars'

const style = Stylesheet.create({
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
})

export default function Heading (props) {
  const styles = Object.keys(props).filter(key =>
    !!style[key]
  ).map(key =>
    style[key]
  )

  return <div className={`${style.heading} ${styles.join(' ')}`}>
    {props.children}
  </div>
}
