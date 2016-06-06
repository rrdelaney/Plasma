import React from 'react'
import { applyStyles } from 'reyle'
import { font, border } from './vars'

export default function Card (props) {
  return <div className={Card.styles.card}>
    {props.img ? <img className={Card.styles.topImg} src={props.img} /> : null}
    <div className={Card.styles.body}>
      {props.children}
    </div>
  </div>
}

applyStyles({
})(Card)
