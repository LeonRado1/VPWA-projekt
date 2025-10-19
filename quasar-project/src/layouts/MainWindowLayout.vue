<template>
  <q-layout view="hHh Lpr lff" class="full-width">
    <AppNavbar v-model:sidebarOpen="sidebarOpen" />

    <q-drawer show-if-above v-model="sidebarOpen" bordered>
      <div class="q-px-sm q-py-md full-height flex column no-wrap">
        <div class="text-h6 text-secondary text-weight-bold q-mb-md" style="line-height: 1">
          Channels
        </div>
        <q-separator />
        <div class="q-my-md" style="flex: 1; overflow-y: auto">
          <ChannelsList />
        </div>
        <q-separator />
        <div class="row gap-2 q-mt-md">
          <q-btn outline size="sm" round class="q-mr-sm" icon="motion_photos_on" />
          <q-btn outline size="sm" round icon="library_add" />
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';
import profilePicture from '../assets/profile-picture.png';
import AppNavbar from 'components/AppNavbar.vue';
import ChannelsList from 'components/ChannelsList.vue';

interface CommandEntry {
  id: number;
  prompt: string;
  output?: string;
}

export default defineComponent({
  name: 'MainWindowLayout',
  components: {
    ChannelsList,
    AppNavbar,
  },
  data() {
    return {
      sidebarOpen: true,
      headerTitle: 'Name',
      drawerInputText: '',
      exampleChannels: [
        'Channel 1',
        'Channel 2',
        'Channel 3',
        'Channel 4',
        'Channel 5',
        'Channel 6',
        'Channel 7',
        'Channel 8',
        'Channel 9',
      ],
      exampleDirectMessages: [
        'User A',
        'User B',
        'User C',
        'User D',
        'User E',
        'User F',
        'User G',
        'User H',
        'User I',
      ],
      commandHistory: [
        { id: 1, prompt: '> help', output: 'Available commands: help, clear, status' },
        { id: 2, prompt: '> status', output: 'System online' },
        { id: 2, prompt: '> status', output: 'System online' },
        { id: 2, prompt: '> status', output: 'System online' },
        { id: 2, prompt: '> status', output: 'System online' },
        { id: 2, prompt: '> status', output: 'System online' },
      ] as CommandEntry[],
    };
  },
  computed: {
    avatarSize(): string {
      const $q = useQuasar();
      if ($q.screen.xs) return '35px';
      if ($q.screen.sm) return '40px';
      return '45px';
    },
    profilePicture() {
      return profilePicture;
    },
  },
  methods: {
    handleDrawerInput() {
      if (this.drawerInputText.trim()) {
        const newCommand: CommandEntry = {
          id: Date.now(),
          prompt: `> ${this.drawerInputText.trim()}`,
          output: `Command executed: ${this.drawerInputText.trim()}`,
        };
        this.commandHistory.push(newCommand);
        this.drawerInputText = '';
      }
    },
    async openChannel(channel: string) {
      const encoded = encodeURIComponent(channel);
      try {
        await this.$router.push({ path: `/channels/${encoded}` });
      } catch (err) {
        console.error('Navigation error (openChannel):', err);
      }
    },
    async openUser(user: string) {
      const encoded = encodeURIComponent(user);
      try {
        await this.$router.push({ path: `/users/${encoded}` });
      } catch (err) {
        console.error('Navigation error (openUser):', err);
      }
    },
  },
});
</script>
