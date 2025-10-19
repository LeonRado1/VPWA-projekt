<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn flat round dense icon="menu" class="q-mr-sm" @click="toggleSidebar()" />
      <img
        style="max-width: 7.5rem"
        alt="Threadly Logo"
        src="/logo-dark.svg"
        @click="homePage"
        :style="{ cursor: 'pointer' }"
      />
      <q-space></q-space>
      <span class="q-mr-md">{{ userStore.user?.email }}</span>
      <q-btn @click="logout" outline label="Logout" />
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { useUserStore } from 'stores/user';

export default {
  data() {
    return {
      userStore: useUserStore(),
    };
  },
  props: {
    sidebarOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:sidebarOpen'],
  methods: {
    logout() {
      this.userStore.setUser(null);
      this.$router.push('/auth');
    },
    homePage() {
      this.$router.push('/');
    },
    toggleSidebar() {
      this.$emit('update:sidebarOpen', !this.sidebarOpen);
    },
  },
};
</script>
