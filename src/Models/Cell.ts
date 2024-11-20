import {CellTypeEnum} from "../Enums/CellTypeEnum.ts";
import {CellColorEnum} from "../Enums/CellColorEnum.ts";

export default class Cell {
    public row: number = 0;
    public col: number = 0;
    public type: CellTypeEnum = CellTypeEnum.UNAVAILABLE;
    public color: CellColorEnum = CellColorEnum.UNAVAILABLE;

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

    public static yellow = (row: number, col: number) => {
        return new Cell(row, col, CellTypeEnum.MOVABLE, CellColorEnum.YELLOW);
    }

    public static orange = (row: number, col: number) => {
        return new Cell(row, col, CellTypeEnum.MOVABLE, CellColorEnum.ORANGE);
    }

    public static green = (row: number, col: number) => {
        return new Cell(row, col, CellTypeEnum.MOVABLE, CellColorEnum.GREEN);
    }

    public render = () => {
        let element = document.createElement('div');
        element.className = "cell w-full border border-gray-500 rounded-sm p-1";
        element.setAttribute('data-row', String(this.row));
        element.setAttribute('data-col', String(this.col));

        switch (this.type) {
            case CellTypeEnum.UNAVAILABLE:
                element.classList.add("bg-gray-300");
                return element;

            default:
                const cube = document.createElement('div');
                cube.className = `rounded-sm w-[75px] h-[75px] bg-[${this.color}]`;
                element.appendChild(cube);
                return element;
        }
    };


    public isBlank = () => {
        return this.type == CellTypeEnum.BLANK;
    }

    public isObstacle = () => this.type == CellTypeEnum.OBSTACLE;

    public makeItBlank = () => {
        this.color = CellColorEnum.BLANK;
        return this;
    }
}