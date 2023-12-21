import { QueueItem } from './QueueItem';

export class SimpleQueue {
  private headItem?: QueueItem;
  private tailItem?: QueueItem;
  private _size: number = 0;

  constructor() {
    this.reset();
  }

  get size() {
    return this._size;
  }

  push(value: any) {
    const item = new QueueItem(value);
    if (this.headItem && this.tailItem) {
      // 这里是整个queue的重点, 类似链表的尾插法
      this.tailItem.next = item;
      this.tailItem = item;
    } else {
      this.headItem = item;
      this.tailItem = item;
    }
    this._size++;
  }

  pop() {
    if (!this.headItem) {
      return undefined;
    }
    const current = this.headItem;
    this.headItem = this.headItem.next;
    this._size--;
    return current.value;
  }

  reset() {
    this.headItem = undefined;
    this.tailItem = undefined;
    this._size = 0;
  }

  * [Symbol.iterator]() {
    let current = this.headItem;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }

  toString() {
    return JSON.stringify(this);
  }
}
