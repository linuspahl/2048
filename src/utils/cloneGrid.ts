import { GridType } from "../types";

const cloneGrid = (grid: GridType) => grid.map((row) => row.slice());


export default cloneGrid;