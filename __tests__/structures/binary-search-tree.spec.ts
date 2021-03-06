import {BinarySearchTree, BinarySearchTreeNode} from "../../src/structures/binary-search-tree";
import {TreeTraversStrategy} from "../../src/structures/enums";

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
            input.forEach(el => {
                instance.insert(el);
            });

            expect(() => { instance.insert(input[2]); })
                .toThrowError(`Value ${input[2]} is already existed in the tree`);
        });

        test('adds new node to the left branch if value less than root value', () => {
            let input = [13, 9, 7];
            [...input, 15].forEach(el => {
                instance.insert(el);
            });

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
            [...input, 7].forEach(el => {
                instance.insert(el);
            });

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
            [5, 8, 3, 7].forEach(el => {
                instance.insert(el);
            });

            let result = instance.find(12);

            expect(result).toBeUndefined();
        });

        test('returns node with searching value', () => {
            [5, 8, 3, 11, 9, 13].forEach(el => {
                instance.insert(el);
            });

            let result = instance.find(9);

            expect(result).toBeInstanceOf(BinarySearchTreeNode);
            expect(result?.getValue()).toEqual(9);
        });
    });

    describe('remove', () => {
        test('returns undefined if tree is empty', () => {
            let result = instance.remove(12);

            expect(result).toBeUndefined();
        });

        test('returns undefined if node is not found', () => {
            let input = [5, 7, 2, 3, 1, 6, 9];
            input.forEach(el => {
                instance.insert(el);
            });

            let result = instance.remove(12);

            expect(result).toBeUndefined();
            input.forEach(el => {
                expect(instance.find(el)?.getValue()).toEqual(el);
            });
        });

        test('removes and returns node if found node does not have children', () => {
            let input = [5, 7, 2, 3, 1, 6, 9];
            input.forEach(el => {
                instance.insert(el);
            });

            let deletedNode = instance.remove(6);

            expect(deletedNode?.getValue()).toEqual(6);
            expect(instance.find(6)).toBeUndefined();
        });

        test('removes and returns node if found node has 1 right child (right branch)', () => {
            let input = [5, 7, 2, 3, 1, 6, 9, 11];
            input.forEach(el => {
                instance.insert(el);
            });

            let deletedNode = instance.remove(9);

            expect(deletedNode?.getValue()).toEqual(9);
            expect(instance.find(9)).toBeUndefined();
            expect(instance.find(7)?.getLeft()?.getValue()).toEqual(6);
            expect(instance.find(7)?.getRight()?.getValue()).toEqual(11);
        });

        test('removes and returns node if found node has 1 left child (right branch)', () => {
            let input = [5, 7, 2, 3, 1, 6, 9, 8];
            input.forEach(el => {
                instance.insert(el);
            });

            let deletedNode = instance.remove(9);

            expect(deletedNode?.getValue()).toEqual(9);
            expect(instance.find(9)).toBeUndefined();
            expect(instance.find(7)?.getLeft()?.getValue()).toEqual(6);
            expect(instance.find(7)?.getRight()?.getValue()).toEqual(8);
        });

        test('removes and returns node if found node has 1 right child (left branch)', () => {
            let input = [5, 9, 2, 3, 1, 11, 6, 8];
            input.forEach(el => {
                instance.insert(el);
            });

            let deletedNode = instance.remove(6);

            expect(deletedNode?.getValue()).toEqual(6);
            expect(instance.find(6)).toBeUndefined();
            expect(instance.find(9)?.getLeft()?.getValue()).toEqual(8);
            expect(instance.find(9)?.getRight()?.getValue()).toEqual(11);
        });

        test('removes and returns node if found node has 1 left child (left branch)', () => {
            let input = [5, 7, 2, 3, 1, 8, 9, 6];
            input.forEach(el => {
                instance.insert(el);
            });

            let deletedNode = instance.remove(8);

            expect(deletedNode?.getValue()).toEqual(8);
            expect(instance.find(8)).toBeUndefined();
            expect(instance.find(7)?.getLeft()?.getValue()).toEqual(6);
            expect(instance.find(7)?.getRight()?.getValue()).toEqual(9);
        });

        test('removes node with 2 children', () => {
            [20, 10, 7, 30, 25, 29, 24, 27, 9].forEach(el => {
                instance.insert(el);
            });

            let deletedNode = instance.remove(25);

            expect(deletedNode?.getValue()).toEqual(25);
            expect(instance.find(25)).toBeUndefined();
            expect(instance.find(30)?.getLeft()?.getValue()).toEqual(27);
            expect(instance.find(27)?.getLeft()?.getValue()).toEqual(24);
            expect(instance.find(27)?.getRight()?.getValue()).toEqual(29);
            expect(instance.find(29)?.getLeft()).toBeNull();
            expect(instance.find(29)?.getRight()).toBeNull();

        });
    });

    describe('travers', () => {
        test('return empty array if tree is empty', () => {
            expect(instance.travers()).toEqual([]);
        });

        test('return array with values by BFS strategy by default', () => {
            [20, 10, 7, 30, 25, 29, 24, 27, 9].forEach(el => {
                instance.insert(el);
            });

            let result = instance.travers();

            expect(result).toEqual([20, 10, 30, 7, 25, 9, 24, 29, 27]);
        });

        test('return array with values by DFS pre order strategy', () => {
            [20, 10, 7, 30, 25, 29, 24, 27, 9].forEach(el => {
                instance.insert(el);
            });

            let result = instance.travers(TreeTraversStrategy.DFS_PRE_ORDER);

            expect(result).toEqual([20, 10, 7, 9, 30, 25, 24, 29, 27]);
        });

        test('return array with values by DFS in order strategy', () => {
            [20, 10, 7, 30, 25, 29, 24, 27, 9].forEach(el => {
                instance.insert(el);
            });

            let result = instance.travers(TreeTraversStrategy.DFS_IN_ORDER);

            expect(result).toEqual([7, 9, 10, 20, 24, 25, 27, 29, 30]);
        });

        test('return array with values by DFS post order strategy', () => {
            [20, 10, 7, 30, 25, 29, 24, 27, 9].forEach(el => {
                instance.insert(el);
            });

            let result = instance.travers(TreeTraversStrategy.DFS_POST_ORDER);

            expect(result).toEqual([9, 7, 10, 24, 27, 29, 25, 30, 20]);
        });

        test('throws exception if strategy is unknown', () => {
            [20, 10, 7, 30, 25, 29, 24, 27, 9].forEach(el => {
                instance.insert(el);
            });

            expect(() => { instance.travers(10); })
                .toThrowError('Unknown travers strategy');
        });

        test('breadth first', () => {
            [50, 39, 87, 45, 25, 61, 33, 41, 113, 75]
                .forEach((val) => {
                    // @ts-ignore
                    instance.insert(val);
                });

            let result: number[] = [];

            // @ts-ignore
            instance.travers();

            expect(result).toEqual([50, 39, 87, 25, 45, 61, 113, 33, 41, 75]);
        });

        test('depth first: pre-order', () => {
            [50, 39, 87, 45, 25, 61, 33, 41, 113, 75]
                .forEach((val) => {
                    // @ts-ignore
                    instance.insert(val);
                });

            let result: number[] = [];

            instance.travers(
                TreeTraversStrategy.DFS_PRE_ORDER
            );

            expect(result).toEqual([50, 39, 25, 33, 45, 41, 87, 61, 75, 113]);
        });

        test('depth first: post-order', () => {
            [50, 39, 87, 45, 25, 61, 33, 41, 113, 75]
                .forEach((val) => {
                    // @ts-ignore
                    instance.insert(val);
                });

            let result: number[] = [];

            instance.travers(
                TreeTraversStrategy.DFS_POST_ORDER
            );

            expect(result).toEqual([33, 25, 41, 45, 39, 75, 61, 113, 87, 50]);
        });

        test('depth first: in-order', () => {
            let input: number[] = [50, 39, 87, 45, 125, 61, 33, 41, 113, 75];

            input.forEach((val) => {
                // @ts-ignore
                instance.insert(val);
            });

            let result: number[] = [];

            instance.travers(
               TreeTraversStrategy.DFS_IN_ORDER
            );

            expect(result).toEqual(input.sort((a, b) => a < b ? -1 : 1));
        });
    });

});