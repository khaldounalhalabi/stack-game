import Cell from "./Cell.ts";
import {MovementDirectionEnum} from "../Enums/MovementDirectionEnum.ts";
import {Direction} from "../Types/Direction.ts";

export default class Grid {
    public columns: number = 0;
    public rows: number = 0;
    public cells: Array<Cell> = [];
    public grid: Array<Array<Cell>> = [];
    public allowedSteps = 0
    public existedColors: Record<string, number> = {};

    constructor(columns: number, rows: number, allowedSteps: number, cells: Array<Cell>) {
        this.columns = columns;
        this.rows = rows;
        this.cells = cells;
        this.allowedSteps = allowedSteps;
        this.init();
    }

    public init = () => {
        for (let i = 0; i < this.rows; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.columns; j++) {
                const c = this.cells.filter(cell => (cell.row == i && cell.col == j))?.[0] ?? Cell.blank(i, j);
                this.grid[i][j] = c;
                if (!c.isBlank() && !c.isObstacle()) {
                    if (this.existedColors[c.color] !== undefined && this.existedColors[c.color] !== null) {
                        this.existedColors[c.color] = this.existedColors[c.color] + 1;
                    } else {
                        this.existedColors[c.color] = 1;
                    }
                }
            }
        }
    }

    public hasWon = () => {
        return Object.values(this.existedColors).filter(value => value > 1).length <= 0
    }

    public canMove = () => {
        return this.allowedSteps > 0;
    }

    public each = (callable: ((cell: Cell) => boolean | void)) => {
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                if (callable(this.cell(row, column)) === false) {
                    break;
                }
            }
        }
    }

    public render = () => {
        const gridCols = `w-full grid grid-cols-${this.columns} grid-animate`;
        const gridView = document.createElement('div');
        gridView.className = gridCols;
        const allowedMovesElement = document.createElement('div');
        allowedMovesElement.className = "w-full flex justify-center items-center mt-10";
        allowedMovesElement.innerHTML = `Remained actions : ${this.allowedSteps}`

        this.each((cell) => {
            const cellElement = cell.render();
            cellElement.classList.add('cell-animate');
            gridView.appendChild(cellElement);
        });

        const container = document.getElementById('grid-view');
        if (container) {
            container.innerHTML = '';
            container.appendChild(gridView);
            container.appendChild(allowedMovesElement);
        } else {
            alert('There is no grid to show');
        }
    };


    public cell = (row: number, col: number) => this.grid[row][col];

    public move({rowDelta, colDelta}: Direction) {
        if (this.allowedSteps <= 0) {
            return this;
        }
        let rowStart = (rowDelta == 1) ? this.rows - 2 : 1;
        let rowEnd = (rowDelta == 1) ? -1 : this.rows;
        let rowStep = (rowDelta == 1) ? -1 : 1;

        let colStart = (colDelta == 1) ? this.columns - 2 : 1;
        let colEnd = (colDelta == 1) ? -1 : this.columns;
        let colStep = (colDelta == 1) ? -1 : 1;

        let isDirty = false;

        for (let i = (rowDelta == 0) ? 0 : rowStart; i != rowEnd; i += rowStep) {
            for (let j = (colDelta == 0) ? 0 : colStart; j != colEnd; j += colStep) {
                if (this.cell(i, j).isBlank() || this.cell(i, j).isObstacle()) {
                    continue;
                }

                let k = i;
                let l = j;

                while (true) {
                    let nextRow = k + rowDelta;
                    let nextCol = l + colDelta;

                    if (nextRow < 0 || nextRow >= this.rows || nextCol < 0 || nextCol >= this.columns) {
                        break;
                    }

                    if (this.cell(nextRow, nextCol).color == this.cell(k, l).color) {
                        this.existedColors[this.cell(k, l).color] = this.existedColors[this.cell(k, l).color] - 1;
                        (this.grid[k][l]) = Cell.blank(k, l);
                        isDirty = true;
                    } else if (this.cell(nextRow, nextCol).isObstacle()) {
                        break;
                    } else if (this.cell(nextRow, nextCol).isBlank()) {
                        (this.grid[nextRow][nextCol]) = (this.grid[k][l]);
                        (this.grid[nextRow][nextCol]).col = nextCol;
                        (this.grid[nextRow][nextCol]).row = nextRow;
                        (this.grid[nextRow][nextCol]).type = (this.grid[k][l]).type;
                        (this.grid[k][l]) = Cell.blank(k, l);
                        isDirty = true;
                    } else {
                        break;
                    }

                    k = nextRow;
                    l = nextCol;
                }
            }
        }

        if (isDirty) {
            this.allowedSteps--;
        }

        this.render();

        return this;
    }

    public enableKeyboard = () => {
        const move = ({rowDelta, colDelta}: Direction) => this.move({rowDelta, colDelta});
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            if (this.allowedSteps <= 0 && !this.hasWon()) {
                setTimeout(() => {
                    alert("You lost");
                    window.location.reload();
                }, 300)
                return this;
            }
            switch (event.key) {
                case "ArrowUp":
                    move(MovementDirectionEnum.UP);
                    break;
                case "ArrowDown":
                    move(MovementDirectionEnum.DOWN);
                    break;
                case "ArrowLeft":
                    move(MovementDirectionEnum.LEFT);
                    break;
                case "ArrowRight":
                    move(MovementDirectionEnum.RIGHT);
                    break;
            }
            if (this.hasWon()) {
                setTimeout(() => {
                    alert("You won");
                    window.location.reload();
                }, 300)
                return;
            }
        });

        return this;
    }

    public clone(): Grid {
        const clonedCells = this.cells.map(cell => cell.clone());
        const clonedGridArray = this.grid.map(row => row.map(cell => cell.clone()));
        const clonedGrid = new Grid(this.columns, this.rows, this.allowedSteps, clonedCells);
        clonedGrid.grid = clonedGridArray;
        clonedGrid.existedColors = {...this.existedColors};
        return clonedGrid;
    }
}