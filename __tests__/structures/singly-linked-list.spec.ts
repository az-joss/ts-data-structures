import {assertEmptyList} from '../helpers';
import {SinglyLinkedList, SinglyLinkedListNode} from "../../src/structures/singly-linked-list";

describe('Singly list data structure', () => {
    let input: Array<any> = [12, 52, 57];
    let instance: SinglyLinkedList;

    describe('push', () => {
        test('sets node to the head and the tail if list empty', () => {
            instance = new SinglyLinkedList();

            assertEmptyList(instance);

            instance.push(input[0]);

            expect(instance.getLength()).toEqual(1);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[0]);
            expect(instance.toArray()).toContain(input[0]);
        });

        test('adds node to the tail of the list if it is not empty', () => {
            instance = new SinglyLinkedList([input[0]]);

            expect(instance.getLength()).toEqual(1);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[0]);

            instance.push(input[1]);

            expect(instance.getLength()).toEqual(2);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[1]);
            expect(instance.toArray()).toEqual([input[0], input[1]]);
        });
    });

    describe('pop', () => {
        test('returns undefined if list is empty', () => {
            instance = new SinglyLinkedList();

            expect(instance.pop()).toBeUndefined();
        });

        test('returns node and reset head and tail of the list with 1 node', () => {
            instance = new SinglyLinkedList([input[0]]);

            expect(instance.getLength()).toEqual(1);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[0]);

            let result = instance.pop();

            expect(result).toBeInstanceOf(SinglyLinkedListNode);
            expect(result.getValue()).toEqual(input[0]);
            assertEmptyList(instance);
        });

        test('returns node from the tail and decrease the list', () => {
            instance = new SinglyLinkedList(input);

            expect(instance.getLength()).toEqual(input.length);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[2]);

            let length = input.length;
            for (let index = 0; index < length - 1; index++) {
                expect(instance.pop().getValue()).toEqual(input[length - index - 1]);
                expect(instance.getLength()).toEqual(length - index - 1);
            }
        });
    });

    describe('unshift', () => {
        test('adds node to the head and to the tail of list if empty', () => {
            instance = new SinglyLinkedList();

            assertEmptyList(instance);

            instance.unshift(input[0]);

            expect(instance.getLength()).toEqual(1);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[0]);
            expect(instance.toArray()).toContain(input[0]);
        });

        test('adds node to the head of the list if it is not empty', () => {
            instance = new SinglyLinkedList([input[0]]);

            expect(instance.getLength()).toEqual(1);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[0]);

            instance.unshift(input[1]);

            expect(instance.getLength()).toEqual(2);
            expect(instance.getHead()?.getValue()).toEqual(input[1]);
            expect(instance.getTail()?.getValue()).toEqual(input[0]);
            expect(instance.toArray()).toEqual([input[1], input[0]]);
        });
    });

    describe('shift', () => {
        test('returns undefined if list is empty', () => {
            instance = new SinglyLinkedList();

            expect(instance.shift()).toBeUndefined();
        });

        test('returns node and resets head and tail of the list with 1 node', () => {
            instance = new SinglyLinkedList([input[0]]);

            expect(instance.getLength()).toEqual(1);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[0]);

            let result = instance.shift();

            expect(result).toBeInstanceOf(SinglyLinkedListNode);
            expect(result.getValue()).toEqual(input[0]);
            assertEmptyList(instance);
        });

        test('returns node from the head and decrease the list', () => {
            instance = new SinglyLinkedList(input);

            expect(instance.getLength()).toEqual(input.length);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[2]);

            let length = input.length;
            for (let index = 0; index < length - 1; index++) {
                expect(instance.shift().getValue()).toEqual(input[index]);
                expect(instance.getLength()).toEqual(length - index - 1);
            }
        });
    });

    describe('get', () => {
        test('returns undefined if position less than 0', () => {
            instance = new SinglyLinkedList(input);

            let result = instance.get(-1);

            expect(result).toBeUndefined();
            expect(instance.getLength()).toEqual(input.length);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[2]);
        });

        test('returns undefined if position greater than (list length - 1)', () => {
            instance = new SinglyLinkedList(input);

            let result = instance.get(input.length);

            expect(result).toBeUndefined();
            expect(instance.getLength()).toEqual(input.length);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[2]);
        });

        test('returns node in specified position', () => {
            instance = new SinglyLinkedList(input);

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
        test('returns false if position less than 0', () => {
            instance = new SinglyLinkedList(input);

            let result = instance.set(-1, 99);

            expect(result).toBeFalsy();
            expect(instance.getLength()).toEqual(input.length);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[2]);
        });

        test('returns false if position greater than list (length - 1)', () => {
            instance = new SinglyLinkedList(input);

            let result = instance.set(input.length, 99);

            expect(result).toBeFalsy();
            expect(instance.getLength()).toEqual(input.length);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[2]);
        });

        test('returns true if found node in specified position and sets new value', () => {
            let value = 99;

            instance = new SinglyLinkedList(input);

            let result = instance.set(1, value);

            expect(result).toBeTruthy();
            expect(instance.getLength()).toEqual(input.length);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.get(1)?.getValue()).toEqual(value);
            expect(instance.getTail()?.getValue()).toEqual(input[2]);
        });
    });

    describe('insert', () => {
        test('returns false if position less than 0', () => {
            instance = new SinglyLinkedList();

            let result = instance.insert(-1, input[0]);

            expect(result).toBeFalsy();
            assertEmptyList(instance);
        });

        test('returns false if position greater than list length', () => {
            instance = new SinglyLinkedList(input);

            let result = instance.insert(input.length + 1, 99);

            expect(instance.getLength()).toEqual(input.length);
            expect(instance.toArray()).toEqual(input);
            expect(result).toBeFalsy();
        });

        test('sets the head and the tail if position 0 and list is empty', () => {
            instance = new SinglyLinkedList();

            let result = instance.insert(0, input[0]);

            expect(instance.getLength()).toEqual(1);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[0]);
            expect(result).toBeTruthy();
        });

        test('sets the the tail if position equal list length', () => {
            let value = 99;
            instance = new SinglyLinkedList(input);

            let result = instance.insert(input.length, value);

            expect(instance.getLength()).toEqual(input.length + 1);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(value);
            expect(instance.toArray()).toEqual([...input, value]);
            expect(result).toBeTruthy();
        });

        test('inserts node in specified position of the list', () => {
            let value = 99;
            instance = new SinglyLinkedList(input);

            let result = instance.insert(1, value);

            expect(instance.getLength()).toEqual(input.length + 1);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[2]);
            expect(instance.toArray()).toEqual([input[0], value, input[1], input[2]]);
            expect(result).toBeTruthy();
        });
    });

    describe('remove', () => {
        test('returns undefined if position less 0', () => {
            instance = new SinglyLinkedList(input);

            let result = instance.remove(-1);

            expect(result).toBeUndefined();
            expect(instance.getLength()).toEqual(input.length);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[2]);
        });

        test('returns undefined if position greater than (list length - 1)', () => {
            instance = new SinglyLinkedList(input);

            let result = instance.remove(input.length);

            expect(result).toBeUndefined();
            expect(instance.getLength()).toEqual(input.length);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[2]);
        });

        test('returns head node if position equal 0', () => {
            instance = new SinglyLinkedList(input);

            let result = instance.remove(0);

            expect(result?.getValue()).toEqual(input[0]);
            expect(instance.getLength()).toEqual(input.length - 1);
            expect(instance.getHead()?.getValue()).toEqual(input[1]);
            expect(instance.getTail()?.getValue()).toEqual(input[2]);
        });

        test('returns tail node if position equal (list length - 1)', () => {
            instance = new SinglyLinkedList(input);

            let result = instance.remove(input.length - 1);

            expect(result?.getValue()).toEqual(input[2]);
            expect(instance.getLength()).toEqual(input.length - 1);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[1]);
        });

        test('returns node in specified position', () => {
            instance = new SinglyLinkedList(input);

            let result = instance.remove(1);

            expect(result?.getValue()).toEqual(input[1]);
            expect(instance.getLength()).toEqual(input.length - 1);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[2]);
        });
    });

    describe('reverse', () => {
        test('does nothing if list empty', () => {
            instance = new SinglyLinkedList();

            assertEmptyList(instance);

            instance.reverse();

            assertEmptyList(instance);
        });

        test('does nothing if list has only 1 item', () => {
            instance = new SinglyLinkedList([input[0]]);

            expect(instance.getLength()).toEqual(1);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[0]);

            instance.reverse();

            expect(instance.getLength()).toEqual(1);
            expect(instance.getHead()?.getValue()).toEqual(input[0]);
            expect(instance.getTail()?.getValue()).toEqual(input[0]);
        });

        test('reverses order of list', () => {
            instance = new SinglyLinkedList(input);

            expect(instance.toArray()).toEqual(input);

            instance.reverse();

            expect(instance.toArray()).toEqual(input.reverse());
        });
    });
});


