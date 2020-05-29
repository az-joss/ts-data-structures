import {IBTreeNode, IStructure, TreeTraversStrategy} from "./data-structure";

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

/**
 * Complexity (O)
 * | operation | time   | space |
 * --------------------------------
 * | insert    | log N  | 1     |
 * | find      | log N  | 1     |
 * | remove    | log N  | log N |
 * | travers   | log N  | 1     |
 */
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
                throw `Value ${value} is already existed in the tree`;
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

            // found the node for deletion
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

    // @TODO: move ot mixin (trait) with hint working, but how?
    travers(strategy: TreeTraversStrategy = TreeTraversStrategy.BFS) {
        let root = this.getRoot();

        if (!root) {
            return [];
        }

        switch (strategy) {
            case TreeTraversStrategy.BFS:
                return this.traversBFS(root);
            case TreeTraversStrategy.DFS_PRE_ORDER:
                return this.traversDFSPreOrder(root);
            case TreeTraversStrategy.DFS_IN_ORDER:
                return this.traversDFSInOrder(root);
            case TreeTraversStrategy.DFS_POST_ORDER:
                return this.traversDFSPostOrder(root);
        }

        throw 'Unknown travers strategy';
    }

    private traversBFS(rootNode: IBTreeNode): number[] {
        let pool = [rootNode];
        let result = [];

        while (pool.length > 0) {
            // @ts-ignore
            let node: IBTreeNode = pool.shift();
            // @ts-ignore
            let leftNode: IBTreeNode = node.getLeft();
            // @ts-ignore
            let rightNode: IBTreeNode = node.getRight();

            result.push(node.getValue());

            if (leftNode) {
                pool.push(leftNode);
            }
            if (rightNode) {
                pool.push(rightNode);
            }
        }

        return result;
    }

    private traversDFSPreOrder(rootNode: IBTreeNode, result: number[] = []): number[] {
        result.push(rootNode.getValue());

        // @ts-ignore
        let leftNode: IBTreeNode = rootNode.getLeft(),
            // @ts-ignore
            rightNode: IBTreeNode = rootNode.getRight();

        if (leftNode) {
            result = this.traversDFSPreOrder(leftNode, result);
        }
        if (rightNode) {
            result = this.traversDFSPreOrder(rightNode, result);
        }

        return result;
    }

    private traversDFSPostOrder(rootNode: IBTreeNode, result: number[] = []): number[] {
        // @ts-ignore
        let leftNode: IBTreeNode = rootNode.getLeft(),
            // @ts-ignore
            rightNode: IBTreeNode = rootNode.getRight();

        if (leftNode) {
            result = this.traversDFSPostOrder(leftNode, result);
        }
        if (rightNode) {
            result = this.traversDFSPostOrder(rightNode, result);
        }

        result.push(rootNode.getValue());

        return result;
    }

    private traversDFSInOrder(rootNode: IBTreeNode, result: number[] = []): number[] {
        // @ts-ignore
        let leftNode: IBTreeNode = rootNode.getLeft(),
            // @ts-ignore
            rightNode: IBTreeNode = rootNode.getRight();

        if (leftNode) {
            result = this.traversDFSInOrder(leftNode, result);
        }

        result.push(rootNode.getValue());

        if (rightNode) {
            result = this.traversDFSInOrder(rightNode, result);
        }

        return result;
    }
}