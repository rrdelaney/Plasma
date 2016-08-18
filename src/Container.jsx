import React from 'react'
import Horizon from '@horizon/client'
import { Provider } from 'hzql'
import { createDevTools } from 'horizon-devtools'

const horizon = new Horizon({ host: 'localhost:8181' })
const DevTools = createDevTools(horizon)
horizon.connect()


export default ({ children }) => <div>
  <DevTools />
  <Provider horizon={horizon}>
    {children}
  </Provider>
</div>
