import {IBTreeNode, IStructure} from "./data-structure";

//type TraversStrategy = 'bsf' | 'dsf';

export enum TraversStrategy {
    BSF,
    DSF
};

export enum TraversOrder {
    PreOrder,
    PostOrder,
    InOrder
};

type TraversOptions = {
    strategy?: TraversStrategy,
    order?: TraversOrder
};


export class BinarySearchTreeNode implements IBTreeNode {
    constructor(
        private value: number,
        private left: IBTreeNode | null = null,
        private right: IBTreeNode | null = null
    ) {
    }

    getValue(): number {
        return this.value
    }

    setValue(value: number): void {
        this.value = value;
    }

    getLeft(): IBTreeNode | null {
        return this.left;
    }

    setLeft(node: IBTreeNode | null): void {
        this.left = node;
    }

    getRight(): IBTreeNode | null {
        return this.right;
    }

    setRight(node: IBTreeNode | null): void {
        this.right = node
    }
}

export class BinarySearchTree implements IStructure {
    constructor(
        private root: IBTreeNode | null = null
    ) {
    }

    getRoot(): IBTreeNode | null {
        return this.root;
    }

    insert(value: number): void {
        let newNode = new BinarySearchTreeNode(value);

        if (!this.root) {
            this.root = newNode;

            return;
        }

        let currentNode: IBTreeNode | null = this.root;

        while (currentNode) {
            if (value === currentNode.getValue()) {
                throw `Value ${value} is already exists in the tree`;
            }

            if (value > currentNode.getValue()) {
                if (!currentNode.getRight()) {
                    currentNode.setRight(newNode);

                    return;
                }
                currentNode = currentNode.getRight();
            } else {
                if (!currentNode.getLeft()) {
                    currentNode.setLeft(newNode);

                    return;
                }
                currentNode = currentNode.getLeft();
            }
        }
    }

    find(value: number): IBTreeNode | undefined {
        let currentNode = this.root;

        while (currentNode) {
            let currentValue = currentNode.getValue();

            if (value === currentValue) {
                return currentNode;
            }

            // @ts-ignore
            currentNode = value > currentValue
                ? currentNode.getRight()
                : currentNode.getLeft();
        }

        return undefined;
    }

    remove(value: number): IBTreeNode | undefined {
        // @ts-ignore
        return this.removeInternal(this.root, value);
    }

    private removeInternal(root: IBTreeNode, value: number) {
        let currentNode = root;
        let parentNode = null;

        while (currentNode) {
            let currentValue = currentNode.getValue();
            let parentValue = parentNode?.getValue();

            // found the node for deletetion
            if (value === currentValue) {
                let isLeft = value < parentValue;

                // case when both children are present
                if (currentNode.getLeft() && currentNode.getRight()) {
                    // @ts-ignore
                    let {minNode, minParentNode} = this.findMinInRightBranch(currentNode);

                    this.removeInternal(minParentNode, minNode.getValue());
                    currentNode.setValue(minNode.getValue());
                    currentNode = new BinarySearchTreeNode(value);
                } // case 1 child presents from the left
                else if (currentNode.getLeft()) {
                    this.setParentChild(parentNode, currentNode.getLeft(), isLeft);
                } // case 1 child presents from the right
                else if (currentNode.getRight()) {
                    this.setParentChild(parentNode, currentNode.getRight(), isLeft);
                } // case no children
                else {
                    this.setParentChild(parentNode, null, isLeft);
                }

                return currentNode;
            }

            parentNode = currentNode;
            // @ts-ignore
            currentNode = value > currentValue
                ? currentNode.getRight()
                : currentNode.getLeft();
        }

        return undefined;
    }

    private setParentChild(parentNode: IBTreeNode | null, childNode: IBTreeNode | null, isLeft: boolean = false) {
        if (!parentNode) {
            this.root = childNode;

            return;
        }

        isLeft
            ? parentNode.setLeft(childNode)
            : parentNode.setRight(childNode);
    }

    /**
     * Find node with minimal value in right subtree
     *
     * @param {IBTreeNode} node
     *
     * @return {Object} nodeSet
     *         {IBTreeNode} nodeSet.minNode
     *         {IBTreeNode} nodeSet.minParentNode
     */
    private findMinInRightBranch(node: IBTreeNode): {minNode: IBTreeNode, minParentNode: IBTreeNode} {
        let minParentNode = node;
        let minNode = node.getRight();

        // @ts-ignore
        while (minNode.getLeft()) {
            // @ts-ignore
            minParentNode = minNode;
            // @ts-ignore
            minNode = minNode.getLeft();
        }

        // @ts-ignore
        return {minNode, minParentNode};
    }

    travers(
        cbl: ((value: number) => void) | null = null,
        options: TraversOptions = {}
    ) {
        if (!this.root) {
            return;
        }

        let defaultOptions = {
            strategy: TraversStrategy.BSF,
            order: TraversOrder.PreOrder
        };

        options = {...defaultOptions, ...options}

        switch (options.strategy) {
            case TraversStrategy.BSF:
                this.breadthFirstSearch(cbl);
                break;
            case TraversStrategy.DSF:
                this.depthFirstSearch(cbl, options.order);
                break;
        }
    }

    private breadthFirstSearch(
        cbl: ((value: number) => void) | null = null
    ) {
        let queue: IBTreeNode[] = [];
        // @ts-ignore
        queue.push(this.root);

        while (queue.length > 0) {
            // @ts-ignore
            let currentNode: IBTreeNode = queue.shift();

            if (cbl) {
                cbl(currentNode.getValue());
            }
            let child: IBTreeNode | null;
            if (child = currentNode.getLeft()) {
                queue.push(child);
            }
            if (child = currentNode.getRight()) {
                queue.push(child);
            }
        }
    }

    private depthFirstSearch(
        cbl: ((value: number) => void) | null = null,
        order: TraversOrder = TraversOrder.PreOrder
    ): void {
        let recursion = (node: IBTreeNode) => {
            if (cbl && order === TraversOrder.PreOrder) {
                cbl(node.getValue());
            }

            let child: IBTreeNode | null;
            if (child = node.getLeft()) {
                recursion(child);
            }

            if (cbl && order === TraversOrder.InOrder) {
                cbl(node.getValue());
            }

            if (child = node.getRight()) {
                recursion(child);
            }

            if (cbl && order === TraversOrder.PostOrder) {
                cbl(node.getValue());
            }
        };

        // @ts-ignore
        recursion(this.root);
    }
}