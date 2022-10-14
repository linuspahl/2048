import React, { useState, useEffect } from 'react';
import ScoreContext from './ScoreContext';

const Grid = ({ children }: { children: React.ReactNode } ) => {
  const [score, setScore] = useState(0);
  
  return (
    <ScoreContext.Provider value={{ score, setScore }}>
      {children}
    </ScoreContext.Provider>
  )
}

export default Grid;