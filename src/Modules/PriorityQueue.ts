export class PriorityQueue<T> {
    private items: T[] = [];
    private comparator: (a: T, b: T) => number;

    constructor(comparator: (a: T, b: T) => number) {
        this.comparator = comparator;
    }

    enqueue(item: T) {
        this.items.push(item);
        this.items.sort(this.comparator); // Sort by priority
    }

    dequeue(): T | undefined {
        return this.items.shift(); // Remove the item with the highest priority
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}
