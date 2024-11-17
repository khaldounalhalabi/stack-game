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

    public static blank = (row: number, col: number) => {
        return new Cell(row, col, CellTypeEnum.BLANK, CellColorEnum.BLANK);
    }

    public static unavailable = (row: number, col: number) => {
        return new Cell(row, col, CellTypeEnum.UNAVAILABLE, CellColorEnum.UNAVAILABLE);
    }

    public static purple = (row: number, col: number) => {
        return new Cell(row, col, CellTypeEnum.MOVABLE, CellColorEnum.PURPLE);
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

    public render = () => {
        switch (this.type) {
            case CellTypeEnum.UNAVAILABLE:
                return `<div class="w-full"></div>`
            default :
                return `<div class="w-full border border-gray-500 rounded-sm bg-white p-1">
                            <div class="bg-[${this.color}] rounded-sm w-[75px] h-[75px]"></div>
                        </div>`
        }
    }
}