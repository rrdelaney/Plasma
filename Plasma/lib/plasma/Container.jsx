import React from 'react'
import { Provider } from 'react-redux'
import { DevTools } from 'devtools'
import configureStore from './store'

export default function Container ({ store, children }) {
  return <Provider store={store}>
    <div>
      {process.env.NODE_ENV !== 'production' ? <DevTools /> : null}
      <div>
        {children}
      </div>
    </div>
  </Provider>
}
