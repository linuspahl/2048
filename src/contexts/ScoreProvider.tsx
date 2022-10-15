import React, { useState } from 'react';
import ScoreContext from './ScoreContext';

const ScoreProvider = ({ children, initialScore, initialHighscore }: { children: React.ReactNode, initialScore: number, initialHighscore: number } ) => {
  const [score, setScore] = useState(initialScore);
  const [highscore, setHighscore] = useState(initialHighscore || 0);
  
  return (
    <ScoreContext.Provider value={{ score, setScore, highscore, setHighscore }}>
      {children}
    </ScoreContext.Provider>
  )
}

export default ScoreProvider;