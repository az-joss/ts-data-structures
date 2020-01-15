import {assertEmptyList} from '../helpers';
import {DoublyLinkedList, DoublyLinkedListNode} from '../../src/structures/doubly-linked-list';

describe('Doubly linked list', () => {
    let instance: DoublyLinkedList;
    const input: Array<any> = [23, 62, 84];

    describe('push', () => {
        test('sets node to the head and the tail if list is empty', () => {
            instance = new DoublyLinkedList();

            assertEmptyList(instance);

            instance.push(input[0]);

            expect(instance.getLength()).toEqual(1);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[0]);
        });

        test('adds node to the tail if list is not empty', () => {
            instance = new DoublyLinkedList([input[0]]);

            expect(instance.getLength()).toEqual(1);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[0]);

            for (let i = 1; i < input.length; i++) {
                instance.push(input[i]);

                expect(instance.getLength()).toEqual(i + 1);
                expect(instance.getHead()?.getValue()).toEqual(input[0]);
                expect(instance.getTail()?.getValue()).toEqual(input[i]);
                expect(instance.getTail()?.getPrev()?.getNext()?.getValue()).toEqual(input[i]);
                expect(instance.getTail()?.getPrev()?.getValue()).toEqual(input[i - 1]);
            }
        });
    });

    describe('pop', () => {
        test('returns undefined if list is empty', () => {
            instance = new DoublyLinkedList();

            assertEmptyList(instance);

            let result = instance.pop();

            expect(result).toBeUndefined();
            assertEmptyList(instance);
        });

        test('returns node and reset head and tail of the list with 1 node', () => {
            instance = new DoublyLinkedList([input[0]]);

            expect(instance.getLength()).toEqual(1);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[0]);

            let result = instance.pop();

            expect(result).toBeInstanceOf(DoublyLinkedListNode);
            expect(result?.getValue()).toEqual(input[0]);
            expect(instance.getLength()).toEqual(0);
            expect(instance.getHead()).toBeNull();
            expect(instance.getTail()).toBeNull();
        });

        test('returns node from the tail and decrease the list', () => {
            instance = new DoublyLinkedList(input);

            expect(instance.getLength()).toEqual(input.length);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[2]);

            let maxI = input.length - 1;
            for (let i = 0; i <= maxI; i++) {
                let node = instance.pop();

                if (i < maxI) {
                    expect(instance.getTail()?.getValue()).toEqual(input[maxI - i - 1]);
                    expect(instance.getTail()?.getNext()).toBeNull();
                }

                expect(node?.getValue()).toEqual(input[maxI - i]);
                expect(instance.getLength()).toEqual(maxI - i);
            }
        });
    });

    describe('unshift', () => {
        test('sets node to the head and the tail if list is empty', () => {
            instance = new DoublyLinkedList();

            assertEmptyList(instance);

            instance.unshift(input[0]);

            expect(instance.getLength()).toEqual(1);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[0]);
        });

        test('adds node to the head if list is not empty', () => {
            instance = new DoublyLinkedList([input[0]]);

            for (let i = 1; i < input.length; i++) {
                instance.unshift(input[i]);

                expect(instance.getLength()).toEqual(i + 1);
                expect(instance.getHead()?.getValue()).toEqual(input[i]);
                expect(instance.getTail()?.getValue()).toEqual(input[0]);
                expect(instance.getHead()?.getNext()?.getPrev()?.getValue()).toEqual(input[i]);
                expect(instance.getHead()?.getNext()?.getValue()).toEqual(input[i - 1]);
            }
        });
    });

    describe('shift', () => {
        test('returns undefined if list empty', () => {
            instance = new DoublyLinkedList();

            assertEmptyList(instance);

            let result = instance.shift();

            expect(result).toBeUndefined();
            assertEmptyList(instance);
        });

        test('returns node and resets head and tail of the list with 1 node', () => {
            instance = new DoublyLinkedList([input[0]]);

            expect(instance.getLength()).toEqual(1);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[0]);

            let result = instance.shift();

            expect(result).toBeInstanceOf(DoublyLinkedListNode);
            expect(result?.getValue()).toEqual(input[0]);
            expect(instance.getLength()).toEqual(0);
            expect(instance.getHead()).toBeNull();
            expect(instance.getTail()).toBeNull();
        });

        test('returns node from the head and decrease the list', () => {
            instance = new DoublyLinkedList(input);

            expect(instance.getLength()).toEqual(input.length);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[2]);

            for (let i = 0; i < input.length; i++) {
                let node = instance.shift();

                if (i < input.length - 1) {
                    expect(instance.getHead()?.getValue()).toEqual(input[i + 1]);
                    expect(instance.getHead()?.getPrev()).toBeNull();
                }

                expect(node?.getValue()).toEqual(input[i]);
                expect(instance.getLength()).toEqual(input.length - i - 1);
            }
        });
    });

    describe('get', () => {
        test('returns undefined if list is empty', () => {
            instance = new DoublyLinkedList();

            assertEmptyList(instance);

            let result = instance.get(0);

            expect(result).toBeUndefined();
        });

        test('returns undefined if position is less than 0', () => {
            instance = new DoublyLinkedList(input);

            let result = instance.get(-1);

            expect(result).toBeUndefined();
        });

        test('returns undefined if position is greater than (list length - 1)', () => {
            instance = new DoublyLinkedList(input);

            let result = instance.get(input.length);

            expect(result).toBeUndefined();
        });

        test('returns node from specified position', () => {
            instance = new DoublyLinkedList(input);

            for (let i = 0; i < input.length; i++) {
                let result = instance.get(i);
                expect(result?.getValue()).toEqual(input[i]);
            }

            expect(instance.getLength()).toEqual(input.length);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[2]);
        });
    });

    describe('set', () => {
        test('returns false if position is less than 0', () => {
            instance = new DoublyLinkedList(input);

            let result = instance.set(-1, 99);

            expect(result).toBeFalsy();
        });

        test('returns false if position is greater than (list length - 1)', () => {
            instance = new DoublyLinkedList(input);

            let result = instance.set(input.length, 99);

            expect(result).toBeFalsy();
        });

        test('returns true and sets new value to the node in specified position', () => {
            instance = new DoublyLinkedList(input);

            let result = instance.set(1, 99);

            expect(result).toBeTruthy();
            expect(instance.get(1)?.getValue()).toEqual(99);
        });
    });

    describe('insert', () => {
        test('returns false if position less than 0', () => {
            instance = new DoublyLinkedList();

            assertEmptyList(instance);

            let result = instance.insert(-1, 99);

            expect(result).toBeFalsy();
        });

        test('returns false if position greater than list length', () => {
            instance = new DoublyLinkedList(input);

            let result = instance.insert(input.length + 1, 99);

            expect(result).toBeFalsy();
        });

        test('returns true and sets the head and the tail if list is empty', () => {
            instance = new DoublyLinkedList();

            let result = instance.insert(0, 99);

            expect(result).toBeTruthy();
            expect(instance.getHead()?.getValue()).toEqual(99);
            expect(instance.getTail()?.getValue()).toEqual(99);
        });

        test('returns true and adds node to the tail if list is not empty and position equal (list length - 1)', () => {
            instance = new DoublyLinkedList([input[0]]);

            let result = instance.insert(1, input[1]);

            expect(result).toBeTruthy();
            expect(instance.getLength()).toEqual(2);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[1]);
        });

        test('returns true and adds node to the list in specified position', () => {
            instance = new DoublyLinkedList(input);

            let result = instance.insert(1, 99);

            expect(result).toBeTruthy();
            expect(instance.getLength()).toEqual(input.length + 1);
            expect(instance.get(1)?.getValue()).toEqual(99);
            expect(instance.get(1)?.getNext()?.getValue()).toEqual(input[1]);
            expect(instance.get(1)?.getNext()?.getPrev()?.getValue()).toEqual(99);
            expect(instance.get(1)?.getPrev()?.getValue()).toEqual(input[0]);
            expect(instance.get(1)?.getPrev()?.getNext()?.getValue()).toEqual(99);
        });
    });

    describe('remove', () => {
        test('returns undefined if list is empty', () => {
            instance = new DoublyLinkedList();

            assertEmptyList(instance);

            let result = instance.remove(0);

            expect(result).toBeUndefined();
        });

        test('returns undefined if position less than 0', () => {
            instance = new DoublyLinkedList(input);

            let result = instance.remove(-1);

            expect(result).toBeUndefined();
        });

        test('returns undefined if position greater than (list length - 1)', () => {
            instance = new DoublyLinkedList(input);

            let result = instance.remove(input.length);

            expect(result).toBeUndefined();
        });

        test('returns head node if position equal 0', () => {
            instance = new DoublyLinkedList(input);

            let result = instance.remove(0);

            expect(result?.getValue()).toEqual(input[0]);
            expect(instance.getLength()).toEqual(input.length - 1);
            expect(instance.getHead()?.getValue()).toEqual(input[1]);
            expect(instance.getTail()?.getValue()).toEqual(input[2]);
        });

        test('returns tail node if position equal (list length - 1)', () => {
            instance = new DoublyLinkedList(input);

            let result = instance.remove(input.length - 1);

            expect(result?.getValue()).toEqual(input[2]);
            expect(instance.getLength()).toEqual(input.length - 1);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[1]);
        });

        test('returns node from specified position and removes it from list', () => {
            instance = new DoublyLinkedList(input);

            let result = instance.remove(1);

            expect(result).toBeInstanceOf(DoublyLinkedListNode);
            expect(result?.getValue()).toEqual(input[1]);
            expect(instance.getLength()).toEqual(input.length - 1);
            expect(instance.getTail()?.getPrev()?.getValue()).toEqual(input[0]);
            expect(instance.getHead()?.getNext()?.getValue()).toEqual(input[input.length - 1]);
        });
    });

    describe('reverse', () => {
        test('does nothing if list empty', () => {
            instance = new DoublyLinkedList();

            assertEmptyList(instance);

            instance.reverse();

            assertEmptyList(instance);
        });

        test('does nothing if list has only 1 item', () => {
            instance = new DoublyLinkedList([input[0]]);

            expect(instance.getLength()).toEqual(1);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[0]);

            instance.reverse();

            expect(instance.getLength()).toEqual(1);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[0]);
        });

        test('reverses order of list', () => {
            instance = new DoublyLinkedList(input);

            expect(instance.toArray()).toEqual(input);

            instance.reverse();

            expect(instance.toArray()).toEqual(input.reverse());
        });
    });
});