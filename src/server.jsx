import React from 'react'
import { renderToString } from 'react-dom/server'
import Fiber from 'fibers'
import ws from 'ws'
import Horizon from '@horizon/client'
import { Provider } from 'hzql'
import App from './App'

global.WebSocket = ws

let hz = new Horizon({ host: 'localhost:8181' })

Fiber(() => {
  let res = renderToString(<Provider horizon={hz} fiber={Fiber}>
    <App />
  </Provider>)

  console.log(res)
  hz.disconnect()
}).run()
