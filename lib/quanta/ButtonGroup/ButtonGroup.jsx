import React from 'react'
import { buttonGroup } from './ButtonGroup.css'

export default function ButtonGroup ({children}) {
  console.log(children)
  return <div className={buttonGroup}>
    {children}
  </div>
}
