import * as React from 'react'
import addNewTile from '../utils/addNewTile';
import cloneGrid from '../utils/cloneGrid'
import { GRID_SIZE } from '../constants'

const addGridProperties = (grid) => {
  return grid.map((row) => {
    return row.map((value) => ({ value, isCalculated: false }))
  })
}

const canCaptureNextCell = (grid, rowIndex, nextTargetCellIndex, curValue) => {
  const targetCellExists = grid[rowIndex]?.[nextTargetCellIndex] !== undefined;
  const targetCellIsCalculated = grid[rowIndex][nextTargetCellIndex]?.isCalculated;
  const sameValue = grid[rowIndex][nextTargetCellIndex]?.value === curValue;
  const isNull = grid[rowIndex][nextTargetCellIndex]?.value === 0;

  return targetCellExists && !targetCellIsCalculated && (sameValue || isNull);
}

const cellIndexIsOff = (cellIndex) => {
  return cellIndex < 0 || cellIndex >= GRID_SIZE;
}

const mergeToLeft = (grid) => {
  const newGrid = addGridProperties(grid)

  const gridWithProps = addGridProperties(grid);

  gridWithProps.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cellIndexIsOff(cellIndex - 1) || cell.value === 0) {
        return;
      }

      let targetCellIndex = cellIndex;

      while (canCaptureNextCell(newGrid, rowIndex, targetCellIndex - 1, cell.value)) {
        targetCellIndex = targetCellIndex - 1;
      }
      if (targetCellIndex !== cellIndex) {
        const initialCellState = { ...newGrid[rowIndex][targetCellIndex] };
        newGrid[rowIndex][targetCellIndex] = {
          isCalculated: !!initialCellState.value ? true : false,
          value: initialCellState.value + cell.value,
        }
        newGrid[rowIndex][cellIndex] = {
          value: 0,
          isCalculated: false
        };
      }

    })
  })
  const result = newGrid.map((row) => row.map((cell) => cell.value));
  return result;
}

const flipMatrix = matrix => (
  matrix[0].map((column, index) => (
    matrix.map(row => row[index])
  ))
);

const rotateMatrix = matrix => (
  flipMatrix(matrix.reverse())
);

const rotateMatrixCounterClockwise = matrix => (
  flipMatrix(matrix).reverse()
);

const MOVE_MAPPING = {
  'left': (grid) => mergeToLeft(grid),
  'right': (grid) => rotateMatrixCounterClockwise(
    rotateMatrixCounterClockwise(
      mergeToLeft(rotateMatrix(rotateMatrix(grid)))
    )
  ),
  'up': (grid) => rotateMatrix(
    mergeToLeft(rotateMatrixCounterClockwise(grid))
  ),
  'down': (grid) => rotateMatrixCounterClockwise(mergeToLeft(rotateMatrix(grid)))
}

const KEY_CODE_MAPPING = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
}

const handleUserKeyPress = (keyCode, setGrid) => {
  if (!KEY_CODE_MAPPING[keyCode]) {
    return
  }

  setGrid((grid) => {
    const moveName = KEY_CODE_MAPPING[keyCode];
    const moveGrid = MOVE_MAPPING[moveName];

    if (!moveGrid) {
      throw Error(`Move handler is not defined for move "${moveName}" with key code ${keyCode}.`)
    }

    const updatedGrid = moveGrid(cloneGrid(grid));

    if (!isSameGrid(grid, updatedGrid)) {
      return addNewTile(updatedGrid);
    }

    return updatedGrid;
  })
}

const isSameGrid = (grid1, grid2) => JSON.stringify(grid1) === JSON.stringify(grid2);

export const useHandleKeyPress = (setGrid) => {
  React.useEffect(() => {
    const onKeyPress = (event) => handleUserKeyPress(event.keyCode, setGrid);
    window.addEventListener("keydown", onKeyPress);
    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, [setGrid]);
}