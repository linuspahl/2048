import * as React from 'react'
import ScoreContext from '../contexts/ScoreContext'

const useScore = () => {
  const scoreContext = React.useContext(ScoreContext)

  if (!scoreContext) {
    throw new Error('useScore need to be wrappen with ScoreContext.Provider.')
  }

  return scoreContext
}

export default useScore;