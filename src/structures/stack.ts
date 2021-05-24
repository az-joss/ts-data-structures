import {IStack} from './contracts/structures';
import {ISinglyLinkedNode} from './contracts/nodes';

export class StackNode implements ISinglyLinkedNode {
    constructor(
        private value: any,
        private next: ISinglyLinkedNode | null = null
    ) {}

    getValue(): any {
        return this.value;
    }

    setValue(value: any): void {
        this.value = value;
    }

    getNext(): ISinglyLinkedNode | null {
        return this.next;
    }

    setNext(node: ISinglyLinkedNode | null): void {
        this.next = node;
    }
}

/**
 *
 */
export class Stack implements IStack {
    private size: number = 0;
    private first: ISinglyLinkedNode | null = null;
    private last: ISinglyLinkedNode | null = null;

    constructor(
        array: Array<any> = []
    ) {
        array.forEach(el => this.push(el));
    }

    push(value: any): number {
        let newNode = new StackNode(value);

        if (this.size === 0) {
            this.first = newNode;
            this.last = newNode;
        } else {
            newNode.setNext(this.first);
            this.first = newNode;
        }

        return ++this.size;
    }

    pop(): ISinglyLinkedNode | undefined {
        if (this.size === 0) {
            return undefined;
        }

        let node = this.first;

        // @ts-ignore
        this.first = node.getNext();
        if (this.size === 1) {
            this.last = null;
        }
        this.size--;

        // @ts-ignore
        return node;
    }

    getSize() {
        return this.size
    }

    getFirst(): ISinglyLinkedNode | null {
        return this.first;
    }

    getLast(): ISinglyLinkedNode | null {
        return this.last;
    }
}