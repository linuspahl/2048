export type GridType = {
  cells: Array<Array<number>>,
  lastAddition: {
    id: string,
    sum: number,
  } | undefined
};
export type GridWithProps = Array<Array<{ value: number, isCalculated: boolean }>>;
export type MoveDirection = 'left' | 'right' | 'up' | 'down';