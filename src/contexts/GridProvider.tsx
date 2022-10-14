import React, { useState } from 'react';
import { GridType } from '../types';
import GridContext from './GridContext';

const GridProvider = ({ children, initialGrid }: { children: React.ReactNode, initialGrid: GridType } ) => {
  const [grid, setGrid] = useState<GridType>(initialGrid);
  
  return (
    <GridContext.Provider value={{ grid, setGrid }}>
      {children}
    </GridContext.Provider>
  )
}

export default GridProvider;