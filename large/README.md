# large
ES2015 for Mongo with Promises!

# Example

```js
// Person.js

var Document = require('large').Document

class Person extends Document {
  constructor(name, age) {
    super({ name, age })
  }
}

Person.settings = { url: 'mongodb://localhost:27017/app' }

module.exports = Person
```

```js
// main.js

var Person = require('./Person')

// ES6
new Person('ryan', 20)
  .then(ryan => ryan.age = 21)
  .then(ryan => ryan.save())

Person.find({ name: 'ryan' })
  .then(people => console.log(people))
  
// ES7
let ryan = await new Person('ryan', 20)
let joe = await Person.find({ name: 'joe' })
```
