import {IListStructure} from '../src/structures/data-structure';

export function assertEmptyList(list: IListStructure): void {
    expect(list.getLength()).toEqual(0);
    expect(list.getHead()).toBeNull();
    expect(list.getTail()).toBeNull();
}