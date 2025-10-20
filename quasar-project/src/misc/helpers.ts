import { Notify } from 'quasar';
import { type Message } from 'src/types/message';

export interface MessageToken {
  type: 'mention' | 'text';
  value: string;
}

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

export function tokenizeMessage(msg: Message): MessageToken[] {
  const tokens: MessageToken[] = [];
  const parts = msg.message.split(/(@\w+)/g);
  const mentions = msg.mentions.map((m) => m.toLowerCase());

  for (const part of parts) {
    if (!part) continue;
    const username = part.slice(1).toLowerCase();

    if (part.startsWith('@') && mentions.includes(username)) {
      tokens.push({ type: 'mention', value: part });
    } else {
      tokens.push({ type: 'text', value: part });
    }
  }

  return tokens;
}
