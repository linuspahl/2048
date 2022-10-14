import * as React from 'react';

const ScoreContext = React.createContext<{
  score: number,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  highscore: number,
  setHighscore: React.Dispatch<React.SetStateAction<number>>,
} | undefined>(undefined)

export default ScoreContext;
