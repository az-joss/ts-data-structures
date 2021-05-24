import {IStructure} from "./data-structure";

export class MaxBinaryHeap implements IStructure {
    constructor(
        private values: number[] = []
    ) {
        //
    }

    getRoot(): number | undefined {
        return this.values[0];
    }

    getLength(): number {
        return this.values.length;
    }

    private bubbleUp(): void {
        let getParentIndex = (index: number): number => {
            return Math.floor((index - 1) / 2);
        };
        let index = this.values.length - 1;
        let parentIndex: number = getParentIndex(index);

        while (index && this.values[index] > this.values[parentIndex]) {
            let tmp = this.values[parentIndex];

            this.values[parentIndex] = this.values[index];
            this.values[index] = tmp;

            index = parentIndex;
            parentIndex = getParentIndex(index);
        }
    }

    private bubbleDown(): void {
        const value = this.values[0];
        let index = 0;

        while(true) {
            let leftChildIndex = (2 * index) + 1,
                rightChildIndex = (2 * index) + 2,
                leftChildValue = this.values[leftChildIndex],
                rightChildValue = this.values[rightChildIndex],
                swapIndex = null,
                swapValue = null;

            if (leftChildValue && leftChildValue > value) {
                swapIndex = leftChildIndex;
            }
            if (rightChildValue
                && rightChildValue > Math.max(value, leftChildValue)
            ) {
                swapIndex = rightChildIndex;
            }

            if (!swapIndex) {
                break;
            }

            this.values[index] = this.values[swapIndex];
            this.values[swapIndex] = value;

            index = swapIndex;
        }
    }

    insert(val: number): void {
        this.values.push(val);

        if (this.values.length > 1) {
            this.bubbleUp();
        }
    }

    /**
     * Removes root of the heap (maximum value)
     */
    remove(): number | undefined {
        const max: number | undefined = this.values[0];
        // @ts-ignore
        const replacement: number = this.values.pop();

        if (this.values.length > 0) {
            this.values[0] = replacement;
            this.bubbleDown();
        }

        return max;
    }
}