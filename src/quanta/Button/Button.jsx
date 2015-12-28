import React from 'react'
import { button } from './Button.css'

export default function Button (props) {
	return <button className={button}>{props.children}</button>
}