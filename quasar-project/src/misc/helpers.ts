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
