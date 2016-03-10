import React from 'react'
import Button from './Button'
import Heading from './Heading'
import TextField from './TextField'

const Wrap = props => (
  <div>
    <h3><code>{props.text}</code></h3>
    {props.children}
    <hr />
  </div>
)

export default function () {
  return <div>
    <Wrap text='<Button>Click</Button>'>
      <Button>Click</Button>
    </Wrap>
    <Wrap text='<Button secondary>Click</Button>'>
      <Button secondary>Click</Button>
    </Wrap>
    <Wrap text='<Heading>Heading</Heading>'>
      <Heading>Heading</Heading>
    </Wrap>
    <Wrap text='<Heading small>Heading</Heading>'>
      <Heading small>Heading</Heading>
    </Wrap>
    <Wrap text='<Heading large>Heading</Heading>'>
      <Heading large>Heading</Heading>
    </Wrap>
    <Wrap text='<Heading underline>Heading</Heading>'>
      <Heading underline>Heading</Heading>
    </Wrap>
  </div>
}
