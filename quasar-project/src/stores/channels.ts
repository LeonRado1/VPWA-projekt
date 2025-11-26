import { defineStore } from 'pinia';
import { type Channel } from 'src/models/Channel';

interface ChannelsState {
  channels: Channel[];
}

export const useChannelsStore = defineStore('channels', {
  state: (): ChannelsState => ({
    channels: [],
  }),
  actions: {
    addOrUpdateChannel(channel: Channel) {
      const idx = this.channels.findIndex((x) => x.id === channel.id);
      if (idx !== -1) {
        this.channels[idx] = channel;
      } else {
        this.channels.push(channel);
      }
    },
    removeChannel(channelId: string) {
      this.channels = this.channels.filter((x) => x.id !== channelId);
    },
    setChannels(channels: Channel[]) {
      this.channels = channels;
    },
  },
});

export type ChannelsStoreType = ReturnType<typeof useChannelsStore>;
