import { IStructure, ISinglyLinkedNode } from './data-structure';

export interface IQueue {
    enqueue(value: any): number,
    dequeue(): ISinglyLinkedNode | undefined,
    getFirst(): ISinglyLinkedNode | null,
    getLast(): ISinglyLinkedNode | null,
    getSize(): number
}

export class QueueNode implements ISinglyLinkedNode {
    constructor(
        private value: any,
        private next: ISinglyLinkedNode | null = null
    ) {
        //
    }

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

export class Queue implements IQueue {
    private size: number = 0;
    private first: ISinglyLinkedNode | null = null;
    private last: ISinglyLinkedNode | null = null;

    constructor(array: Array<any> = []) {
        array.forEach(el => this.enqueue(el));
    }

    enqueue(value: any): number {
        let newNode = new QueueNode(value);

        if (!this.size) {
            this.first = newNode;
            this.last = newNode;
        } else {
            // @ts-ignore
            this.last.setNext(newNode);
            this.last = newNode;
        }

        return ++this.size;
    }

    dequeue(): ISinglyLinkedNode | undefined {
        if (!this.size) {
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

    getFirst(): ISinglyLinkedNode | null {
        return this.first;
    }

    getLast(): ISinglyLinkedNode | null {
        return this.last;
    }

    getSize(): number {
        return this.size;
    }
}