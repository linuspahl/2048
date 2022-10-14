import React, { useState, useEffect } from 'react';
import ScoreContext from './ScoreContext';

const Grid = ({ children, initialScore }: { children: React.ReactNode, initialScore: number } ) => {
  const [score, setScore] = useState(initialScore);
  
  return (
    <ScoreContext.Provider value={{ score, setScore }}>
      {children}
    </ScoreContext.Provider>
  )
}

export default Grid;