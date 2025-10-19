export type Channel = {
  id: string;
  name: string;
  lastMessage: string;
  lastActivity: Date;
  isPublic: boolean;
  isInvite: boolean;
};
