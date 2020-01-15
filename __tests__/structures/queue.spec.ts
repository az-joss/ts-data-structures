import { Queue } from '../../src/structures/queue';


describe('Stack', () => {
    let instance: Queue;
    let input: Array<any> = [32, 23, 62];

    describe('enqueue', () => {
        test('sets first and last pointer if queue is empty', () => {
            instance = new Queue();

            expect(instance.getSize()).toEqual(0);
            expect(instance.getFirst()).toBeNull();
            expect(instance.getLast()).toBeNull();

            instance.enqueue(input[0]);

            expect(instance.getSize()).toEqual(1);
            expect(instance.getFirst()?.getValue()).toEqual(input[0]);
            expect(instance.getLast()?.getValue()).toEqual(input[0]);
        });

        test('adds node to the end of queue', () => {
            instance = new Queue(input);

            expect(instance.getSize()).toEqual(input.length);
            expect(instance.getFirst()?.getValue()).toEqual(input[0]);
            expect(instance.getLast()?.getValue()).toEqual(input[input.length - 1]);

            instance.enqueue(99);

            expect(instance.getSize()).toEqual(input.length + 1);
            expect(instance.getLast()?.getValue()).toEqual(99);
            expect(instance.getFirst()?.getValue()).toEqual(input[0]);
        });
    });

    describe('dequeue', () => {
        test('returns undefined if queue is empty', () => {
            instance = new Queue();

            expect(instance.getSize()).toEqual(0);
            expect(instance.getFirst()).toBeNull();
            expect(instance.getLast()).toBeNull();

            let result = instance.dequeue();

            expect(result?.getValue()).toBeUndefined();
        });

        test('resets first and last pointer if queue has only 1 node', () => {
            instance = new Queue([input[0]]);

            expect(instance.getSize()).toEqual(1);
            expect(instance.getFirst()?.getValue()).toEqual(input[0]);
            expect(instance.getLast()?.getValue()).toEqual(input[0]);

            let result = instance.dequeue();

            expect(result?.getValue()).toEqual(input[0]);
            expect(instance.getFirst()).toBeNull();
            expect(instance.getLast()).toBeNull();
        });

        test('returns first node of queue', () => {
            instance = new Queue(input);

            for (let i = 0; i < input.length; i++) {
                let result = instance.dequeue();
                expect(result?.getValue()).toEqual(input[i]);
                expect(instance.getSize()).toEqual(input.length - (i + 1));
            }
        });
    });
});