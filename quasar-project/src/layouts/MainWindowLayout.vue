<template>
  <q-layout view="hHh Lpr lff" class="full-width">
    <AppNavbar v-model:sidebarOpen="sidebarOpen" />

    <q-drawer show-if-above v-model="sidebarOpen" bordered>
      <div class="q-px-sm q-py-md full-height flex column no-wrap">
        <div class="text-h6 text-secondary text-weight-medium q-mb-md" style="line-height: 1">
          Channels
        </div>
        <q-separator />
        <div class="q-my-md" style="flex: 1; overflow-y: auto">
          <ChannelsList />
        </div>
        <q-separator />
        <div class="row gap-2 q-mt-md">
          <q-btn flat round size="sm" class="q-mr-sm" icon="settings" />
          <q-btn
            @click="channelDialogOpen = !channelDialogOpen"
            flat
            round
            size="sm"
            icon="library_add"
          />
        </div>
      </div>
    </q-drawer>

    <q-dialog v-model="channelDialogOpen" persistent>
      <q-card class="shadow-1 rounded-xl" style="min-width: 400px">
        <q-card-section class="text-h6 text-secondary">Create New Channel</q-card-section>

        <q-card-section>
          <q-input
            v-model="newChannelName"
            filled
            dense
            label="Channel Name"
            type="text"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'This field is required']"
          >
            <template v-slot:prepend>
              <q-icon size="xs" name="groups" />
            </template>
          </q-input>
          <div class="flex justify-center items-center text-weight-bold">
            <span :class="{ 'text-primary': !newChannelIsPublic }">Private</span>
            <q-toggle
              v-model="newChannelIsPublic"
              color="primary"
              checked-icon="lock_open"
              unchecked-icon="lock"
              keep-color
            />
            <span :class="{ 'text-primary': newChannelIsPublic }">Public</span>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn unelevated class="q-mr-xs" label="Add" color="primary" @click="createChannel()"/>
          <q-btn flat label="Cancel" color="secondary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppNavbar from 'components/AppNavbar.vue';
import ChannelsList from 'components/ChannelsList.vue';
import { addChannel } from 'src/misc/data';
import type { Channel } from 'src/types/channel';
export default defineComponent({
  name: 'MainWindowLayout',
  components: {
    ChannelsList,
    AppNavbar,
  },
  data() {
    return {
      sidebarOpen: true,
      channelDialogOpen: false,
      newChannelName: '',
      newChannelIsPublic: false,
    };
  },
  methods: {
    createChannel() {
      if (this.newChannelName.trim() === '') {
        return;
      }
      const newChannel: Channel = {
        id: Date.now().toString(),
        name: this.newChannelName,
        lastMessage: 'Welcome to the team, everyone!',
        lastActivity: new Date(),
        isPublic: this.newChannelIsPublic,
        isInvite: false,
        isAdmin: true,

      };
      addChannel(newChannel);
      this.newChannelName = '';
      this.newChannelIsPublic = false;
      this.channelDialogOpen = false;
    },
  },
});
</script>

<!-- 
    id: '13',
    name: 'General',
    lastMessage: 'Welcome to the team, everyone!',
    lastActivity: new Date('2025-10-20T02:10:00'),
    isPublic: true,
    isInvite: false,
    isAdmin: true, -->