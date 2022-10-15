import useGameover from '../hooks/useGameover';
import useScore from '../hooks/useScore';
import './GameoverOverlay.css'


const GameoverOverlay = () => {
  const { isGameover } = useGameover()
  const { score } = useScore();

  if (!isGameover) {
    return null;
  }

  return (
    <div className="gameover-overlay">
      <div className='title'>GAMEOVER</div>
      <div className="score">{score}</div>
    </div>
  )
}
  
export default GameoverOverlay;