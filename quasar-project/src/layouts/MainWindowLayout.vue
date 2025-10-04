<template>
  <q-layout view="lHh Lpr lFf" class="main-window-layout">
    <q-header elevated class="app-header">
      <q-toolbar class="dynamic-toolbar">
        <q-avatar :size="avatarSize" class="profile-avatar">
          <img :src="profilePicture" alt="Profile">
        </q-avatar>

        <q-toolbar-title class="dynamic-title">{{ headerTitle }}</q-toolbar-title>


      </q-toolbar>

    </q-header>

    <q-drawer show-if-above bordered class="app-drawer three-section-drawer">
      
      <div class="drawer-section channels-section">
        <div class="section-header">
          <q-item-label header class="section-title">Channels</q-item-label>
        </div>
        <div class="section-content">
          <q-list>
            <q-item v-for="channel in exampleChannels" :key="channel" clickable>
              <TeamComponent :text="channel" />
            </q-item>
          </q-list>
        </div>
      </div>

      <div class="drawer-section messages-section">
        <div class="section-header">
          <q-item-label header class="section-title">Direct Messages</q-item-label>
        </div>
        <div class="section-content">
          <q-list>
            <q-item v-for="user in exampleDirectMessages" :key="user" clickable>
              <TeamComponent :text="user" />
            </q-item>
          </q-list>
        </div>
      </div>

      <div class="drawer-section command-section">
        <div class="section-header">
          <q-item-label header class="section-title">Command Line</q-item-label>
        </div>
        <div class="section-content command-content">
          <div class="command-output">
            <div v-for="command in commandHistory" :key="command.id" class="command-line">
              <div class="command-prompt">{{ command.prompt }}</div>
              <div v-if="command.output" class="command-result">{{ command.output }}</div>
            </div>
          </div>
        </div>
        <!-- Fixed input at bottom of this section -->
        <div class="section-input-bottom">
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
      
    </q-drawer>    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup lang="ts">

import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import profilePicture from '../assets/profile-picture.png';
import TeamComponent from 'src/components/TeamComponent.vue';   

const $q = useQuasar();
const headerTitle = ref('Name');

const avatarSize = computed(() => {
  if ($q.screen.xs) return '35px';
  if ($q.screen.sm) return '40px';
  return '45px';
});

const exampleChannels = ['Channel 1', 'Channel 2', 'Channel 3', 'Channel 4', 'Channel 5', 'Channel 6', 'Channel 7', 'Channel 8', 'Channel 9'];
const exampleDirectMessages = ['User A', 'User B', 'User C', 'User D', 'User E', 'User F', 'User G', 'User H', 'User I'];

const drawerInputText = ref('');

interface CommandEntry {
  id: number;
  prompt: string;
  output?: string;
}

const commandHistory = ref<CommandEntry[]>([
  { id: 1, prompt: '> help', output: 'Available commands: help, clear, status' },
  { id: 2, prompt: '> status', output: 'System online' }
]);

const handleDrawerInput = () => {
  if (drawerInputText.value.trim()) {
    const newCommand: CommandEntry = {
      id: Date.now(),
      prompt: `> ${drawerInputText.value.trim()}`,
      output: `Command executed: ${drawerInputText.value.trim()}`
    };
    
    commandHistory.value.push(newCommand);
    drawerInputText.value = '';
  }
};

</script>

<style scoped>
.main-window-layout {
  --header-padding: clamp(12px, 2vw, 24px);
  --avatar-border-width: clamp(1px, 0.2vw, 3px);
  --title-font-size: clamp(1.2rem, 3vw, 1.8rem);
}

.app-header {
  background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-light);
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(10px);
}

.dynamic-header {
  width: 100vw;
  left: 0 !important;
  right: 0 !important;
  z-index: 2000;
  position: fixed;
  height: var(--header-height);
  transition: var(--transition-normal);
}

.dynamic-toolbar {
  width: 100%;
  max-width: none;
  padding-left: var(--header-padding);
  padding-right: var(--header-padding);
  height: 100%;
  display: flex;
  align-items: center;
  gap: clamp(8px, 2vw, 16px);
}

.profile-avatar {
  border: var(--avatar-border-width) solid var(--accent-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-normal);
  flex-shrink: 0;
  box-shadow: var(--shadow-md);
}

.profile-avatar:hover {
  border-color: var(--accent-secondary);
  transform: scale(1.05);
  box-shadow: var(--shadow-lg), 0 0 20px rgba(59, 130, 246, 0.4);
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.dynamic-title {
  font-size: var(--title-font-size);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

@media (max-width: 600px) {
  .dynamic-toolbar {
    gap: 8px;
  }
  
  .dynamic-title {
    font-size: 1.1rem;
  }
}

@media (max-width: 400px) {
  .dynamic-toolbar {
    padding-left: 8px;
    padding-right: 8px;
  }
}

.three-section-drawer {
  display: flex !important;
  flex-direction: column !important;
  height: 100vh !important;
  overflow: hidden !important;
  background: var(--bg-primary);
}

.drawer-section {
  height: calc(100vh / 3) !important;
  display: flex !important;
  flex-direction: column !important;
  border-bottom: 2px solid var(--border-light) !important;
  overflow: hidden !important;
  min-height: 0 !important;
  max-height: calc(100vh / 3) !important;
  transition: var(--transition-normal);
}

.drawer-section:last-child {
  border-bottom: none !important;
}

.section-header {
  background: linear-gradient(90deg, var(--bg-tertiary) 0%, var(--bg-quaternary) 100%);
  padding: 1rem 1.25rem !important;
  border-bottom: 1px solid var(--border-medium) !important;
  flex-shrink: 0 !important;
  backdrop-filter: blur(5px);
}

.section-title {
  color: var(--text-primary) !important;
  font-weight: 700 !important;
  font-size: 1rem !important;
  letter-spacing: 0.025em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.section-content {
  flex: 1 !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  padding: 8px !important;
  min-height: 0 !important;
  max-height: 100% !important;
}

.command-content {
  padding: 0 !important;
  flex: 1 !important;
  display: flex !important;
  flex-direction: column !important;
  min-height: 0 !important;
}

.command-output {
  flex: 1 !important;
  padding: 1rem !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  font-family: 'JetBrains Mono', 'Courier New', monospace !important;
  font-size: 0.9rem !important;
  min-height: 0 !important;
  background: var(--bg-primary);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--border-light);
  margin: 0.5rem;
  box-shadow: var(--shadow-sm);
}

.command-line {
  margin-bottom: 0.75rem !important;
  line-height: 1.5;
}

.command-prompt {
  color: var(--accent-success) !important;
  font-weight: 600 !important;
  text-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
}

.command-result {
  color: var(--text-secondary) !important;
  margin-left: 1rem !important;
  font-size: 0.85rem !important;
  padding: 0.25rem 0;
}

.section-input-bottom {
  padding: 1rem !important;
  background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%) !important;
  border-top: 1px solid var(--border-medium) !important;
  flex-shrink: 0 !important;
  position: relative !important;
  bottom: 0 !important;
  backdrop-filter: blur(5px);
}

.section-input-bottom :deep(.q-field) {
  background-color: var(--bg-tertiary) !important;
  border-radius: var(--border-radius-md) !important;
  box-shadow: var(--shadow-sm);
}

.section-input-bottom :deep(.q-field__control) {
  background-color: var(--bg-tertiary) !important;
  color: var(--text-primary) !important;
  border: 2px solid var(--border-medium) !important;
  transition: var(--transition-fast);
}

.section-input-bottom :deep(.q-field--focused .q-field__control) {
  border-color: var(--accent-primary) !important;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.section-input-bottom :deep(.q-btn) {
  background-color: var(--accent-primary) !important;
  color: var(--text-primary) !important;
  transition: var(--transition-fast);
}

.section-input-bottom :deep(.q-btn:hover) {
  background-color: var(--accent-secondary) !important;
  transform: scale(1.05);
}

.channels-section {
  background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
}

.messages-section {
  background: linear-gradient(180deg, var(--bg-tertiary) 0%, var(--bg-quaternary) 100%);
}

.command-section {
  background: linear-gradient(180deg, var(--bg-quaternary) 0%, var(--bg-primary) 100%);
}

.section-header {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 8px 12px;
  border-bottom: 1px solid #999;
  flex-shrink: 0;
}

.section-content {
  flex: 1;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  padding: 8px;
  min-height: 0; 
}

.input-section .section-content {
  display: flex;
  flex-direction: column;
  padding: 0;
}

.input-content-area {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
  min-height: 0;
  background-color: #e0e0e0;
  height: 100%;
}

.input-bottom {
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.05);
  border-top: 1px solid #888;
  flex-shrink: 0;
}

.drawer-input {
  background-color: white;
  width: 100%;
}

.drawer-input .q-field__control {
  border-radius: 15px;
}

.section-content::-webkit-scrollbar {
  width: 8px;
}

.section-content::-webkit-scrollbar-track {
  background: var(--bg-secondary);
  border-radius: var(--border-radius-sm);
}

.section-content::-webkit-scrollbar-thumb {
  background: var(--accent-primary);
  border-radius: var(--border-radius-sm);
  transition: var(--transition-fast);
}

.section-content::-webkit-scrollbar-thumb:hover {
  background: var(--accent-secondary);
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

.channels-section {
  background-color: #4a5568;
}

.messages-section {
  background-color: #3a4553;
}

.input-section {
  background-color: #2d3748;
}

.q-item {
  min-height: 0 !important;
  padding: 0.75rem 1rem !important;
  border-radius: var(--border-radius-md) !important;
  margin: 0.25rem 0.5rem !important;
  transition: var(--transition-fast) !important;
  border: 1px solid transparent;
}

.q-item:hover {
  background-color: var(--bg-quaternary) !important;
  transform: translateX(4px);
  border-color: var(--border-medium);
  box-shadow: var(--shadow-sm);
}

.q-item__section {
  min-height: 0 !important;
  color: var(--text-primary);
}

:deep(.team-component) {
  color: var(--text-primary);
  font-weight: 500;
  transition: var(--transition-fast);
}

:deep(.team-component:hover) {
  color: var(--text-accent);
  text-shadow: 0 0 10px rgba(96, 165, 250, 0.5);
}
</style>