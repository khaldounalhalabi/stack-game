import Cell from "./Cell.ts";

export default class Grid {
    public columns: number = 0;
    public rows: number = 0;
    public cells: Array<Cell> = [];
    public grid: Array<Array<Cell>> = [];

    constructor(columns: number, rows: number, cells: Array<Cell>) {
        this.columns = columns;
        this.rows = rows;
        this.cells = cells;
        for (let i = 0; i < rows; i++) {
            this.grid.push(this.cells.slice(i * this.columns, (i + 1) * this.columns));
        }
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

    public each = (callable: ((cell: Cell) => boolean | void)) => {
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                if (callable(this.grid[row][column]) === false) {
                    break;
                }
            }
        }
    }

    public eachRow = (rowsHandler: ((cell: Cell[]) => boolean | void)) => {
        for (let row = 0; row < this.rows; row++) {
            if (rowsHandler(this.grid[row]) === false) {
                break;
            }
        }
    }

    public render = () => {
        const renderedCells: string[] = [];
        this.each((cell) => {
            renderedCells.push(cell.render());
        })

        const gridView = `
            <div class="w-full grid grid-cols-${this.columns}">
                ${renderedCells.join(' ')}
            </div>
        `

        const container = document.getElementById('grid-view');
        if (container) {
            container.innerHTML = `${gridView}`;
        } else {
            alert("There is no grid to show")
        }
    }
}