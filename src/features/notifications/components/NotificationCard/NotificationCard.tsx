import { INotification } from '../../types';

type NotificationCardProps = {
  notification: INotification;
};

export default function NotificationCard({
  notification,
}: NotificationCardProps) {
  console.log('Notification', notification);
  return <div>NotificationCard</div>;
}
