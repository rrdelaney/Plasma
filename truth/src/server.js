import koa from 'koa'
import route from 'koa-route'
import User from './User'

const PORT = 8000

let app = koa()

app.use(route.get('/test', function *() {
  this.body = 'Hello World!'
}))

app.use(route.get('/new/:name', function *(name) {
  yield new User(name, 'password', { "see": "me" })
  this.body = 'done!'
}))

app.use(route.get('/get/:name', function *(name) {
  let users = yield User.find({ name })
  this.body = users
}))

app.listen(PORT)
console.log(`Listening on port ${PORT}`)
