import { GRID_SIZE } from "../constants";

const getRandomPosition = (min = 1, max = GRID_SIZE) => {
  return Math.floor(Math.random() * (max + 1 - min) + min)
}

const getNewTilePosition = (theGrid) => {
  let row = getRandomPosition();
  let column = getRandomPosition();

  while (
    theGrid[row - 1][column - 1] !== 0
  ) {
    row = getRandomPosition();
    column = getRandomPosition();
  }

  return { row, column };
}

const addNewTile = (grid) => {
  const { row, column } = getNewTilePosition(grid);
  const newGrid = [...grid];
  newGrid[row - 1][column - 1] = 2;
  return newGrid;
}

export default addNewTile;