import { useSwipeable } from 'react-swipeable'
import { GridType } from '../types';
import moveTiles from '../utils/moveTiles';

const useHandleSwipe = (setGrid: React.Dispatch<React.SetStateAction<GridType>>) => {
  return useSwipeable({
    onSwipedLeft: () => moveTiles(setGrid, 'left'),
    onSwipedRight: () => moveTiles(setGrid, 'right'),
    onSwipedUp: () => moveTiles(setGrid, 'up'),
    onSwipedDown: () => moveTiles(setGrid, 'down'),

  });
}

export default useHandleSwipe