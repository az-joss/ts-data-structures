import {MaxBinaryHeap} from "../../src/structures/max-binary-heap";

describe('Max binary heap', () => {
    let instance: MaxBinaryHeap;

    beforeEach(() => {
        instance = new MaxBinaryHeap;
    });

    describe('insert', () => {
        test('adds value to the pool', () => {
            expect(instance.toArray().length).toEqual(0);

            instance.insert(42);

            expect(instance.toArray().length).toEqual(1);
            expect(instance.toArray()[0]).toEqual(42);
        });
        test('bubbles up value to proper index', () => {
            instance.insertMany([
                50, 30, 20, 40, 70
            ]);

            expect(instance.toArray()).toEqual([70, 50, 20, 30, 40]);
        });
    });

    describe('extract', () => {
        test('returns null if empty', () => {
            expect(instance.toArray().length).toEqual(0);
            expect(instance.extract()).toBeNull();
        });

        test('returns max value if heap with 1 node', () => {
            instance.insert(50);

            expect(instance.extract()).toEqual(50);
            expect(instance.toArray().length).toEqual(0);
        });

        test('returns max value and set new max', () => {
            let data = [
                50, -45, 61, -72, 13, 97, 38, -91, -86
            ];

            instance.insertMany(data);

            data.sort((a, b) => {
                return a > b ? -1 : 1;
            });

            data.forEach((num) => {
                expect(instance.extract()).toEqual(num);
            });
        });
    });
});