import useScore from '../hooks/useScore';
import './Score.css'

const Grid = () => {
  const { score } = useScore();

  return (
    <div className='score-container'>
      <div className="score">{score}</div>
    </div>
  )
}

export default Grid;