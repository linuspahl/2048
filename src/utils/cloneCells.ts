import { GridType } from "../types";

const cloneCells = (cells: GridType['cells']) => cells.map((row) => row.slice());


export default cloneCells;