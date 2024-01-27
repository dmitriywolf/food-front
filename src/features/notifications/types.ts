interface INotification {
  _id: string;
  isWatched: boolean;
  toUser: string;
  data: any;
}

export { INotification };
