import { defineStore } from 'pinia';
import { io, type Socket } from 'socket.io-client';
import { notify } from 'src/misc/helpers';
import { type ChannelsStoreType, useChannelsStore } from 'stores/channels';
import type { Channel } from 'src/models/Channel';
import { useAuthStore } from 'stores/auth';
interface EventMap {
  [event: string]: (...args: any[]) => void | Promise<void>;
}

interface SocketState {
  connected: boolean;
  ws: Socket | null;
  channelsStore: ChannelsStoreType;
  listeners: EventMap;
  authStore: ReturnType<typeof useAuthStore>;
}

export const useSocketStore = defineStore('socket', {
  state: (): SocketState => ({
    connected: false,
    ws: null,
    channelsStore: useChannelsStore(),
    listeners: {},
    authStore: useAuthStore(),

  }),
  actions: {
    connect(token: string) {
      if (this.connected) {
        return;
      }

      this.ws = io('http://localhost:3333/ws', {
        transports: ['websocket'],
        auth: {
          token: token,
        },
      });

      this.ws.on('connect', () => {
        console.log('Websocket Connected');
        this.connected = true;
      });

      this.initializeAlerts();

      this.initializeListeners();
      this.subscribe();
    },
    initializeAlerts() {
      this.ws!.on('result:success', (message: string) => {
        notify(message, false);
      });
      this.ws!.on('result:failed', (message: string) => {
        notify(message, true);
      });
    },
    initializeListeners() {
      this.listeners['join:added'] = (channel: Channel) => {
        this.channelsStore.addOrUpdateChannel(channel);
      };

      this.listeners['invite:received'] = (channel: Channel) => {
        this.channelsStore.addOrUpdateChannel(channel);
      };

      this.listeners['revoke:received'] = async (channelId: string) => {
        const currentChannelId = this.router.currentRoute.value.params.id;
        if (currentChannelId === channelId) {
          await this.router.push('/');
        }
        this.channelsStore.removeChannel(channelId);
      };

      this.listeners['kick:removed'] = async (channelId: string) => {
        const currentChannelId = this.router.currentRoute.value.params.id;
        if (currentChannelId === channelId) {
          await this.router.push('/');
        }
        this.channelsStore.removeChannel(channelId);
      };

      this.listeners['channel:removed'] = async (channelId: string) => {
        const currentChannelId = this.router.currentRoute.value.params.id;
        console.log('removing channel')
        if (currentChannelId === channelId) {
          await this.router.push('/');
          console.log('removing channel');
          this.channelsStore.removeChannel(channelId)
        }
        this.channelsStore.removeChannel(channelId);
      };
      this.listeners['channel:left'] = ({ channelId, userId }) => {
      if (userId === this.authStore.currentUser?.id) {
        this.channelsStore.removeChannel(channelId)
      }
};
    },
    subscribe() {
      Object.keys(this.listeners).forEach((event) => {
        this.ws?.on(event, this.listeners[event]!);
      });
    },
    unsubscribe() {
      Object.keys(this.listeners).forEach((event) => {
        this.ws?.off(event, this.listeners[event]!);
      });
    },
  },
});

export type SocketStoreType = ReturnType<typeof useSocketStore>;
