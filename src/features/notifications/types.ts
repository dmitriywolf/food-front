interface INotification {
  _id: string;
  isWatched: boolean;
  userId: string;
  type: string;
  createdAt: string;
  data: any;
}

export { INotification };
