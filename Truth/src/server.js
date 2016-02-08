import koa from 'koa'
import route from 'koa-route'
import bodyParser from 'koa-bodyparser'
import User from './User'

const PORT = 8000

let app = koa()
app.use(bodyParser())

app.use(route.get('/ping', function *() {
  this.body = 'pong'
}))

app.use(route.post('/create', function *() {
  let { username, password, permissions } = this.request.body
  
  try {
    yield new User(username, password, permissions)
    this.body = JSON.stringify({ success: true })
  } catch (err) {
    if (err.code === 11000) {
      this.body = JSON.stringify({ success: false, message: 'That username already exists!' })
    } else {
      this.body = JSON.stringify({ success: false, err }) 
    }
  }
}))

app.use(route.get('/get/:username', function *(username) {
  let users = yield User.find({ _id: username })
  let { _id, permissions } = users[0]
  this.body = JSON.stringify({ username: _id, permissions })
}))

app.listen(PORT)
console.log(`Listening on port ${PORT}`)
