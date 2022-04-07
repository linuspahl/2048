import './Tile.css'

const Tile = ({ value }: { value: number }) => {
  if (!value) {
    return (
      <div className="tile empty"></div>
    )
  }

  return (
    <div className={`tile tile-${value}`}>{value}</div>
  )
}
  
export default Tile;