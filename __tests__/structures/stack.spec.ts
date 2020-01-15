import { Stack } from "../../src/structures/stack";

describe('Stack', () => {
    let instance: Stack;
    let input: Array<any> = [52, 71, 45];

    describe('push', () => {
        test('sets first and last pointer if stack is empty', () => {
            instance = new Stack();

            expect(instance.getSize()).toEqual(0);
            expect(instance.getFirst()).toBeNull();
            expect(instance.getLast()).toBeNull();

            instance.push(input[0]);

            expect(instance.getSize()).toEqual(1);
            expect(instance.getFirst()?.getValue()).toEqual(input[0]);
            expect(instance.getLast()?.getValue()).toEqual(input[0]);
        });

        test('sets new node to the first node of stack', () => {
            instance = new Stack(input);

            expect(instance.getSize()).toEqual(input.length);
            expect(instance.getFirst()?.getValue()).toEqual(input[input.length - 1]);
            expect(instance.getLast()?.getValue()).toEqual(input[0]);

            instance.push(99);

            expect(instance.getSize()).toEqual(input.length + 1);
            expect(instance.getFirst()?.getValue()).toEqual(99);
            expect(instance.getFirst()?.getNext()?.getValue()).toEqual(input[input.length - 1]);
            expect(instance.getLast()?.getValue()).toEqual(input[0]);
        });
    });

    describe('pop', () => {
        test('returns undefined if stack is empty', () => {
            instance = new Stack();

            expect(instance.getSize()).toEqual(0);
            expect(instance.getFirst()).toBeNull();
            expect(instance.getLast()).toBeNull();

            let result = instance.pop();

            expect(result).toBeUndefined();
        });

        test('resets first and last pointer of stack and returns node if stack has only 1 node', () => {
            instance = new Stack([input[0]]);

            expect(instance.getSize()).toEqual(1);
            expect(instance.getFirst()?.getValue()).toEqual(input[0]);
            expect(instance.getLast()?.getValue()).toEqual(input[0]);

            let result = instance.pop();

            expect(result?.getValue()).toEqual(input[0]);
            expect(instance.getSize()).toEqual(0);
            expect(instance.getFirst()).toBeNull();
            expect(instance.getLast()).toBeNull();
        });

        test('returns first pointer of stack', () => {
            instance = new Stack(input);

            for (let i = 0; i < input.length; i++) {
                let result = instance.pop();
                expect(result?.getValue()).toEqual(input[input.length - 1 - i]);
                expect(instance.getSize()).toEqual(input.length - (i + 1));
            }
        });
    });
});