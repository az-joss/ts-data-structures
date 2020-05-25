export interface IStructure {

}

export interface IListStructure extends IStructure {
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
    toArray(): Array<any>
}

export interface INode {
    getValue(): any,
    setValue(value:any): void
}

export interface ISinglyLinkedNode extends INode {
    getNext(): ISinglyLinkedNode|null,
    setNext(node:ISinglyLinkedNode|null): void
}

export interface IDoublyLinkedNode extends ISinglyLinkedNode {
    getPrev(): IDoublyLinkedNode|null,
    setPrev(node:IDoublyLinkedNode|null): void,
    getNext(): IDoublyLinkedNode|null,
    setNext(node:IDoublyLinkedNode|null): void
}

export interface IBTreeNode extends INode {
    getLeft(): IBTreeNode | null,
    setLeft(node: IBTreeNode | null): void,
    getRight(): IBTreeNode | null,
    setRight(node:IBTreeNode | null): void
}

export enum TreeTraversStrategy {
    BFS,
    DFS_PRE_ORDER,
    DFS_IN_ORDER,
    DFS_POST_ORDER,
}