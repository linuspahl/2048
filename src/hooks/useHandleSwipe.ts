import { useSwipeable } from 'react-swipeable'
import moveTiles from '../utils/moveTiles';
import useGrid from './useGrid';

const useHandleSwipe = () => {
  const { setGrid } = useGrid();
  return (
    useSwipeable({
      onSwipedLeft: () => moveTiles(setGrid, 'left'),
      onSwipedRight: () => moveTiles(setGrid, 'right'),
      onSwipedUp: () => moveTiles(setGrid,  'up'),
      onSwipedDown: () => moveTiles(setGrid, 'down'),
    })
)}

export default useHandleSwipe