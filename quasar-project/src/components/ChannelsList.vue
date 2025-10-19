<template>
  <q-list>
    <q-item
      bordered
      v-for="channel in channelsSorted"
      :key="channel.id"
      clickable
      @click="openChannel(channel.id)"
      class="q-px-1"
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

export default defineComponent({
  data() {
    return {
      exampleChannels: [
        {
          id: '1',
          name: 'General',
          lastMessage: 'Welcome to the general channel!',
          lastActivity: new Date('2025-10-18T09:24:00'),
          isPublic: true,
          isInvite: false,
        },
        {
          id: '2',
          name: 'Project Phoenix',
          lastMessage: 'The deployment is scheduled for tomorrow.',
          lastActivity: new Date('2025-10-19T14:12:00'),
          isPublic: false,
          isInvite: true,
        },
        {
          id: '3',
          name: 'Random',
          lastMessage: 'Check out this funny meme!',
          lastActivity: new Date('2025-10-19T08:45:00'),
          isPublic: true,
          isInvite: false,
        },
        {
          id: '4',
          name: 'Design',
          lastMessage: 'New wireframes uploaded.',
          lastActivity: new Date('2025-10-18T18:30:00'),
          isPublic: false,
          isInvite: true,
        },
        {
          id: '5',
          name: 'Announcements',
          lastMessage: 'Server maintenance tonight.',
          lastActivity: new Date('2025-10-19T07:10:00'),
          isPublic: true,
          isInvite: false,
        },
        {
          id: '6',
          name: 'Support',
          lastMessage: 'I need help with the login issue.',
          lastActivity: new Date('2025-10-19T12:50:00'),
          isPublic: false,
          isInvite: false,
        },
        {
          id: '7',
          name: 'Marketing',
          lastMessage: 'Draft for the campaign ready for review.',
          lastActivity: new Date('2025-10-18T15:00:00'),
          isPublic: true,
          isInvite: false,
        },
      ] as Channel[],
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
