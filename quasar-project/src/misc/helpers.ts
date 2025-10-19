import { Notify } from 'quasar';

export function notify(message: string, isError: boolean): void {
  Notify.create({
    message,
    color: isError ? 'negative' : 'positive',
    icon: isError ? 'error' : 'check',
    position: 'bottom-right',
    actions: [
      {
        color: 'white',
        rounded: true,
        icon: 'close',
        handler: () => {},
      },
    ],
  });
}

export function calculateTimeAgo(date: Date) {
  const diff = new Date().getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return 'now';
  }
  if (minutes < 60) {
    return `${minutes} m`;
  }
  if (hours < 24) {
    return `${hours} h`;
  }

  return `${days} d`;
}
