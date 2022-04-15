import * as React from 'react'
import { GridType, MoveDirection } from '../types';
import moveTiles from '../utils/moveTiles'

const KEY_CODE_MAPPING: { [key: number]: MoveDirection } = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
}

const isKeyboardEvent = (event: any): event is React.KeyboardEvent<HTMLElement> => {
  return 'keyCode' in event;
}

const handleUserKeyPress = (keyCode: number, setGrid: React.Dispatch<React.SetStateAction<GridType>>) => {
  const moveDirection = KEY_CODE_MAPPING[keyCode];

  if (!moveDirection) {
    return
  }

  moveTiles(setGrid, moveDirection);
}

export const useHandleKeyPress = (setGrid: React.Dispatch<React.SetStateAction<GridType>>) => {
  React.useEffect(() => {
    const onKeyPress = (event: Event) => {
      if (isKeyboardEvent(event)) {
        handleUserKeyPress(event.keyCode, setGrid)
      }
    };
    window.addEventListener("keydown", onKeyPress);
    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, [setGrid]);
}