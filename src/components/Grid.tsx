import './Grid.css';
import { useState, useEffect } from 'react';
import { CLEAN_GRID } from '../constants';
import Tile from './Tile'
import { useHandleKeyPress } from '../hooks/useHandleKeyPress';
import addNewTile from '../utils/addNewTile';
import './Grid.css'

const Grid = () => {
  const [grid, setGrid] = useState(CLEAN_GRID);

  useEffect(() => {
    setGrid(addNewTile(grid));
  }, [])

  useHandleKeyPress(setGrid)
  
  return (
    <div className="grid">
      {grid.map((row, rowIndex) => {
        return row.map((value, colIndex) => <Tile value={value} key={`${rowIndex}-${colIndex}`} />)
      })}
    </div>
  )
}

export default Grid;