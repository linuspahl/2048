import { GridType } from "../types";

const cloneGrid = (cells: GridType['cells']) => cells.map((row) => row.slice());


export default cloneGrid;