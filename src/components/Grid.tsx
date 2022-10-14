import './Grid.css';
import { useEffect } from 'react';
import Tile from './Tile'
import { useHandleKeyPress } from '../hooks/useHandleKeyPress';
import useHandleSwipe from '../hooks/useHandleSwipe';

import useScore from '../hooks/useScore';
import { GridType } from '../types';
import './Grid.css'
import React from 'react';
import useGrid from '../hooks/useGrid';

const useUpdateScore = (grid: GridType) => {
  const { setScore, score, highscore, setHighscore } = useScore();
  const lastAdditionRef = React.useRef<GridType['lastAddition']>(grid.lastAddition)

  useEffect(() => {
    if (grid.lastAddition?.id && grid.lastAddition.id !== lastAdditionRef.current?.id) {
      lastAdditionRef.current = grid.lastAddition;
      if (grid.lastAddition?.sum) {
        setScore((score) => score + (grid.lastAddition?.sum ?? 0))
      }
    }
  }, [grid, setScore])

  useEffect(() => {
    if (score > highscore) {
      console.log({highscore})
      setHighscore(score);
    }
  }, [score, setHighscore])
}

const Grid = () => {  
  const { score, highscore } = useScore();
  const { grid } = useGrid();
  useUpdateScore(grid)

  useEffect(() => {
    window.localStorage.setItem('savegame', JSON.stringify({ ...grid, score, highscore }))
  }, [grid, score, highscore])

  useHandleKeyPress()
  const swipeHandlers = useHandleSwipe()
  
  return (
    <div className="grid" {...swipeHandlers}>
      {grid.cells.map((row, rowIndex) => {
        return row.map((value, colIndex) => <Tile value={value} key={`${rowIndex}-${colIndex}`} />)
      })}
    </div>
  )
}

export default Grid;