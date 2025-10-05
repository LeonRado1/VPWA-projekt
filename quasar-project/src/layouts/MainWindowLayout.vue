<template>
  <q-layout view=" Lpr lHh lFf" class="full-width">
    <q-header elevated style="background-color: gray;">
      <q-toolbar>
      <q-avatar :size="avatarSize">
        <img :src="profilePicture" alt="Profile">
      </q-avatar>
      <q-toolbar-title>{{ headerTitle }}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above bordered>
      <div style="max-height: 33.33%; overflow-y: auto;">
        <div style="position: sticky; top: 0; z-index: 10; background-color: lightgray;">
          <q-item-label header>Channels</q-item-label>
        </div>
        <div class="q-pa-md" >
          <q-list>
        <q-item v-for="channel in exampleChannels" :key="channel" clickable>
          <TeamComponent :text="channel" />
        </q-item>
          </q-list>
        </div>
      </div>

      <div  style="max-height: 33.33%; overflow-y: auto;">
        <div style="position: sticky; top: 0; background-color: lightgray; z-index: 10;">
          <q-item-label header>Direct Messages</q-item-label>
        </div>
        <div  class="q-pa-md">
          <q-list>
            <q-item v-for="user in exampleDirectMessages" :key="user" clickable>
              <TeamComponent :text="user" />
            </q-item>
          </q-list>
        </div>
      </div>

      <div  style="max-height: 33.33%; overflow-y: auto;"> 
        <div style="position: sticky; top: 0; background-color: lightgray; z-index: 10;"> 
          <q-item-label header >Command Line</q-item-label>
        </div>
        <div>
          <div class="q-pa-md">
            <div v-for="command in commandHistory" :key="command.id">
              <div style="color: green; font-weight: 700;">{{ command.prompt }}</div>
              <div v-if="command.output" style="color: gray;">{{ command.output }}</div>
            </div>
          </div>
        </div>
        <div class="q-pa-md" style="position: sticky; bottom: 0; background: white; z-index: 10;">
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
        { id: 2, prompt: '> status', output: 'System online' },
        { id: 2, prompt: '> status', output: 'System online' },
        { id: 2, prompt: '> status', output: 'System online' },
        { id: 2, prompt: '> status', output: 'System online' },
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
