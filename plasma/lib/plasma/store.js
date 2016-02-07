import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { DevTools } from 'devtools'
import reducer from './reducer'

export default function configureStore (initialState) {
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      DevTools.instrument()
    )
  )

  // if (module && module.hot) {
  //   module.hot.accept('./reducer', () =>
  //     store.replaceReducer(require('./reducer').default)
  //   )
  // }

  return store
}
