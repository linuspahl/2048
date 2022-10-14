
import Grid from './Grid'
import './App.css'
import Score from './Score';
import ScoreProvider from '../contexts/ScoreProvider';

const App = () => (
  <ScoreProvider>
    <div className="page">
      <h1>2048 - fan edition</h1>
      <div className="container-max-width">
        <Score />
        <div className="container">
          <Grid />
        </div>
      </div>
    </div>
  </ScoreProvider>
);

export default App;
