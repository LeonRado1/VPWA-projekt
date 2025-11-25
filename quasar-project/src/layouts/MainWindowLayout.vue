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
          <q-btn
            flat
            round
            size="sm"
            class="q-mr-sm"
            icon="settings"
            @click="settingsDialogOpen = !settingsDialogOpen"
          />
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

    <q-dialog v-model="settingsDialogOpen" persistent>
      <q-card class="shadow-1 rounded-xl" style="min-width: min(400px, 95%)">
        <q-card-section class="text-h6 text-secondary">Notifications</q-card-section>
        <q-card-section>
          <div class="flex justify-center items-center text-weight-bold">
            <span :class="{ 'text-primary': !notificationSwitch }">All</span>
            <q-toggle
              v-model="notificationSwitch"
              color="primary"
              keep-color
              checked-icon="notifications_off"
              unchecked-icon="notifications"
            />
            <span :class="{ 'text-primary': notificationSwitch }">Mentions</span>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn unelevated class="q-mr-xs" label="Save" color="primary" />
          <q-btn flat label="Close" color="secondary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="channelDialogOpen" persistent>
      <q-card class="shadow-1 rounded-xl" style="min-width: min(400px, 95%)">
        <q-card-section class="text-h6 text-secondary">Create New Channel</q-card-section>

        <q-card-section>
          <q-input
            v-model="form.name"
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
            <span :class="{ 'text-primary': !form.isPublic }">Private</span>
            <q-toggle
              v-model="form.isPublic"
              color="primary"
              checked-icon="lock_open"
              unchecked-icon="lock"
              keep-color
            />
            <span :class="{ 'text-primary': form.isPublic }">Public</span>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn unelevated class="q-mr-xs" label="Add" color="primary" @click="createChannel()" />
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
import { type ChannelsStoreType, useChannelsStore } from 'stores/channels';
import { type ChannelPayload } from 'src/models/Channel';
import { type SocketStoreType, useSocketStore } from 'stores/socket';

interface MainWindowLayoutState {
  form: ChannelPayload;
  channelsStore: ChannelsStoreType;
  socketStore: SocketStoreType;
  channelDialogOpen: boolean;
  settingsDialogOpen: boolean;
  notificationSwitch: boolean;
  sidebarOpen: boolean;
}

export default defineComponent({
  name: 'MainWindowLayout',
  components: {
    ChannelsList,
    AppNavbar,
  },
  data(): MainWindowLayoutState {
    return {
      form: {
        name: '',
        isPublic: false,
      },
      channelsStore: useChannelsStore(),
      socketStore: useSocketStore(),
      channelDialogOpen: false,
      settingsDialogOpen: false,
      notificationSwitch: false,
      sidebarOpen: true,
    };
  },
  methods: {
    createChannel() {
      this.socketStore.ws?.emit('join:sent', this.form.name, this.form.isPublic, true);
      this.channelDialogOpen = false;
    },
  },
  watch: {
    channelDialogOpen(newValue) {
      if (!newValue) {
        this.form = {
          name: '',
          isPublic: false,
        };
      }
    },
  },
});
</script>
