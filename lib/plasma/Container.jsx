import React from 'react'
import { Provider } from 'react-redux'
import { DevTools } from 'devtools'
import configureStore from './store'

export default function Container ({ store, children }) {
  return <Provider store={store}>
    <div>
      <DevTools />
      <div>
        {children}
      </div>
    </div>
  </Provider>
}
