import * as React from 'react'
import GameoverContext from '../contexts/GameoverContext'

const useGameover = () => {
  const gameoverContext = React.useContext(GameoverContext)

  if (!gameoverContext) {
    throw new Error('useGameover need to be wrappen with GameoverContext.Provider.')
  }

  return gameoverContext
}

export default useGameover;