import React from 'react';
import GameoverContext from './GameoverContext';
import { GridType } from '../types';
import { rotateMatrix } from '../utils/moveTiles';
import useGrid from '../hooks/useGrid';
const canMove = (cells: GridType['cells']) => {
  let canMerge = false;

  for (const row of cells) {
    let rowIndex = 0;
    for (const cell of row) {
      const nextCell = row[rowIndex + 1];
      if (nextCell !== undefined) {
        if (cell === nextCell) {
          canMerge = true
          break
        }
      }
      rowIndex++;
    }
  }

  return canMerge
}

const isNextMovePossible = (cells: GridType['cells']) => {
  const gridHasEmptyCell = cells.flat().find(cellValue => !cellValue) !== undefined;

  if (gridHasEmptyCell) {
    return false;
  }

  const canMoveHorizontically = canMove(cells);
  const canMoveVertically = canMove(rotateMatrix(cells));

  return !canMoveHorizontically && !canMoveVertically;
}

const useCheckGameover = () => {
  const { grid } = useGrid();
  const [isGameover, setIsGameOver] = React.useState(() => isNextMovePossible(grid.cells));

  React.useEffect(() => {
    setIsGameOver(isNextMovePossible(grid.cells))
  }, [grid])

  return isGameover;
}

const GameoverProvider = ({ children }: { children: React.ReactNode }) => {
  const isGameover = useCheckGameover();
  
  return (
    <GameoverContext.Provider value={{ isGameover }}>
      {children}
    </GameoverContext.Provider>
  )
}

export default GameoverProvider;