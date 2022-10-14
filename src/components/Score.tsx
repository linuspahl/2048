import useScore from '../hooks/useScore';
import './Score.css'

const Grid = () => {
  const { score, highscore } = useScore();

  return (
    <div className='score-container'>
      <div className="score">
        <div className="title">Score</div>
        {score}
      </div>
      <div className="score">
        <div className='title'>Highscore</div>
        {highscore}
      </div>
    </div>
  )
}

export default Grid;