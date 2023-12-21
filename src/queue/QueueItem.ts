export class QueueItem {
  value: any;
  next?: QueueItem;

  constructor(value: any) {
    this.value = value;
  }
}
