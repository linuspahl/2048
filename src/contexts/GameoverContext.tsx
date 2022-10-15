import * as React from 'react';

const GameoverContext = React.createContext<{ isGameover: boolean } | undefined>(undefined)

export default GameoverContext;
