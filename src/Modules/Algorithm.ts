import Grid from "../Models/Grid.ts";
import {Direction} from "../Types/Direction.ts";
import {MovementDirectionEnum} from "../Enums/MovementDirectionEnum.ts";
import {PriorityQueue} from "./PriorityQueue.ts";
import TreeNode from "./TreeNode.ts";

export class Algorithm {
    public grid: Grid;
    public visitedCount = 0;
    public requiredTime: number = 0;
    public visitedNodes: Map<string, TreeNode> = new Map<string, TreeNode>();

    constructor(grid: Grid) {
        this.grid = grid;
    }

    public dfs = (): Grid | null => {
        if (!this.grid.canMove()) {
            return null;
        }

        let stack: TreeNode[] = [new TreeNode(this.grid, MovementDirectionEnum.NOTHING)];

        let startTime = performance.now();
        while (stack.length > 0) {
            const currentState = stack.pop();
            if (!currentState) {
                continue;
            }

            if (currentState.grid.hasWon()) {
                const endTime = performance.now();
                this.requiredTime = endTime - startTime;
                return currentState.grid;
            }

            const serializedState = JSON.stringify(currentState);
            if (this.visitedNodes.has(serializedState)) {
                continue;
            }

            this.visitedNodes.set(serializedState, currentState);
            this.visitedCount++;


            this.getNextStates(currentState.grid).forEach((nextGrid) => {
                stack.push(nextGrid);
            });
        }
        return null;
    };

    public bfs = (): Grid | null => {
        const queue: TreeNode[] = [new TreeNode(this.grid, MovementDirectionEnum.NOTHING)];
        let startTime = performance.now();

        while (queue.length > 0) {
            const currentState = queue.shift();
            if (!currentState) {
                continue;
            }

            if (currentState.grid.hasWon()) {
                const endTime = performance.now();
                this.requiredTime = endTime - startTime;
                return currentState.grid;
            }

            const serializedState = JSON.stringify(currentState);
            if (this.visitedNodes.has(serializedState)) {
                continue;
            }

            this.visitedNodes.set(serializedState, currentState);
            this.visitedCount++;

            this.getNextStates(currentState.grid).forEach((nextState) => {
                queue.push(nextState);
            });
        }

        return null;
    }

    public ucs = (): Grid | null => {
        const queue = new PriorityQueue<TreeNode>(
            (a, b) => a.heuristicCost() - b.heuristicCost()
        );
        queue.enqueue(new TreeNode(this.grid, MovementDirectionEnum.NOTHING));
        let startTime = performance.now();

        while (!queue.isEmpty()) {
            const currentState = queue.dequeue()!;
            if (currentState.grid.hasWon()) {
                const endTime = performance.now();
                this.requiredTime = endTime - startTime;
                return currentState.grid;
            }

            const serializedState = JSON.stringify(currentState);
            if (this.visitedNodes.has(serializedState)) {
                continue;
            }
            this.visitedNodes.set(serializedState, currentState);
            this.visitedCount++;

            this.getNextStates(currentState.grid).forEach((nextState) => {
                queue.enqueue(nextState);
            });
        }
        return null;
    };

    public recursiveDfs = (currentState: TreeNode): Grid | null => {
        const serializedState = JSON.stringify(currentState);
        if (this.visitedNodes.has(serializedState)) {
            return null;
        }

        this.visitedNodes.set(serializedState, currentState);

        if (currentState.grid.hasWon()) {
            return currentState.grid;
        }

        const nextStates = this.getNextStates(currentState.grid);

        if (nextStates.length === 0) {
            return null;
        }

        for (const nextGrid of nextStates) {
            const result = this.recursiveDfs(nextGrid);
            if (result) {
                return result;
            }
        }

        return null;
    };

    public startRecursiveDfs = (): Grid | null => {
        let startTime = performance.now();
        const result = this.recursiveDfs(new TreeNode(this.grid, MovementDirectionEnum.NOTHING));
        if (result) {
            const endTime = performance.now();
            this.requiredTime = endTime - startTime;
        }
        return result;
    };

    private getNextStates = (grid: Grid, except: Direction | undefined = undefined): TreeNode[] => {
        let states: TreeNode[] = [];

        if (!grid.canMove()) {
            return [];
        }

        MovementDirectionEnum.getAll(except).forEach(dir => {
            const tempGrid = grid.clone();
            states.push(new TreeNode(tempGrid.move(dir), dir));
        })

        return states;
    }
}