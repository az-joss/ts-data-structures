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