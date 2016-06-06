import React from 'react'
import { applyStyles } from 'reyle'
import { font, primary, dimPrimary, darkPrimary, secondary, dimSecondary, darkSecondary } from './vars'

export default function Button (props) {
  const propStyles = Object.keys(props).filter(key =>
    !!Button.styles[key]
  ).map(key =>
    Button.styles[key]
  )

  return <div
    className={`${Button.styles.button} ${propStyles.join(' ')}`}
    onClick={props.onClick}>
    {props.children}
  </div>
}

applyStyles({
  button: {
    backgroundColor: primary,
    borderRadius: '.5rem .5rem .4rem .4rem',
    borderBottom: `solid .2rem ${darkPrimary}`,
    color: 'white',
    cursor: 'pointer',
    display: 'inline-block',
    fontFamily: font,
    padding: '.5rem',
    margin: 'auto .2rem',
    userSelect: 'none',
    transition: 'background-color .2s',
    ':hover': {
      backgroundColor: dimPrimary
    },
    ':active': {
      backgroundColor: darkPrimary
    }
  },
  secondary: {
    backgroundColor: secondary,
    borderBottomColor: darkSecondary,
    ':hover': { backgroundColor: dimSecondary },
    ':active': { backgroundColor: darkSecondary }
  }
})(Button)
