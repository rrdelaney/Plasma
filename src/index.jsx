import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import Container from './Container'
import App from './App'

const root = document.getElementById('root')



ReactDOM.render(<Container>
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
