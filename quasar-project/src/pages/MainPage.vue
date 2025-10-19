<template>
  <q-page class="full-heigh flex column">
    <div style="flex: 1">
      <q-icon name="forum" size="64px" color="primary" />
      <div class="text-h5 q-mt-md">Select a channel to start chatting</div>
      <div class="text-subtitle2 q-mt-sm">
        Choose one from the left sidebar or create a new channel.
      </div>
    </div>
    <MessageField />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import profilePicture from '../assets/profile-picture.png';
import MessageField from 'components/MessageField.vue';

export default defineComponent({
  name: 'MainPage',
  components: { MessageField },
  data() {
    return {};
  },
  computed: {
    profilePicture() {
      return profilePicture;
    },
  },
  methods: {
    sendMessage() {},
    formatTime(timestamp: Date): string {
      const now = new Date();
      const diff = now.getTime() - timestamp.getTime();
      const minutes = Math.floor(diff / (1000 * 60));
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      if (minutes < 1) return 'Just now';
      if (minutes < 60) return `${minutes}m`;
      if (hours < 24) return `${hours}h`;
      if (days < 7) return `${days}d`;

      return timestamp.toLocaleDateString();
    },
  },
});
</script>
