import addNewTile from "./utils/addNewTile";
import useHandleKeyPress from './hooks/useHandleKeyPress';

const GRID_SIZE = 4;

const Tile = ({ value }) => {
  if (!value) {
    return (
        <div className="tile empty"></div>
    )
  }
  return (
    <div className={`tile tile-${value}`}>{value}</div>
  )
}

const cleanGrid = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];


const App = () => {
  const [grid, setGrid] = React.useState(cleanGrid);

  React.useEffect(() => {
    setGrid(addNewTile(grid));
  }, [])

  useHandleKeyPress()

  return (
    <div className="page">
      <div className="container-max-width">
        <div className="container">
            <div className="grid">
              {grid.map((row) => {
                return row.map((value) => <Tile value={value} />)
              })}
            </div>
        </div>
      </div>
    </div>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);