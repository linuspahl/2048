const GRID_SIZE = 4;

const Tile = ({ value }) => {
  if (!value) {
    return (
        <div className="tile empty"></div>
    )
  }
  return (
    <div className={`tile tile-${value}`}>{value}</div>
  )
}

const cleanGrid = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const getRandomPosition = (min = 1, max = GRID_SIZE) => {
    return Math.floor(Math.random() * (max - min) + min)
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
        const initialCellState = {...newGrid[rowIndex][targetCellIndex]};
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

const handleUserKeyPress = (event, grid, setGrid) => {
  const { key, keyCode } = event;
  const updatedGrid = updateGridOnKeypress(keyCode, grid);
  if (updatedGrid) {
    setGrid(addNewTile(updatedGrid));
  }
};

const App = () => {
  const [grid, setGrid] = React.useState(cleanGrid);

  React.useEffect(() => {
    setGrid(addNewTile(grid));
  }, [])

  React.useEffect(() => {
    const onKeyPress = (event) => handleUserKeyPress(event, grid, setGrid)
    window.addEventListener("keydown", onKeyPress);
    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, [handleUserKeyPress, grid]);

  return (
    <div className="container">
      <div className="grid">
        {grid.map((row) => {
          return row.map((value) => <Tile value={value} />)
        })}
      </div>
    </div>
  )
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);