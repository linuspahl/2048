import { GRID_SIZE } from '../constants'
import { GridType, GridWithProps, MoveDirection } from '../types';
import addNewTile from '../utils/addNewTile';
import cloneGrid from '../utils/cloneGrid'

const addGridProperties = (grid: GridType) => {
  return grid.map((row) => {
    return row.map((value) => ({ value, isCalculated: false }))
  })
}

const isSameGrid = (grid1: GridType, grid2: GridType) => JSON.stringify(grid1) === JSON.stringify(grid2);

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

const moveTiles = (setGrid: React.Dispatch<React.SetStateAction<GridType>>, direction: MoveDirection ) => {
  const moveTilesFn = MOVE_MAPPING[direction];

  setGrid((grid: GridType) => {
    const updatedGrid = moveTilesFn(cloneGrid(grid));

    if (!isSameGrid(grid, updatedGrid)) {
      return addNewTile(updatedGrid);
    }

    return updatedGrid;
  })
};


export default moveTiles