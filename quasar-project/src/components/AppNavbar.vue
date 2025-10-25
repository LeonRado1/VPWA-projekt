<template>
  <q-header>
    <q-toolbar class="q-px-sm">
      <q-btn flat round dense icon="menu" class="q-mr-sm" @click="toggleSidebar()" />
      <img
        style="max-width: 7.5rem"
        alt="Threadly Logo"
        src="/logo-dark.svg"
        @click="homePage"
        :style="{ cursor: 'pointer' }"
      />
      <q-space></q-space>


  <div class="q-pa-md">
      <q-btn flat round >
        <q-avatar color="secondary" size="md" text-color="white">
          {{ userStore.user?.email[0] }}
          <q-badge :color="status" rounded floating />
        </q-avatar>
        <q-menu>
          <div class="column no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md">Status</div>
            </div>
                <q-btn-toggle
                v-model="status"
                spread
                toggle-color="primary"
                unelevated
                size="sm"
                :options="options"
                class="status-toggle  column q-gutter-md"
              />
            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
            </div>
          </div>
        </q-menu>
      </q-btn>

  </div>
     
      <span class="q-ml-sm text-weight-medium">{{ userStore.user?.email }}</span>
      <q-btn icon="logout" size="12px" class="q-mx-md" @click="logout" outline label="Logout" />
      <q-btn
        flat
        round
        size="12px"
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
    const options = [
        {
          label: 'Online',
          value: 'green',
          icon: 'wifi', 
          color: 'blue',
        },
        {
          label: 'Busy',
          value: 'red',
          icon: 'notifications_active',
          color: 'blue',
        },
        {
          label: 'Away',
          value: 'orange',
          icon: 'schedule',
          color: 'blue',
        }
    ];
    return {
      userStore: useUserStore(),
      $q: useQuasar(),
      selected: 'a',
      options,
      status: 'green' 
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
