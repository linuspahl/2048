import * as React from 'react'
import GridContext from '../contexts/GridContext'

const useGrid = () => {
  const gridContext = React.useContext(GridContext)

  if (!gridContext) {
    throw new Error('useGrid need to be wrappen with GridContext.Provider.')
  }

  return gridContext
}

export default useGrid;