import React from 'react'
import { Provider } from 'react-redux'
import GameContainer from './GameContainer'
import { store } from './redux/store'

export default function GameApp() {
  return (
    <div>
      <Provider store={store}>
        <GameContainer/>
      </Provider>
    </div>
  )
}
