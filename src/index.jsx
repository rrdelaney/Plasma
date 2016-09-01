import 'bootstrap/dist/js/bootstrap'
import './app.scss'

import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import Horizon from '@horizon/client'
import Container from './Container'
import App from './App'

const hz = new Horizon({ host: 'localhost:8181' })
const root = document.getElementById('root')

ReactDOM.render(<Container horizon={hz}>
  <AppContainer>
    <App />
  </AppContainer>
</Container>, root)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default

    ReactDOM.render(<Container>
      <AppContainer>
        <NextApp />
      </AppContainer>
    </Container>, root)
  })
}
