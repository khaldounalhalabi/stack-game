import {CellTypeEnum} from "../Enums/CellTypeEnum.ts";
import {CellColorEnum} from "../Enums/CellColorEnum.ts";
import Grid from "./Grid.ts";
import {Position} from "../Types/Position.ts";

export default class Cell {
    public row: number = 0;
    public col: number = 0;
    public type: CellTypeEnum = CellTypeEnum.UNAVAILABLE;
    public color: CellColorEnum = CellColorEnum.UNAVAILABLE;
    public grid?: Grid = undefined;

    constructor(row: number, col: number, type: CellTypeEnum, color: CellColorEnum) {
        this.row = row;
        this.col = col;
        this.type = type;
        this.color = color;
    }

    public setGrid = (grid: Grid) => {
        this.grid = grid;
        return this;
    }

    public changePosition = (
        newPosition: ((cell: Cell) => ({ col: number, row: number })) | Position) => {
        if (typeof newPosition == "function") {
            newPosition = newPosition(this);
        }

        this.col = newPosition.col;
        this.row = newPosition.row;
        this.grid?.changeCellPosition(this, this.row, this.col);

        return this;
    }

    public increaseColumn = () => {
        this.changePosition((cell) => ({
            row: cell.row,
            col: cell.col + 1
        }));

        return this;
    }

    public decreaseColumn = () => {
        this.changePosition((cell) => ({
            row: cell.row,
            col: cell.col - 1
        }));

        return this;
    }

    public increaseRow = () => {
        this.changePosition((cell) => ({
            row: cell.row + 1,
            col: cell.col
        }));

        return this;
    }

    public decreaseRow = () => {
        this.changePosition((cell) => ({
            row: cell.row - 1,
            col: cell.col
        }));

        return this;
    }
}