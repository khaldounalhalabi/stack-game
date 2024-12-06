import Grid from "../Models/Grid.ts";
import {Direction} from "../Types/Direction.ts";
import {MovementDirectionEnum} from "../Enums/MovementDirectionEnum.ts";

export default class TreeNode {
    public grid: Grid;
    public direction: Direction
    public parent: TreeNode | undefined
    public aScore: number = 0
    public accumulative = 0;

    constructor(grid: Grid, direction: Direction, parent: TreeNode | undefined = undefined) {
        this.grid = grid;
        this.direction = direction;
        this.parent = parent;
    }

    public cost = (): number => {
        switch (this.direction) {
            case MovementDirectionEnum.UP:
                return 1;
            case MovementDirectionEnum.DOWN:
                return 2;
            case MovementDirectionEnum.LEFT:
                return 3;
            case MovementDirectionEnum.RIGHT:
                return 4;
            case MovementDirectionEnum.NOTHING:
                return 0;
            default:
                return 1;
        }
    };

    public hScore = (): number => {
        let count = 0;
        Object.values(this.grid.existedColors).forEach(value => {
            count += value;
        })
        return count;
    }
}