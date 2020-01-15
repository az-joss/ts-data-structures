import { IListStructure, ISinglyLinkedNode } from './data-structure';

export class SinglyLinkedListNode implements ISinglyLinkedNode {
    constructor(
        private value:any,
        private next:ISinglyLinkedNode|null = null
    ) {
        //
    }

    getValue() {
        return this.value;
    }

    setValue(value:any) {
        this.value = value;
    }

    getNext():any {
        return this.next;
    }

    setNext(node:any) {
        this.next = node;
    }
}

export class SinglyLinkedList implements IListStructure
{
    private length:number = 0;
    private head:SinglyLinkedListNode|null = null;
    private tail:SinglyLinkedListNode|null = null;

    constructor(arr: Array<any> = []) {
        arr.forEach(el => this.push(el));
    }

    getHead() {
        return this.head;
    }

    getTail() {
        return this.tail;
    }

    getLength() {
        return this.length;
    }

    /**
     * Gets node's value in specified position,
     * otherwise returns undefined. Position numbering
     * starts from 0.
     *
     * @param position:number
     *
     * @return SinglyLinkedListNode|undefined
     */
    get(position: number): SinglyLinkedListNode | undefined {
        if (position < 0 || position >= this.length) {
            return undefined;
        }

        let counter = 0;
        let current = this.head;

        while (counter !== position) {
            // @ts-ignore
            current = current.getNext();
            counter++;
        }

        // @ts-ignore
        return current;
    }

    /**
     * Sets value to the node in specified position.
     * If node is not found then returns undefined.
     *
     * @param position:number
     * @param value:any
     *
     * @return boolean
     */
    set(position: number, value: any): boolean {
        let node = this.get(position);

        if (node) {
            node.setValue(value);

            return true;
        }

        return false;
    }

    /**
     * Inserts node with specified value to specified position in the list.
     *
     * @param position:number
     * @param value:any
     *
     * @return boolean
     */
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

        let newNode = new SinglyLinkedListNode(value);
        let prevNode = this.get(position - 1);
        // @ts-ignore
        newNode.setNext(prevNode.getNext());
        // @ts-ignore
        prevNode.setNext(newNode);
        this.length++;

        return true;
    }

    /**
     * Removes node in specified position from the list.
     *
     * @param position:number
     *
     * @return SinglyLinkedListNode|undefined
     */
    remove(position: number): SinglyLinkedListNode|undefined {
        if (position < 0 || position >= this.length) {
            return undefined;
        }

        if (position === 0) {
            return this.shift();
        }

        if (position === this.length - 1) {
            return this.pop();
        }

        let prevNode = this.get(position - 1);
        // @ts-ignore
        let removedNode = prevNode.getNext();

        // @ts-ignore
        prevNode.setNext(removedNode.getNext());
        this.length--;

        return removedNode;

    }

    /**
     * Removes node from the tail of list and returns its value,
     * otherwise returns undefined.
     *
     * @return SinglyLinkedListNode|undefined
     */
    pop(): any {
        if (!this.head) {
            return undefined;
        }

        let current = this.head;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            let prev = null;
            while (current.getNext()) {
                prev = current;
                current = current.getNext();
            }
            // @ts-ignore
            prev.setNext(null);
            this.tail = prev;
        }

        this.length--;

        return current;
    }

    /**
     * Adds node with value to the tail of list
     *
     * @param value:any
     *
     * @return this
     */
    push(value: any): this {
        let newNode = new SinglyLinkedListNode(value);

        if (!this.length) {
            this.head = newNode;
        } else {
            // @ts-ignore
            this.tail.setNext(newNode);
        }

        this.tail = newNode;
        this.length++;

        return this;
    }

    /**
     * Removes node from the head of list and returns its value,
     * otherwise returns undefined
     *
     * @return SinglyLinkedListNode|undefined
     */
    shift(): any|undefined {
        if (!this.length) {
            return undefined;
        }

        let current = this.head;

        // @ts-ignore
        this.head = current.getNext();
        this.length--;

        if (this.length === 0) {
            this.tail = null;
        }

        return current;
    }

    /**
     * Adds node with value to the head of the list.
     *
     * @param value
     *
     * @return this
     */
    unshift(value: any) {
        let newNode = new SinglyLinkedListNode(value);

        if (!this.length) {
            this.tail = newNode;
        } else {
            newNode.setNext(this.head);
        }

        this.head = newNode;
        this.length++;

        return this;
    }

    /**
     * Reverses order of nodes in the list.
     */
    reverse() {
        if (this.length <= 1) {
            return;
        }

        let current = this.head;
        let next = this.head;
        this.head = this.tail;
        this.tail = current;

        let prev = null;
        let counter = 0;

        while (counter < this.length) {
            // @ts-ignore
            next = current.getNext();
            // @ts-ignore
            current.setNext(prev);
            prev = current;
            current = next;
            counter++;
        }
    }

    /**
     * Returns array with elements from the list
     */
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