# Quanta

A React Toolkit

## Button

```jsx
import { Button } from 'quanta'

<Button>Hey</Button>
<Button success />
<Button fail />
<Button warn />
```

## Heading

```jsx
import { Heading } from 'quanta'

<Heading>Hey</Heading>
<Heading small />
<Heading large />
<Heading italic />
<Heading underline />
```

## TextField

```jsx
import { TextField } from 'quanta'

<TextField onChange={value => console.log(value)} />
<TextField validate="phone" />
<TextField validate="number" />
<TextField validate={value => true} />
```
