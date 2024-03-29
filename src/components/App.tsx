
import Grid from './Grid'
import './App.css'
import Score from './Score';
import ScoreProvider from '../contexts/ScoreProvider';
import GridProvider from '../contexts/GridProvider';
import GameoverProvider from '../contexts/GameoverProvider';

import React from 'react';
import addNewTile from '../utils/addNewTile';
import { CLEAN_GRID } from '../constants';
import useGrid from '../hooks/useGrid';
import useScore from '../hooks/useScore';
import cloneCells from '../utils/cloneCells';
import GameoverOverlay from './GameoverOverlay';

const createNewGameState = () => ({ cells: addNewTile(cloneCells(CLEAN_GRID)), lastAddition: undefined, score: 0, highscore: 0 });

const StartGameButton = () => {
  const { setGrid } = useGrid()
  const { setScore } = useScore()
  const startNewGame = () => {
    const { cells, lastAddition, score } = createNewGameState();
    setGrid({ cells, lastAddition })
    setScore(score)
  }
  return (
    <button type="button" onClick={startNewGame}>
      Start new
    </button>
  );
}

const getInitialGameState = () => {
  const localStorageSavegame = window.localStorage.getItem('savegame'); 
  return localStorageSavegame ? JSON.parse(localStorageSavegame) : createNewGameState();
}

const App = () => {
  const initialGameState = React.useMemo(() => getInitialGameState(), []);

  return (
    <ScoreProvider initialScore={initialGameState.score} initialHighscore={initialGameState.highscore}>
      <GridProvider initialGrid={{ cells: initialGameState.cells, lastAddition: initialGameState.lastAddition  }}>
        <GameoverProvider>
          <div className="page">
            <h1>2048 - fan edition</h1>
            <div className="container-max-width">
              <div className="header">
                <Score />
                <StartGameButton />
              </div>
              <div className="container">
                <Grid />
                <GameoverOverlay />
              </div>
            </div>
          </div>
        </GameoverProvider>
      </GridProvider>
    </ScoreProvider>
  )
};

export default App;
