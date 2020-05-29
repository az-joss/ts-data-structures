import {INode} from "./data-structure";


export class BinaryHeapNode implements INode {
    constructor(
        private value: any
    ) {

    }

    getValue(): any {
        return this.value;
    }

    setValue(value: any): void {
        this.value = value;
    }
}

/**
 * Complexity (O)
 * | operation | time  | space |
 * --------------------------------
 * | insert    | log N | 1     |
 * | extract   | lon N | 1     |
 */
export class MaxBinaryHeap {

    private pool: INode[] = [];

    constructor(

    ) {
        //
    }

    private bubbleUp() {
        if (this.pool.length < 2) {
            return;
        }

        let currentNodeIndex = this.pool.length - 1;

        while (currentNodeIndex) {
            let parentNodeIndex = Math.floor((currentNodeIndex - 1) / 2),
                currentNode = this.pool[currentNodeIndex],
                parentNode = this.pool[parentNodeIndex],
                currentNodeValue = currentNode.getValue(),
                parentNodeValue = parentNode.getValue();

            if (parentNodeValue > currentNodeValue) {
                break;
            }

            currentNode.setValue(parentNodeValue);
            parentNode.setValue(currentNodeValue);

            currentNodeIndex = parentNodeIndex;
        }
    }

    private sinkDown() {
        if (this.pool.length < 2) {
            return;
        }

        let currentIndex = 0,
            swap;
        const currentValue = this.pool[currentIndex].getValue();

        while (true) {
            let leftChildIndex = 2 * currentIndex + 1,
                rightChildIndex = 2 * currentIndex + 2,
                leftChildValue = this.pool[leftChildIndex]?.getValue(),
                rightChildValue = this.pool[rightChildIndex]?.getValue();

            if (leftChildValue && leftChildValue > currentValue) {
                swap = {index: leftChildIndex, value: leftChildValue};
            }

            if (rightChildValue && rightChildValue > leftChildValue) {
                swap = {index: rightChildIndex, value: rightChildValue};
            }

            if (!swap) {
                break;
            }

            this.pool[currentIndex].setValue(swap.value);
            this.pool[swap.index].setValue(currentValue);

            currentIndex = swap.index;

            swap = null;
        }
    }

    insert(value: any) {
        this.pool.push(new BinaryHeapNode(value));

        this.bubbleUp();
    }

    insertMany(list: any[]) {
        list.forEach((num) => {
            this.insert(num);
        });
    }

    extractMax() {
        if (!this.pool.length) {
            return null;
        }

        const firstValue = this.pool[0].getValue();

        if (this.pool.length == 1) {
            this.pool = [];

            return firstValue;
        }

        // set 1st value to last one
        // @ts-ignore
        this.pool[0].setValue(this.pool.pop().getValue());

        this.sinkDown();

        return firstValue;
    }

    toArray(): Array<any> {
        return this.pool.map((node: INode) => {
            return node.getValue();
        });
    }
}