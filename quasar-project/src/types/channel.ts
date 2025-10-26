import { type User } from 'src/types/user';

export type Channel = {
  id: string;
  name: string;
  lastMessage?: string;
  lastActivity: Date;
  isPublic: boolean;
  isInvite: boolean;
  isAdmin: boolean;
  users?: User[];
};
