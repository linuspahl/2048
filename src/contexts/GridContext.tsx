import * as React from 'react';
import { GridType } from '../types';

const GridContext = React.createContext<{
  grid: GridType,
  setGrid: React.Dispatch<React.SetStateAction<GridType>>
} | undefined>(undefined)

export default GridContext;
