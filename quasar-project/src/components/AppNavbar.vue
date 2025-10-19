<template>
  <q-header>
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
      <q-avatar color="accent" size="md" text-color="white">
        {{ userStore.user?.email[0] }}
      </q-avatar>
      <span class="q-ml-sm text-weight-medium">{{ userStore.user?.email }}</span>
      <q-btn icon="logout" class="q-mx-md" @click="logout" outline label="Logout" />
      <q-btn
        flat
        round
        :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
        @click="toggleDarkMode"
      />
    </q-toolbar>
  </q-header>
</template>

<script lang="ts">
import { useUserStore } from 'stores/user';
import { useQuasar } from 'quasar';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      userStore: useUserStore(),
      $q: useQuasar(),
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
    async logout() {
      this.userStore.setUser(null);
      await this.$router.push('/auth');
    },
    async homePage() {
      await this.$router.push('/');
    },
    toggleSidebar() {
      this.$emit('update:sidebarOpen', !this.sidebarOpen);
    },
    toggleDarkMode() {
      this.$q.dark.toggle();
    },
  },
});
</script>
