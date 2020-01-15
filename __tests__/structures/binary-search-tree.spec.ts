import {BinarySearchTree, BinarySearchTreeNode} from "../../src/structures/binary-search-tree";

describe('Binary search tree', () => {
    let instance: BinarySearchTree;

    beforeEach(() => {
        instance = new BinarySearchTree();
    });

    describe('insert', () => {
        test('creates new root if tree is empty', () => {
            expect(instance.getRoot()).toBeNull();
            instance.insert(13);
            expect(instance.getRoot()?.getValue()).toEqual(13);
        });

        test('throws error if value exist in tree', () => {
            let input = [13, 9, 7];
            instance.insert(input[0]);
            instance.insert(input[1]);
            instance.insert(input[2]);

            expect(() => { instance.insert(input[2]); }).toThrowError(`Value ${input[2]} is already exists in the tree`);
        });

        test('adds new node to the left branch if value less than root value', () => {
            let input = [13, 9, 7];
            instance.insert(input[0]);
            instance.insert(input[1]);
            instance.insert(15);
            instance.insert(input[2]);

            // expect next tree
            //        13
            //      9    15
            //    7
            let values = [];

            let node = instance.getRoot();
            while (node) {
                values.push(node.getValue());
                node = node.getLeft();
            }

            expect(values).toEqual(input);
        });

        test('adds new node to the right branch if value more than root value', () => {
            let input = [11, 13, 17];
            instance.insert(input[0]);
            instance.insert(input[1]);
            instance.insert(7);
            instance.insert(input[2]);

            // expect next tree
            //        11
            //      7    13
            //              17
            let values = [];

            let node = instance.getRoot();
            while (node) {
                values.push(node.getValue());
                node = node.getRight();
            }

            expect(values).toEqual(input);
        });
    });


    describe('find', () => {
        test('returns undefined if tree is empty', () => {
            let result = instance.find(12);

            expect(result).toBeUndefined();
        });

        test('returns undefined if node is not found', () => {
            instance.insert(5);
            instance.insert(8);
            instance.insert(3);
            instance.insert(7);

            let result = instance.find(12);

            expect(result).toBeUndefined();
        });

        test('returns node with searching value', () => {
            instance.insert(5);
            instance.insert(8);
            instance.insert(3);
            instance.insert(11);
            instance.insert(9);
            instance.insert(13);

            let result = instance.find(9);

            expect(result).toBeInstanceOf(BinarySearchTreeNode);
            expect(result?.getValue()).toEqual(9);
        });
    });
});