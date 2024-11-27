import Grid from "../Models/Grid.ts";
import {Direction} from "../Types/Direction.ts";
import {MovementDirectionEnum} from "../Enums/MovementDirectionEnum.ts";

export default class TreeNode {
    public grid: Grid;
    public direction: Direction
    public parent: TreeNode | undefined

    constructor(grid: Grid, direction: Direction, parent: TreeNode | undefined = undefined) {
        this.grid = grid;
        this.direction = direction;
        this.parent = parent;
    }

    public heuristicCost = (): number => {
        switch (this.direction) {
            case MovementDirectionEnum.UP:
                return 1;
            case MovementDirectionEnum.DOWN:
                return 2;
            case MovementDirectionEnum.LEFT:
                return 1.5;
            case MovementDirectionEnum.RIGHT:
                return 1.5;
            case MovementDirectionEnum.NOTHING:
                return 0;
            default:
                return 1;
        }
    };
}