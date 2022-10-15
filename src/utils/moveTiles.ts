import { GRID_SIZE } from '../constants'
import { GridType, GridWithProps, MoveDirection } from '../types';
import addNewTile from '../utils/addNewTile';
import cloneCells from './cloneCells';
import { v4 as uuid} from 'uuid';


const addGridProperties = (cells: GridType['cells']) => {
  return cells.map((row) => {
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
  const newCells = addGridProperties(grid.cells)
  let mergedCellsSum = 0;

  const gridWithProps = addGridProperties(grid.cells);
  gridWithProps.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cellIndexIsOff(cellIndex - 1) || cell.value === 0) {
        return;
      }

      let targetCellIndex = cellIndex;

      while (canCaptureNextCell(newCells, rowIndex, targetCellIndex - 1, cell.value)) {
        targetCellIndex = targetCellIndex - 1;
      }
      if (targetCellIndex !== cellIndex) {
        const initialCellState = { ...newCells[rowIndex][targetCellIndex] };
        newCells[rowIndex][targetCellIndex] = {
          isCalculated: !!initialCellState.value ? true : false,
          value: initialCellState.value + cell.value,
        }
        if (initialCellState.value && cell.value && (initialCellState.value + cell.value !== initialCellState.value)) {
          mergedCellsSum = mergedCellsSum + initialCellState.value + cell.value;
        }
        newCells[rowIndex][cellIndex] = {
          value: 0,
          isCalculated: false
        };
      }
    })
  })

  const lastAddition = mergedCellsSum ? { id: uuid(), sum: mergedCellsSum } : grid.lastAddition;

  return ({
    cells: newCells.map((row) => row.map((cell) => cell.value)),
    lastAddition,
  })
}

const flipMatrix = (matrix: GridType['cells']) => (
  [...matrix][0].map((column, index) => (
    [...matrix].map(row => row[index])
  ))
);

export const rotateMatrix = (matrix: GridType['cells']) => (
  flipMatrix([...matrix].reverse())
);

const rotateMatrixCounterClockwise = (matrix: GridType['cells']) => (
  flipMatrix([...matrix]).reverse()
);

const MOVE_MAPPING: { [key: string]: (grid: GridType) => GridType } = {
  'left': (grid: GridType) => mergeToLeft(grid),
  'right': (grid: GridType) => {
    const gridWithNewCells = mergeToLeft({ ...grid, cells: rotateMatrix(rotateMatrix(grid.cells))});
    
    return ({
      ...gridWithNewCells,
      cells: rotateMatrixCounterClockwise(rotateMatrixCounterClockwise(gridWithNewCells.cells)),
    })
  },
  'up': (grid: GridType) => {
    const gridWithNewCells = mergeToLeft({ ...grid, cells: rotateMatrixCounterClockwise(grid.cells)});
    
    return ({
      ...gridWithNewCells,
      cells: rotateMatrix(gridWithNewCells.cells),
    })
  },
  'down': (grid: GridType) => {
    const gridWithNewCells = mergeToLeft({ ...grid, cells: rotateMatrix(grid.cells)});
    
    return ({
      ...gridWithNewCells,
      cells: rotateMatrixCounterClockwise(gridWithNewCells.cells),
    })
  }
}

const moveTiles = (setGrid: React.Dispatch<React.SetStateAction<GridType>>, direction: MoveDirection ) => {
  const moveTilesFn = MOVE_MAPPING[direction];

  setGrid((grid: GridType) => {
    const updatedGrid = moveTilesFn({...grid, cells: cloneCells(grid.cells) });

    if (!isSameGrid(grid, updatedGrid)) {
      return { ...updatedGrid, cells: addNewTile(updatedGrid.cells)};
    }

    return updatedGrid;
  })
};


export default moveTiles