import Grid from "../Models/Grid.ts";
import {Direction} from "../Types/Direction.ts";
import {MovementDirectionEnum} from "../Enums/MovementDirectionEnum.ts";
import {PriorityQueue} from "./PriorityQueue.ts";

export class Algorithm {
    public grid: Grid;
    public visitedCount = 0;
    public requiredTime: number = 0;

    constructor(grid: Grid) {
        this.grid = grid;
    }

    public dfs = (): Grid | null => {
        if (!this.grid.canMove()) {
            return null;
        }

        const visited = new Set<string>();
        let stack: Grid[] = [this.grid];

        let startTime = performance.now();
        while (stack.length > 0) {
            const currentGrid = stack.pop();
            if (!currentGrid) {
                continue;
            }

            if (currentGrid.hasWon()) {
                const endTime = performance.now();
                this.requiredTime = endTime - startTime;
                return currentGrid;
            }

            const serializedState = JSON.stringify(currentGrid.grid);
            if (visited.has(serializedState)) {
                continue;
            }

            visited.add(serializedState);
            this.visitedCount++;


            this.getNextStates(currentGrid).forEach((nextGrid) => {
                stack.push(nextGrid);
            });
        }
        return null;
    };

    public bfs = () => {
        const queue = [this.grid];
        const visited = new Set<string>();
        let startTime = performance.now();

        while (queue.length > 0) {
            const currentGrid = queue.shift();
            if (!currentGrid) {
                continue;
            }

            if (currentGrid.hasWon()) {
                const endTime = performance.now();
                this.requiredTime = endTime - startTime;
                return currentGrid;
            }

            const serializedState = JSON.stringify(currentGrid.grid);
            if (visited.has(serializedState)) {
                continue;
            }

            visited.add(serializedState);
            this.visitedCount++;

            this.getNextStates(currentGrid).forEach((nextGrid) => {
                queue.push(nextGrid);
            });
        }

        return null;
    }

    public ucs = (): Grid | null => {
        const queue = new PriorityQueue<{ grid: Grid; cost: number }>(
            (a, b) => a.cost - b.cost
        );
        const visited = new Set<string>();
        queue.enqueue({grid: this.grid, cost: 0});
        let startTime = performance.now();

        while (!queue.isEmpty()) {
            const {grid: currentGrid, cost: currentCost} = queue.dequeue()!;
            if (currentGrid.hasWon()) {
                const endTime = performance.now();
                this.requiredTime = endTime - startTime;
                return currentGrid;
            }

            const serializedState = JSON.stringify(currentGrid.grid);
            if (visited.has(serializedState)) {
                continue;
            }
            visited.add(serializedState);
            this.visitedCount++;

            this.getNextStates(currentGrid).forEach((nextGrid) => {
                const moveCost = 1;
                queue.enqueue({grid: nextGrid, cost: currentCost + moveCost});
            });
        }
        return null;
    };

    public recursiveDfs = (currentGrid: Grid, visited: Set<string>): Grid | null => {
        const serializedState = JSON.stringify(currentGrid.grid);
        if (visited.has(serializedState)) {
            return null;
        }

        visited.add(serializedState);

        if (currentGrid.hasWon()) {
            return currentGrid;
        }

        const nextStates = this.getNextStates(currentGrid);

        if (nextStates.length === 0) {
            return null;
        }

        for (const nextGrid of nextStates) {
            const result = this.recursiveDfs(nextGrid, visited);
            if (result) {
                return result;
            }
        }

        return null;
    };

    public startRecursiveDfs = (): Grid | null => {
        const visited = new Set<string>();
        let startTime = performance.now();

        const result = this.recursiveDfs(this.grid, visited);
        if (result) {
            const endTime = performance.now();
            this.requiredTime = endTime - startTime;
        }

        return result;
    };

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
}