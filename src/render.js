import React from 'react'
import reactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

export default function render (Component) {
  reactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}
