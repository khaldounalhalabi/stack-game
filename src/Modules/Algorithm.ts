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
            (a, b) => a.cost() - b.cost()
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

    public hillClimbing = (): Grid | null => {
        let currentNode = new TreeNode(this.grid, MovementDirectionEnum.NOTHING);
        let startTime = performance.now();

        while (true) {
            if (currentNode.grid.hasWon()) {
                return currentNode.grid;
            }
            const currentHScore = currentNode.hScore();

            if (currentHScore === 0) {
                const endTime = performance.now();
                this.requiredTime = endTime - startTime;
                return currentNode.grid;
            }

            const serializedState = JSON.stringify(currentNode);
            if (this.visitedNodes.has(serializedState)) {
                return null;
            }

            this.visitedNodes.set(serializedState, currentNode);
            this.visitedCount++;

            const nextStates = this.getNextStates(currentNode.grid);
            if (nextStates.length === 0) {
                return null;
            }

            let bestNextState = nextStates[0];
            for (const nextState of nextStates) {
                if (nextState.hScore() < bestNextState.hScore()) {
                    bestNextState = nextState;
                }
            }

            if (bestNextState.hScore() >= currentHScore) {
                return null;
            }

            currentNode = bestNextState;
        }
    };

    public hillClimbingWithBacktracking = (): Grid | null => {
        let currentNode = new TreeNode(this.grid, MovementDirectionEnum.NOTHING);
        let startTime = performance.now();
        let stack: TreeNode[] = [currentNode];

        while (stack.length > 0) {
            currentNode = stack.pop()!;
            if (currentNode.grid.hasWon()) {
                const endTime = performance.now();
                this.requiredTime = endTime - startTime;
                return currentNode.grid;
            }
            const currentHScore = currentNode.hScore();

            if (currentHScore === 0) {
                const endTime = performance.now();
                this.requiredTime = endTime - startTime;
                return currentNode.grid;
            }

            const serializedState = JSON.stringify(currentNode);
            if (this.visitedNodes.has(serializedState)) {
                continue;
            }

            this.visitedNodes.set(serializedState, currentNode);
            this.visitedCount++;

            const nextStates = this.getNextStates(currentNode.grid);
            nextStates.sort((a, b) => a.hScore() - b.hScore());

            let improved = false;
            for (const nextState of nextStates) {
                if (nextState.hScore() < currentHScore) {
                    stack.push(nextState);
                    improved = true;
                    break;
                }
            }

            if (!improved) {
                for (const nextState of nextStates) {
                    stack.push(nextState);
                }
            }
        }
        return null;
    };

    public aStar = (): Grid | null => {
        const priorityQueue = new PriorityQueue<TreeNode>(
            (a, b) => (a.aScore) - (b.aScore)
        );
        const startNode = new TreeNode(this.grid, MovementDirectionEnum.NOTHING);
        priorityQueue.enqueue(startNode);

        let startTime = performance.now();

        while (!priorityQueue.isEmpty()) {
            const currentNode = priorityQueue.dequeue()!;
            if (currentNode.grid.hasWon()) {
                const endTime = performance.now();
                this.requiredTime = endTime - startTime;
                return currentNode.grid;
            }

            const serializedState = JSON.stringify(currentNode);
            if (this.visitedNodes.has(serializedState)) {
                continue;
            }

            this.visitedNodes.set(serializedState, currentNode);
            this.visitedCount++;

            const nextStates = this.getNextStates(currentNode.grid)
            nextStates.forEach((state) => {
                state.accumulative = currentNode.accumulative + state.cost();
            });

            for (const nextState of nextStates) {
                const tentativeGScore = currentNode.accumulative + currentNode.hScore();
                if (!this.visitedNodes.has(JSON.stringify(nextState))) {
                    nextState.aScore = tentativeGScore;
                    priorityQueue.enqueue(nextState);
                }
            }
        }
        return null;
    };

}