import Grid from "../Models/Grid.ts";
import {Direction} from "../Types/Direction.ts";
import {MovementDirectionEnum} from "../Enums/MovementDirectionEnum.ts";
import {PriorityQueue} from "./PriorityQueue.ts";

export class Algorithm {
    public grid: Grid;

    constructor(grid: Grid) {
        this.grid = grid;
    }

    private getNextStates = (grid: Grid, except: Direction | undefined = undefined): Grid[] => {
        let states: Grid[] = [];

        if (!grid.canMove()) {
            return [];
        }

        MovementDirectionEnum.getAll(except).forEach(dir => {
            const tempGrid = grid.clone();
            states.push(tempGrid.move(dir));
        })

        return states;
    }

    public dfs = (): Grid | null => {
        if (!this.grid.canMove()) {
            return null;
        }

        const visited = new Set<string>();
        let stack: Grid[] = this.getNextStates(this.grid);

        while (stack.length > 0) {
            const currentGrid = stack.pop();
            if (!currentGrid) {
                continue;
            }

            const serializedState = JSON.stringify(currentGrid.grid);
            if (visited.has(serializedState)) {
                continue;
            }

            visited.add(serializedState);

            if (currentGrid.hasWon()) {
                return currentGrid;
            }

            this.getNextStates(currentGrid).forEach((nextGrid) => {
                stack.push(nextGrid);
            });
        }

        return null;
    };

    public bfs = () => {
        const queue = this.getNextStates(this.grid);
        const visited = new Set<string>();

        while (queue.length > 0) {
            const currentGrid = queue.shift();
            if (!currentGrid) {
                continue;
            }

            if (currentGrid.hasWon()) {
                return currentGrid;
            }

            const serializedState = JSON.stringify(currentGrid.grid);
            if (visited.has(serializedState)) {
                continue;
            }

            visited.add(serializedState);

            this.getNextStates(currentGrid).forEach((nextGrid) => {
                queue.push(nextGrid);
            });
        }
    }


    public ucs = (): Grid | null => {
        const queue = new PriorityQueue<{ grid: Grid; cost: number }>(
            (a, b) => a.cost - b.cost
        );
        const visited = new Set<string>();
        queue.enqueue({grid: this.grid, cost: 0});

        while (!queue.isEmpty()) {
            const {grid: currentGrid, cost: currentCost} = queue.dequeue()!;
            if (currentGrid.hasWon()) {
                return currentGrid;
            }

            const serializedState = JSON.stringify(currentGrid.grid);
            if (visited.has(serializedState)) {
                continue;
            }
            visited.add(serializedState);

            this.getNextStates(currentGrid).forEach((nextGrid) => {
                const moveCost = 1;
                queue.enqueue({grid: nextGrid, cost: currentCost + moveCost});
            });
        }

        return null;
    };
}