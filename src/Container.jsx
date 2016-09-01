import React from 'react'
import Horizon from '@horizon/client'
import { Provider } from './hzql'
import { createDevTools } from './horizon-devtools'

export default ({ children, horizon, ...props }) => {
  const DevTools = createDevTools(horizon)
  horizon.connect()

  return <div>
    <DevTools />
    <Provider horizon={horizon} {...props}>
      {children}
    </Provider>
  </div>
}
