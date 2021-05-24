import {IList} from '../src/structures/contracts/structures';

export function assertEmptyList(list: IList): void {
    expect(list.getLength()).toEqual(0);
    expect(list.getHead()).toBeNull();
    expect(list.getTail()).toBeNull();
}