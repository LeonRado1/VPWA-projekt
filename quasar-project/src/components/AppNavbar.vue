<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn flat round dense icon="menu" class="q-mr-sm" />
      <img style="max-width: 7.5rem" alt="Threadly Logo" src="/logo-dark.svg" />
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
  methods: {
    logout() {
      this.userStore.setUser(null);
      this.$router.push('/auth');
    },
  },
};
</script>
