import {MaxBinaryHeap} from "../../src/structures/max-binary-heap";


describe('Maximum binary heap', () => {
    let instance: MaxBinaryHeap;

    beforeEach(() => {
       instance = new MaxBinaryHeap();
    });

    describe('Insert', () => {
        test('adds value to the heap', () => {


        });
    });

    describe('Remove', () => {
        test('returns undefined if heap is empty', () => {
            const result = instance.remove();

            expect(result).toBeUndefined();
        });

        test('returns max value if heap has only 1 element', () => {
            instance.insert(55);
            const result = instance.remove();

            expect(result).toEqual(55);
            expect(instance.getLength()).toEqual(0);
        });

        test('returns max value if heap has only 2 elements', () => {
            instance.insert(55);
            instance.insert(45);

            let result = instance.remove();

            expect(result).toEqual(55);
            expect(instance.getLength()).toEqual(1);

            result = instance.remove();

            expect(result).toEqual(45);
            expect(instance.getLength()).toEqual(0);
        });

        test('returns max value and set new root', () => {
            [41, 39, 33, 18, 27, 12, 55].forEach((val) => {
                instance.insert(val);
            });

            let result = instance.remove();

            expect(result).toEqual(55);
            expect(instance.getLength()).toEqual(6);
            expect(instance.getRoot()).toEqual(41);
        });
    });
});