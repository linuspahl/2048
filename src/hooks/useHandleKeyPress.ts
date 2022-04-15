import * as React from 'react'
import addNewTile from '../utils/addNewTile';
import cloneGrid from '../utils/cloneGrid'
import { GRID_SIZE } from '../constants'
import { GridType, GridWithProps } from '../types';

const addGridProperties = (grid: GridType) => {
  return grid.map((row) => {
    return row.map((value) => ({ value, isCalculated: false }))
  })
}

const canCaptureNextCell = (grid: GridWithProps, rowIndex: number, nextTargetCellIndex: number, curValue: number) => {
  const targetCellExists = grid[rowIndex]?.[nextTargetCellIndex] !== undefined;
  const targetCellIsCalculated = grid[rowIndex][nextTargetCellIndex]?.isCalculated;
  const sameValue = grid[rowIndex][nextTargetCellIndex]?.value === curValue;
  const isNull = grid[rowIndex][nextTargetCellIndex]?.value === 0;

  return targetCellExists && !targetCellIsCalculated && (sameValue || isNull);
}

const cellIndexIsOff = (cellIndex: number) => {
  return cellIndex < 0 || cellIndex >= GRID_SIZE;
}

const mergeToLeft = (grid: GridType) => {
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

const flipMatrix = (matrix: GridType) => (
  matrix[0].map((column, index) => (
    matrix.map(row => row[index])
  ))
);

const rotateMatrix = (matrix: GridType) => (
  flipMatrix(matrix.reverse())
);

const rotateMatrixCounterClockwise = (matrix: GridType) => (
  flipMatrix(matrix).reverse()
);

const MOVE_MAPPING: { [key: string]: (grid: GridType) => GridType } = {
  'left': (grid: GridType) => mergeToLeft(grid),
  'right': (grid: GridType) => rotateMatrixCounterClockwise(
    rotateMatrixCounterClockwise(
      mergeToLeft(rotateMatrix(rotateMatrix(grid)))
    )
  ),
  'up': (grid: GridType) => rotateMatrix(
    mergeToLeft(rotateMatrixCounterClockwise(grid))
  ),
  'down': (grid: GridType) => rotateMatrixCounterClockwise(mergeToLeft(rotateMatrix(grid)))
}

const KEY_CODE_MAPPING: { [key: number]: string | undefined } = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
}

const handleUserKeyPress = (keyCode: number, setGrid: React.Dispatch<React.SetStateAction<GridType>>) => {
  if (KEY_CODE_MAPPING[keyCode] === undefined) {
    return
  }

  setGrid((grid: GridType) => {
    const moveName = KEY_CODE_MAPPING[keyCode];

    if (!moveName) {
      return grid;
    }

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

const isSameGrid = (grid1: GridType, grid2: GridType) => JSON.stringify(grid1) === JSON.stringify(grid2);

const isKeyboardEvent = (event: any): event is React.KeyboardEvent<HTMLElement> => {
  return 'keyCode' in event;
}

export const useHandleKeyPress = (setGrid: React.Dispatch<React.SetStateAction<GridType>>) => {
  React.useEffect(() => {
    const onKeyPress = (event: Event) => {
      if (isKeyboardEvent(event)) {
        handleUserKeyPress(event.keyCode, setGrid)
      }
    };
    window.addEventListener("keydown", onKeyPress);
    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, [setGrid]);
}