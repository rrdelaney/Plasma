import koa from 'koa'
import { route, bodyParser, cors } from 'libk'
import User from './User'

const PORT = 8000

let app = koa()
app.use(bodyParser)

app.use(route.GET('/ping', async ctx => {
  ctx.body = 'pong'
}))

app.use(route.POST('/create', function *() {
  let { username, password, permissions } = this.request.body

  try {
    yield new User(username, password, permissions).initialized
    this.body = JSON.stringify({ success: true })
  } catch (err) {
    if (err.code === 11000) {
      this.body = JSON.stringify({ success: false, message: 'That username already exists!' })
    } else {
      this.body = JSON.stringify({ success: false, err: err.toString() })
    }
  }
}))

app.use(route.POST('/login', function *() {
  let { username, password } = this.request.body
  let [ user ] = yield User.find({ _id: username })
  let success = yield user.login(password)

  if (success) {
    this.body = JSON.stringify({ success: true, token: user.token })
  } else {
    this.body = JSON.stringify({ success: false })
  }
}))

app.use(route.get('/get/:username', function *(username) {
  let users = yield User.find({ _id: username })
  let { _id, permissions } = users[0]
  this.body = JSON.stringify({ username: _id, permissions })
}))

app.listen(PORT)
console.log(`Listening on port ${PORT}`)
