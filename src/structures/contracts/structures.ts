import {IArrayable} from "./commons";
import {ISinglyLinkedNode} from "./nodes";

export interface IStructure {}

export interface IList extends IStructure, IArrayable {
    getLength(): number,
    getHead(): object|null,
    getTail(): object|null,
    get(position:number): object|undefined,
    set(position:number, value:any): boolean,
    insert(position:number, value:any): boolean,
    remove(position:number): object|undefined,
    push(value:any): this,
    pop(): object|undefined,
    unshift(value:number): this,
    shift(): object|undefined,
    reverse(): void
}

export interface IStack extends IStructure {
    push(value: any): number,
    pop(): ISinglyLinkedNode | undefined
    getFirst(): ISinglyLinkedNode | null,
    getLast(): ISinglyLinkedNode | null,
    getSize(): number
}

export interface IQueue extends IStructure {
    enqueue(value: any): number,
    dequeue(): ISinglyLinkedNode | undefined,
    getFirst(): ISinglyLinkedNode | null,
    getLast(): ISinglyLinkedNode | null,
    getSize(): number
}

export interface IHeap extends IStructure, IArrayable {
    insert(value: any): void,
    extract(): any
}