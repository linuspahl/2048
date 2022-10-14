import './Grid.css';
import { useState, useEffect } from 'react';
import { CLEAN_GRID } from '../constants';
import Tile from './Tile'
import { useHandleKeyPress } from '../hooks/useHandleKeyPress';
import useHandleSwipe from '../hooks/useHandleSwipe';
import addNewTile from '../utils/addNewTile';
import useScore from '../hooks/useScore';
import { GridType } from '../types';
import './Grid.css'
import React from 'react';

const useUpdateScore = (grid: GridType) => {
  const { setScore } = useScore();
  const lastAdditionRef = React.useRef<GridType['lastAddition']>(grid.lastAddition)


  useEffect(() => {
    if (grid.lastAddition?.id && grid.lastAddition.id !== lastAdditionRef.current?.id) {
      lastAdditionRef.current = grid.lastAddition;
      if (grid.lastAddition?.sum) {
        setScore((score) => score + (grid.lastAddition?.sum ?? 0))
      }
    }
  }, [grid])
}

const Grid = () => {
  const [grid, setGrid] = useState<GridType>({ cells: CLEAN_GRID, lastAddition: undefined });
  useUpdateScore(grid)

  useEffect(() => {
    setGrid(addNewTile(grid));
  }, [])

  useHandleKeyPress(setGrid)
  const swipeHandlers = useHandleSwipe(setGrid)
  
  return (
    <div className="grid" {...swipeHandlers}>
      {grid.cells.map((row, rowIndex) => {
        return row.map((value, colIndex) => <Tile value={value} key={`${rowIndex}-${colIndex}`} />)
      })}
    </div>
  )
}

export default Grid;