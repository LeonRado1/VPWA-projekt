<template>
  <q-list>
    <q-item
      bordered
      v-for="channel in channelsSorted"
      :key="channel.id"
      clickable
      @click="openChannel(channel.id)"
      class="q-px-sm"
    >
      <q-item-section>
        <q-item-label lines="1" :class="channel.isInvite ? 'text-weight-medium' : null">
          {{ channel.name }}
        </q-item-label>
        <q-item-label caption lines="1">
          <q-badge v-if="channel.isInvite" color="negative" label="Invite" />
          <span v-else>{{ channel.lastMessage }}</span>
        </q-item-label>
      </q-item-section>

      <q-item-section side>{{ calculateTimeAgo(channel.lastActivity) }}</q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { type Channel } from 'src/types/channel';
import { calculateTimeAgo } from 'src/misc/helpers';
import { channels } from 'src/misc/data';

export default defineComponent({
  data() {
    return {
      exampleChannels: channels,
    };
  },
  methods: {
    async openChannel(channelId: string) {
      const encoded = encodeURIComponent(channelId);
      try {
        await this.$router.push({ path: `/channels/${encoded}` });
      } catch (err) {
        console.error('Navigation error (openChannel):', err);
      }
    },
    calculateTimeAgo(date: Date) {
      return calculateTimeAgo(date);
    },
  },
  computed: {
    channelsSorted(): Channel[] {
      return [...this.exampleChannels].sort((a, b) => {
        if (a.isInvite && !b.isInvite) {
          return -1;
        }
        if (!a.isInvite && b.isInvite) {
          return 1;
        }

        return b.lastActivity.getTime() - a.lastActivity.getTime();
      });
    },
  },
});
</script>
