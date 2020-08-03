import {HashTable} from "../../src/structures/hash-table";

describe('Max binary heap', () => {
    let instance: HashTable;

    beforeEach(() => {
        instance = new HashTable;
    });

    describe('set', () => {
        test('sets key value to hash table: int', () => {
            const input = 11;

            instance.set('key', input);

            expect(instance.get('key')).toEqual(input);
        });
        test('sets key value to hash table: float', () => {
            const input = 41.42;

            instance.set('key', input);

            expect(instance.get('key')).toEqual(input);
        });
        test('sets key value to hash table: bool', () => {
            const input = true;

            instance.set('key', input);

            expect(instance.get('key')).toEqual(input);
        });
        test('sets key value to hash table: array', () => {
            const input = ['foo'];

            instance.set('key', input);

            expect(instance.get('key')).toEqual(input);
        });
        test('sets key value to hash table: object', () => {
            const input = {foo: 'bar'};

            instance.set('key', input);

            expect(instance.get('key')).toEqual(input);
        });
        test('resets key with new value', () => {
            instance.set('key', 100);

            expect(instance.get('key')).toEqual(100);

            instance.set('key', 999);

            expect(instance.get('key')).toEqual(999);
        });
    });

    describe('get', () => {
        test('returns value by key', () => {
            const input = 11;

            instance.set('key', input);

            expect(instance.get('key')).toEqual(input);
        });

    });

    describe('unset', () => {
        test('removes key value from hash table', () => {
            instance.set('key_1', 11);
            instance.set('key_2', 22);
            instance.set('key_3', 33);

            expect(instance.get('key_1')).toEqual(11);
            expect(instance.get('key_2')).toEqual(22);
            expect(instance.get('key_3')).toEqual(33);

            instance.unset('key_2');

            expect(instance.get('key_1')).toEqual(11);
            expect(instance.get('key_2')).toBeUndefined();
            expect(instance.get('key_3')).toEqual(33);
        });

    });

    describe('keys', () => {
        test('returns list of keys', () => {
            instance.set('key_1', 1);
            instance.set('key_2', 2);
            instance.set('key_3', 3);

            expect(instance.keys()).toEqual(['key_1', 'key_2', 'key_3']);
        });

    });

    describe('values', () => {
        test('returns list of unique values', () => {
            instance.set('key_1', 1);
            instance.set('key_2', 2);
            instance.set('key_3', 2);
            instance.set('key_4', 3);

            let result = instance.values();

            expect(result.length).toEqual(3);
            expect(result).toEqual(
                expect.arrayContaining([1, 2, 3])
            );
        });

    });
});