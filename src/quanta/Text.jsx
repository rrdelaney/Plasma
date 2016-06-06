import React from 'react'
import { applyStyles } from 'reyle'
import { font, dark } from './vars'

export default function Text (props) {
  const styles = Object.keys(props).filter(key =>
    !!Text.styles[key]
  ).map(key =>
    Text.styles[key]
  )

  return <div className={`${Text.styles.text} ${styles.join(' ')}`}>
    {props.children}
  </div>
}

applyStyles({
  text: {
    fontFamily: font,
    fontSize: '16px'
  },
  bold: {
    fontWeight: 'bold'
  }
})(Text)
