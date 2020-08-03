
interface HashTableElement {
    key: string,
    value: any
}

/**
 * Complexity (O)
 * | operation | time  | space |
 * --------------------------------
 * | set       | O(1)  | -     |
 * | get       | O(1)  | -     |
 * | unset     | O(1)  | -     |
 * | key       | O(n)  | -     |
 * | values    | O(n)  | -     |
 */
export class HashTable {

    private map: Array<Array<HashTableElement>> = [];

    constructor(
        private size: number = 64
    ) {}

    public set(key: string, value: any) {
        const element: HashTableElement = {key, value};

        let keyHash = this.hash(key);
        let subMap = this.map[keyHash] ?? [];
        let subMapIndex = this.resolveConflict(keyHash, key);

        subMap[subMapIndex] = element;

        this.map[keyHash] = subMap;
    }

    public get(key: string): any|undefined {
        let keyHash = this.hash(key);
        let subMapIndex = this.resolveConflict(keyHash, key);

        return this.map[keyHash][subMapIndex]
            ? this.map[keyHash][subMapIndex].value
            : undefined;
    }

    public unset(key: string) {
        let keyHash = this.hash(key);
        let subMapIndex = this.resolveConflict(keyHash, key);

        if (this.map[keyHash][subMapIndex]) {
            this.map[keyHash].splice(subMapIndex, 1);
        }
    }

    public keys(): Array<string> {
        let list: Array<string> = [];

        this.map.forEach((subMap: Array<HashTableElement> ) => {
            subMap.forEach((element: HashTableElement) => {
                list.push(element.key);
            });
        });

        return list;
    }

    public values(): Array<any> {
        let list: Array<any> = [];

        this.map.forEach((subMap: Array<HashTableElement> ) => {
            subMap.forEach((element: HashTableElement) => {
                if (list.includes(element.value)) {
                    return;
                }

                list.push(element.value);
            });
        });

        return list;
    }

    protected hash(value: string): number {
        const primaryNumber: number = 53;
        let sum = 0;

        // reduce maximum iterations to 100
        for (let i = 0; i < Math.min(value.length, 100); i++) {
            sum = (sum * primaryNumber + value.charCodeAt(i)) % this.size;
        }

        return sum;
    }

    /**
     * Used 'separate chaining' strategy to solve conflicts
     */
    protected resolveConflict(keyHashedIndex: number, key: string) {
        let subMap: Array<any> = this.map[keyHashedIndex] ?? [];
        let subMapIndex: number = subMap.findIndex((element: HashTableElement) => {
            return element.key === key;
        });

        return subMapIndex === -1 ? subMap.length : subMapIndex;
    }
}