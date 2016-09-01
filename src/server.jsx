import React from 'react'
import { renderToString } from 'react-dom/server'
import Fiber from 'fibers'
import ws from 'ws'
import { AppContainer } from 'react-hot-loader'
import Horizon from '@horizon/client'
import soular from 'soular'
import serveStatic from 'soular/static'
import router from 'soular/react-router'
import Container from './Container'
import App from './App'

global.WebSocket = ws

const Page = content => `
  <!doctype html>
  <html>
    <head>
      <title>Plasma</title>
    </head>
    <body>
      <div id='root'>${content}</div>
      <script src="//cdnjs.cloudflare.com/ajax/libs/tether/1.3.1/js/tether.min.js"></script>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
      <script src="/dist/bundle.js"></script>
    </body>
  </html>
`

soular('*')
  .use(() => new Promise(resolve => {
    const hz = new Horizon({ host: 'localhost:8181' })

    Fiber(() => {
      let res = renderToString(<Container horizon={hz} fiber={Fiber}>
        <AppContainer>
          <App />
        </AppContainer>
      </Container>)

      resolve({ body: Page(res) })
      hz.disconnect()
    }).run()
  }))
  .listen(3001)
