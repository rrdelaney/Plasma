import React from 'react'
import { useStyle } from 'stylesheet'
import { font, primary, primaryDark, negative, negativeDark } from './vars'

useStyle('button', {
  button: {
    backgroundColor: primary,
    borderRadius: '.2rem',
    border: `solid .1rem ${primary}`,
    color: 'white',
    cursor: 'pointer',
    display: 'inline-block',
    fontFamily: font,
    margin: '.5rem',
    padding: '.5rem',
    transition: 'color .2s, background-color .2s, border-color .2s, border .2s',
    userSelect: 'none',
    ':hover': {
      backgroundColor: primaryDark,
      borderColor: primaryDark,
      color: 'white'
    },
    ':active': {
      borderColor: 'white'
    }
  },
  secondary: {
    backgroundColor: 'white',
    color: primary
  },
  negative: {
    backgroundColor: negative,
    borderColor: negative,
    ':hover': {
      backgroundColor: negativeDark,
      borderColor: negativeDark,
      color: 'white'
    },
    ':active': {
      borderColor: 'white'
    }
  }
})(Button)

export default function Button (props) {
  const styles = Object.keys(props).filter(key =>
    !!Button.styles[key]
  ).map(key =>
    Button.styles[key]
  )

  return <div
    className={`${Button.styles.button} ${styles.join(' ')}`}
    onClick={props.onClick}>
    {props.children}
  </div>
}
