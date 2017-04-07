import React from 'react'
import App from './App'

import render from './render'
import './styles/scss/main.scss'

render(App)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept([
    './App'
  ], () => {
    const NewApp = require('./App').default
    render(NewApp)
  })
}
