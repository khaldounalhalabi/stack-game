import {Direction} from "../Types/Direction.ts";

export class MovementDirectionEnum {
    public static UP: Direction = {rowDelta: -1, colDelta: 0};
    public static DOWN: Direction = {rowDelta: 1, colDelta: 0};
    public static LEFT: Direction = {rowDelta: 0, colDelta: -1};
    public static RIGHT: Direction = {rowDelta: 0, colDelta: 1};
    public static NOTHING: Direction = {rowDelta: -1, colDelta: -1};

    public static getAll(except: Direction | undefined = undefined) {
        return [
            this.UP,
            this.DOWN,
            this.LEFT,
            this.RIGHT
        ].filter(value => !except
            ? true
            : (except.colDelta == value.colDelta && except.rowDelta == value.rowDelta)
        );
    }
}
