import koa from 'koa'
import route from 'koa-route'

const PORT = 8000

let app = koa()

app.use(route.get('/test', function *() {
  this.body = 'Hello World!'
}))

app.listen(PORT)
console.log(`Listening on port ${PORT}`)
