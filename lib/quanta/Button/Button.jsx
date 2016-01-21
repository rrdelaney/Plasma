import React from 'react'
import { Stylesheet } from 'stylesheet'

const style = Stylesheet.create({
  button: {
    'background-color': 'white',
    'border-radius': '.5rem',
    border: 'solid .1rem green',
    color: 'green',
    cursor: 'pointer',
    display: 'inline',
    'font-family': 'Raleway',
    margin: '.5rem',
    padding: '.5rem',
    'user-select': 'none'
  }
})

export default function Button (props) {
  const styles = Object.keys(props).filter(key =>
    !!style[key]
  ).map(key =>
    style[key]
  )

  return <div className={`${style.button} ${styles.join(' ')}`}
    onClick={props.onClick}>
    {props.children}
  </div>
}

Button.propTypes = {
  type: React.PropTypes.string,
  onClick: React.PropTypes.func
}
