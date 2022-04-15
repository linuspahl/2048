import { GRID_SIZE } from "../constants";
import { GridType } from "../types";

const getRandomPosition = (min = 1, max = GRID_SIZE) => {
  return Math.floor(Math.random() * (max + 1 - min) + min)
}

const getNewTilePosition = (grid: GridType) => {
  let row = getRandomPosition();
  let column = getRandomPosition();

  while (
    grid[row - 1][column - 1] !== 0
  ) {
    row = getRandomPosition();
    column = getRandomPosition();
  }

  return { row, column };
}

const addNewTile = (grid: GridType) => {
  const { row, column } = getNewTilePosition(grid);
  const newGrid = [...grid];
  newGrid[row - 1][column - 1] = 2;
  return newGrid;
}

export default addNewTile;