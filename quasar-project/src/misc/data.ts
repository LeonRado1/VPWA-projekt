import { type Channel } from 'src/types/channel';
import { type Message } from 'src/types/message';
import { type User } from 'src/types/user';
import { ref } from 'vue';

export const channels = ref<Channel[]>([
  {
    id: '1',
    name: 'General',
    lastMessage: 'Welcome to the general channel!',
    lastActivity: new Date('2025-10-18T09:24:00'),
    isPublic: true,
    isInvite: false,
    isAdmin: false,
  },
  {
    id: '2',
    name: 'Project Phoenix',
    lastMessage: 'The deployment is scheduled for tomorrow.',
    lastActivity: new Date('2025-10-19T14:12:00'),
    isPublic: false,
    isInvite: true,
    isAdmin: false,
  },
  {
    id: '3',
    name: 'Random',
    lastMessage: 'Check out this funny meme!',
    lastActivity: new Date('2025-10-19T08:45:00'),
    isPublic: true,
    isInvite: false,
    isAdmin: false,
  },
  {
    id: '4',
    name: 'Design',
    lastMessage: 'New wireframes uploaded.',
    lastActivity: new Date('2025-10-18T18:30:00'),
    isPublic: false,
    isInvite: true,
    isAdmin: false,
  },
  {
    id: '5',
    name: 'Announcements',
    lastMessage: 'Server maintenance tonight.',
    lastActivity: new Date('2025-10-19T07:10:00'),
    isPublic: true,
    isInvite: false,
    isAdmin: true,
  },
  {
    id: '6',
    name: 'Support',
    lastMessage: 'I need help with the login issue.',
    lastActivity: new Date('2025-10-19T12:50:00'),
    isPublic: false,
    isInvite: false,
    isAdmin: false,
  },
  {
    id: '7',
    name: 'Marketing',
    lastMessage: 'Draft for the campaign ready for review.',
    lastActivity: new Date(),
    isPublic: false,
    isInvite: false,
    isAdmin: true,
  },
  {
    id: '8',
    name: 'Development',
    lastMessage: 'API tests are passing now.',
    lastActivity: new Date('2025-10-19T15:40:00'),
    isPublic: false,
    isInvite: false,
    isAdmin: true,
  },
  {
    id: '9',
    name: 'QA Team',
    lastMessage: 'Regression suite updated for the new release.',
    lastActivity: new Date('2025-10-19T10:25:00'),
    isPublic: false,
    isInvite: false,
    isAdmin: false,
  },
  {
    id: '10',
    name: 'HR',
    lastMessage: 'Submit your feedback for Q4 review.',
    lastActivity: new Date('2025-10-18T14:00:00'),
    isPublic: false,
    isInvite: false,
    isAdmin: false,
  },
  {
    id: '11',
    name: 'Backend',
    lastMessage: 'Database migration scheduled for midnight.',
    lastActivity: new Date('2025-10-20T01:15:00'),
    isPublic: false,
    isInvite: false,
    isAdmin: true,
  },
  {
    id: '12',
    name: 'Frontend',
    lastMessage: 'Navbar responsiveness fixed.',
    lastActivity: new Date('2025-10-19T23:45:00'),
    isPublic: false,
    isInvite: false,
    isAdmin: false,
  },
  {
    id: '13',
    name: 'General',
    lastMessage: 'Welcome to the team, everyone!',
    lastActivity: new Date('2025-10-20T02:10:00'),
    isPublic: true,
    isInvite: false,
    isAdmin: true,
  },
  {
    id: '14',
    name: 'Product',
    lastMessage: 'Sprint goals for next week are now posted.',
    lastActivity: new Date('2025-10-19T19:00:00'),
    isPublic: false,
    isInvite: false,
    isAdmin: true,
  },
  {
    id: '15',
    name: 'Operations',
    lastMessage: 'Data backup completed successfully.',
    lastActivity: new Date(),
    isPublic: false,
    isInvite: false,
    isAdmin: false,
  },
]);

export const messages = ref<Message[]>([
  {
    id: '1',
    message: 'Hey team, just pushed the latest update!',
    mentions: [],
    sender: 'alex',
    isOwn: false,
    sentAt: new Date(Date.now() - 1000 * 60 * 20),
  },
  {
    id: '2',
    message: 'Nice work @alex, everything looks clean on my end',
    mentions: ['alex'],
    sender: 'you',
    isOwn: true,
    sentAt: new Date(Date.now() - 1000 * 60 * 18),
  },
  {
    id: '3',
    message: '@maria could you review the PR when you get a chance?',
    mentions: ['maria'],
    sender: 'jordan',
    isOwn: false,
    sentAt: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: '4',
    message: 'Sure thing @jordan, I’ll check it out after lunch.',
    mentions: ['jordan'],
    sender: 'maria',
    isOwn: false,
    sentAt: new Date(Date.now() - 1000 * 60 * 13),
  },
  {
    id: '5',
    message: 'Btw, the API key for test is alex@gmail.com — don’t share it.',
    mentions: [],
    sender: 'alex',
    isOwn: false,
    sentAt: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    id: '6',
    message: 'Got it. Also, @dev_team let’s deploy by 5 PM.',
    mentions: ['dev_team'],
    sender: 'you',
    isOwn: true,
    sentAt: new Date(Date.now() - 1000 * 60 * 9),
  },
  {
    id: '7',
    message: 'Good idea — I’ll notify QA now.',
    mentions: [],
    sender: 'maria',
    isOwn: false,
    sentAt: new Date(Date.now() - 1000 * 60 * 8),
  },
  {
    id: '8',
    message: 'Anyone knows why the staging server is so slow?',
    mentions: [],
    sender: 'alex',
    isOwn: false,
    sentAt: new Date(Date.now() - 1000 * 60 * 7),
  },
  {
    id: '9',
    message: 'Yeah, I saw that too @alex — might be caching again.',
    mentions: ['alex'],
    sender: 'you',
    isOwn: true,
    sentAt: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: '10',
    message: 'Confirmed. Restarting the container now.',
    mentions: [],
    sender: 'jordan',
    isOwn: false,
    sentAt: new Date(),
  },
]);

export const users = ref<User[]>([
  {
    nickname: 'alex',
    email: 'alex@example.com',
  },
  {
    nickname: 'jordan',
    email: 'jordan@example.com',
  },
  {
    nickname: 'maria',
    email: 'maria@example.com',
  },
  {
    nickname: 'dev_team',
    email: 'dev_team@example.com',
  },
]);

export function leaveChannelById(channelId: string): void {
  channels.value = channels.value.filter((ch) => ch.id !== channelId);
}

export function addChannel(newChannel: Channel): void {
  channels.value.push(newChannel);
}

export function addMessage(message: Message): void {
  messages.value.push(message);
}

export function addUser(user: User): void {
  users.value.push(user);
}
