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
import AppNavbar from 'components/AppNavbar.vue';
import ChannelsList from 'components/ChannelsList.vue';

export default defineComponent({
  name: 'MainWindowLayout',
  components: {
    ChannelsList,
    AppNavbar,
  },
  data() {
    return {
      sidebarOpen: true,
    };
  },
});
</script>
