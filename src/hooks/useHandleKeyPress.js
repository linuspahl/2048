import * as React from 'react'
import addNewTile from '../utils/addNewTile';
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

const updateGridOnKeypress = (keyCode, grid) => {
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

  switch (keyCode) {
    case 37: // left
      return mergeToLeft(grid)
    case 38: // up
      return rotateMatrix(
        mergeToLeft(
          rotateMatrixCounterClockwise(
            grid
          )
        )
      );
    case 39: // right
      return rotateMatrixCounterClockwise(
        rotateMatrixCounterClockwise(
          mergeToLeft(
            rotateMatrix(
              rotateMatrix(
                grid
              )
            )
          )
        )
      );
    case 40: // down
      return rotateMatrixCounterClockwise(
        mergeToLeft(
          rotateMatrix(
            grid
          )
        )
      );
    default:
      break;
  }
}

const isSameGrid = (grid1, grid2) => JSON.stringify(grid1) === JSON.stringify(grid2);

const handleUserKeyPress = ({ keyCode }, grid, setGrid) => {
  const updatedGrid = updateGridOnKeypress(keyCode, grid);
  if (updatedGrid && !isSameGrid(grid, updatedGrid)) {
    setGrid(addNewTile(updatedGrid));
  }
};

export const useHandleKeyPress = (grid, setGrid) => {
  React.useEffect(() => {
    const onKeyPress = (event) => handleUserKeyPress(event, grid, setGrid);
    window.addEventListener("keydown", onKeyPress);
    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, [handleUserKeyPress, grid]);
}