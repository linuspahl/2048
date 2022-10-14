import { GRID_SIZE } from "../constants";
import { GridType } from "../types";

const getRandomPosition = (min = 1, max = GRID_SIZE) => {
  return Math.floor(Math.random() * (max + 1 - min) + min)
}

const getNewTilePosition = (cells: GridType['cells']) => {
  let row = getRandomPosition();
  let column = getRandomPosition();

  while (
    cells[row - 1][column - 1] !== 0
  ) {
    row = getRandomPosition();
    column = getRandomPosition();
  }

  return { row, column };
}

const addNewTile = (cells: GridType['cells']): GridType['cells'] => {
  const { row, column } = getNewTilePosition(cells);
  const newCells = [...cells];
  newCells[row - 1][column - 1] = 2;
  return newCells;
}

export default addNewTile;