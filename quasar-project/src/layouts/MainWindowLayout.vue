<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-avatar :size="avatarSize">
          <img :src="profilePicture" alt="Profile">
        </q-avatar>
        <q-toolbar-title>{{ headerTitle }}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above bordered>
      <div>
        <div>
          <q-item-label header>Channels</q-item-label>
        </div>
        <div>
          <q-list>
            <q-item v-for="channel in exampleChannels" :key="channel" clickable>
              <TeamComponent :text="channel" />
            </q-item>
          </q-list>
        </div>
      </div>

      <div>
        <div>
          <q-item-label header>Direct Messages</q-item-label>
        </div>
        <div>
          <q-list>
            <q-item v-for="user in exampleDirectMessages" :key="user" clickable>
              <TeamComponent :text="user" />
            </q-item>
          </q-list>
        </div>
      </div>

      <div>
        <div>
          <q-item-label header>Command Line</q-item-label>
        </div>
        <div>
          <div>
            <div v-for="command in commandHistory" :key="command.id">
              <div>{{ command.prompt }}</div>
              <div v-if="command.output">{{ command.output }}</div>
            </div>
          </div>
        </div>
        <div>
          <q-input
            v-model="drawerInputText"
            placeholder="Enter command..."
            outlined
            dense
            @keyup.enter="handleDrawerInput"
          >
            <template v-slot:append>
              <q-btn 
                icon="send" 
                flat 
                round 
                dense 
                @click="handleDrawerInput"
                :disable="!drawerInputText.trim()"
              />
            </template>
          </q-input>
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
import TeamComponent from 'src/components/TeamComponent.vue';

interface CommandEntry {
  id: number;
  prompt: string;
  output?: string;
}

export default defineComponent({
  name: 'MainWindowLayout',
  components: {
    TeamComponent
  },
  data() {
    return {
      headerTitle: 'Name',
      drawerInputText: '',
      exampleChannels: [
        'Channel 1', 'Channel 2', 'Channel 3', 'Channel 4', 'Channel 5', 'Channel 6', 'Channel 7', 'Channel 8', 'Channel 9'
      ],
      exampleDirectMessages: [
        'User A', 'User B', 'User C', 'User D', 'User E', 'User F', 'User G', 'User H', 'User I'
      ],
      commandHistory: [
        { id: 1, prompt: '> help', output: 'Available commands: help, clear, status' },
        { id: 2, prompt: '> status', output: 'System online' }
      ] as CommandEntry[]
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
    }
  },
  methods: {
    handleDrawerInput() {
      if (this.drawerInputText.trim()) {
        const newCommand: CommandEntry = {
          id: Date.now(),
          prompt: `> ${this.drawerInputText.trim()}`,
          output: `Command executed: ${this.drawerInputText.trim()}`
        };
        this.commandHistory.push(newCommand);
        this.drawerInputText = '';
      }
    }
  }
});
</script>
