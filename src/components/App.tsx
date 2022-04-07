import * as React from 'react'
import './App.css';
import { useHandleKeyPress } from '../hooks/useHandleKeyPress';
import addNewTile from '../utils/addNewTile';

const CLEAN_GRID = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const Tile = ({ value }: { value: number }) => {
  if (!value) {
    return (
        <div className="tile empty"></div>
    )
  }
  return (
    <div className={`tile tile-${value}`}>{value}</div>
  )
}

function App() {
  const [grid, setGrid] = React.useState(CLEAN_GRID);

  React.useEffect(() => {
    setGrid(addNewTile(grid));
  }, [])

  useHandleKeyPress(grid, setGrid)
  
  return (
    <div className="page">
      <h1>2048 - fan edition</h1>
      <div className="container-max-width">
        <div className="container">
            <div className="grid">
              {grid.map((row) => {
                return row.map((value) => <Tile value={value} />)
              })}
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
