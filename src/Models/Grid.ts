import Cell from "./Cell.ts";

export default class Grid {
    public columns: number = 0;
    public rows: number = 0;
    public cells: Array<Cell> = [];
    public grid: Array<Array<Cell>> = [];

    constructor(columns: number, rows: number, grid: Array<Cell>) {
        this.columns = columns;
        this.rows = rows;
        this.cells = grid;
        // this.updateGrid();
    }

    public updateGrid = () => {
        this.cells.forEach(cell => {
            this.grid[cell.row][cell.col] = cell;
        })

        for (let rows = 0; rows < this.rows; rows++) {
            for (let columns = 0; columns < this.columns; columns++) {
                this.grid[rows][columns].setGrid(this);
            }
        }

        return this;
    }

    public changeCellPosition = (cell: Cell, newRow: number, newColumn: number) => {
        for (let i = 0; i < this.rows; i++) {
            if (this.cells[i].row == cell.row && this.cells[i].col == cell.col) {
                this.cells[i].col = newColumn;
                this.cells[i].row = newRow;
                break;
            }
        }

        return this;
    }
}