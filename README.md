# large
ES2015 for Mongo

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


var ryan = new Person('ryan', 20)

ryan.initialized
.then(() => ryan.age = 21)
.then(() => ryan.save())
.then(() => Person.find())
.then(res => res.toArray())
.then(res => console.log(res)) // [ {_id: ..., name: 'ryan', age: 21}]
.then(() => Person.close())
```
