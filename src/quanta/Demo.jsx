import React from 'react'
import Button from './Button'
import Heading from './Heading'
import TextField from './TextField'
import Text from './Text'
import Checkbox from './Checkbox'

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
    <Wrap text="<TextField placeholder='Enter text...' />">
      <TextField placeholder='Enter text...'/>
    </Wrap>
    <Wrap text="<TextField validate='number' />">
      <TextField validate='number' />
    </Wrap>
    <Wrap text="<Text>...</Text>">
      <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
    </Wrap>
    <Wrap text="<Text bold>...</Text>">
      <Text bold>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
    </Wrap>
    <Wrap text="<Checkbox />">
      <Checkbox />
    </Wrap>
  </div>
}
