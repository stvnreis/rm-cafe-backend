import { WatchedList } from './watched-list';

class NumberWatchedList extends WatchedList<number> {
  compareItems(a: number, b: number): boolean {
    return a === b;
  }
}

describe('watched list', () => {
  it('should be able to create a watched list with initial items', () => {
    const list = new NumberWatchedList([1, 2, 3]);

    expect(list.currentItems).toHaveLength(3);
    expect(list.currentItems[0]).toEqual(1);
  });

  it('should be able to add items to the list', () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.add(4);

    expect(list.currentItems).toHaveLength(4);
    expect(list.getNewItems()).toEqual([4]);
  });

  it('should be able to remove items from the list', () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.remove(1);

    expect(list.currentItems).toHaveLength(2);
    expect(list.getRemovedItems()).toEqual([1]);
  });

  it('should be able to add an item even though it has been removed', () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.remove(1);
    list.add(1);

    expect(list.currentItems).toHaveLength(3);
    expect(list.getRemovedItems()).toEqual([]);
    expect(list.getNewItems()).toEqual([]);
  });

  it('should be able to update an item', () => {
    const list = new NumberWatchedList([1, 2, 3]);

    list.update([1, 3, 5]);

    expect(list.currentItems).toHaveLength(3);
    expect(list.getRemovedItems()).toEqual([2]);
    expect(list.getNewItems()).toEqual([5]);
  });
});
