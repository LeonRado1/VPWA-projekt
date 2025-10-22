import { type MessageToken } from 'src/misc/helpers';

export type Message = {
  id: string;
  message: string;
  mentions: string[];
  sender: string;
  isOwn: boolean;
  sentAt: Date;
  tokens?: MessageToken[];
};
