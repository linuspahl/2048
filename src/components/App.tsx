
import Grid from './Grid'
import './App.css'

const App = () => (
  <div className="page">
    <h1>2048 - fan edition</h1>
    <div className="container-max-width">
      <div className="container">
        <Grid />
      </div>
    </div>
  </div>
);

export default App;
