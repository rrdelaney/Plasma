import React from 'react'
import { buttonGroup } from './ButtonGroup.css'

export default function ButtonGroup ({ children }) {
  return <div className={buttonGroup}>
    {children}
  </div>
}
