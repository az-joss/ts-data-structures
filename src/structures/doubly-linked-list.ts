import { IDoublyLinkedNode, IListStructure } from "./data-structure";

export class DoublyLinkedListNode implements IDoublyLinkedNode {
    constructor(
        private value:any,
        private prev:IDoublyLinkedNode|null = null,
        private next:IDoublyLinkedNode|null = null
    ) {
        //
    }

    getValue() {
        return this.value;
    }

    setValue(value:any) {
        this.value = value;
    }

    getPrev(): IDoublyLinkedNode | null {
        return this.prev;
    }

    setPrev(node: IDoublyLinkedNode | null): void {
        this.prev = node;
    }

    getNext(): IDoublyLinkedNode | null {
        return this.next;
    }

    setNext(node: IDoublyLinkedNode | null) {
        this.next = node;
    }
}

export class DoublyLinkedList implements IListStructure {
    private length:number = 0;
    private head:IDoublyLinkedNode|null = null;
    private tail:IDoublyLinkedNode|null = null;

    constructor(values: Array<any> = []) {
        values.forEach(value => this.push(value));
    }

    getLength(): number {
        return this.length;
    }

    getHead(): IDoublyLinkedNode | null {
        return this.head;
    }

    getTail(): IDoublyLinkedNode | null {
        return this.tail;
    }

    get(position: number): IDoublyLinkedNode | undefined {
        if (position < 0 || position >= this.length) {
            return undefined;
        }

        let current,
            count,
            increment,
            method;

        if (position < this.length / 2) {
            current = this.head;
            count = 0;
            increment = 1;
            method = 'getNext';
        } else {
            current = this.tail;
            count = this.length - 1;
            increment = -1;
            method = 'getPrev';
        }

        while (position !== count) {
            current = (current as any)[method]();
            count += increment;
        }

        return current;
    }

    set(position: number, value: any): boolean {
        let node = this.get(position);

        if (!node) {
            return false;
        }

        node.setValue(value);

        return true;
    }

    push(value: any): this {
        let node = new DoublyLinkedListNode(value);

        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            node.setPrev(this.tail);
            // @ts-ignore
            this.tail.setNext(node);
            this.tail = node;
        }

        this.length++;

        return this;
    }

    pop(): DoublyLinkedListNode | undefined {
        if (!this.length) {
            return undefined;
        }

        let node = this.tail;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        }  else {
            // @ts-ignore
            this.tail = node.getPrev();
            // @ts-ignore
            this.tail.setNext(null);
        }

        this.length--;

        // @ts-ignore
        return node;
    }

    unshift(value: number): this {
        let node = new DoublyLinkedListNode(value);

        if (!this.length) {
            this.head = node;
            this.tail = node;
        } else {
            node.setNext(this.head);
            // @ts-ignore
            this.head.setPrev(node);
            this.head = node;
        }

        this.length++;

        return this;
    }

    shift(): IDoublyLinkedNode | undefined {
        if (!this.length) {
            return undefined;
        }

        let node = this.head;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            // @ts-ignore
            let newHeadNode = node.getNext();
            // @ts-ignore
            newHeadNode.setPrev(null);
            // @ts-ignore
            this.head = newHeadNode;
        }

        this.length--;

        // @ts-ignore
        return node;
    }

    insert(position: number, value: any): boolean {
        if (position < 0 || position > this.length) {
            return false;
        }

        if (position === 0) {
            return !!this.unshift(value);
        }

        if (position === this.length) {
            return !!this.push(value);
        }

        let newNode = new DoublyLinkedListNode(value);
        let currentNode = this.get(position);

        // @ts-ignore
        newNode.setPrev(currentNode.getPrev());
        // @ts-ignore
        newNode.setNext(currentNode);
        // @ts-ignore
        currentNode.getPrev().setNext(newNode);
        // @ts-ignore
        currentNode.setPrev(newNode);

        this.length ++;

        return true;
    }

    remove(position: number): IDoublyLinkedNode | undefined {
        if (position < 0 || position >= this.length) {
            return undefined;
        }

        if (position === 0) {
            return this.shift();
        }

        if (position === this.length - 1) {
            return this.pop();
        }

        let node = this.get(position);
        // @ts-ignore
        let prev = node.getPrev();
        // @ts-ignore
        let next = node.getNext();
        // @ts-ignore
        prev.setNext(next);
        // @ts-ignore
        next.setPrev(prev);
        this.length--;

        return node;
    }

    reverse(): void {
        if (this.length <= 1) {
            return;
        }

        let current = this.tail,
            prev,
            next;

        this.tail = this.head;
        this.head = current;

        while (current) {
            // @ts-ignore
            prev = current.getPrev();
            next = current.getNext();

            current.setPrev(next || null);
            current.setNext(prev || null);

            // @ts-ignore
            current = prev;
        }
    }

    toArray(): Array<any> {
        let result: Array<any> = [];

        let current = this.head;

        while (current) {
            result.push(current.getValue());
            current = current.getNext();
        }

        return result;
    }
}