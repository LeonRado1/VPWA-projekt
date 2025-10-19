<template>
  <q-page class="column flex full-height">
    <div class="row items-center justify-between flex-none bg-secondary q-pa-sm">
      <q-icon name="groups" size="36px" color="white" />
      <div class="column">
        <div class="text-subtitle1 text-weight-medium text-white">
          {{ currentChatName }}
        </div>
      </div>
    </div>

    <q-scroll-area style="flex: 1 1 0">
      <div class="q-pa-sm">
        <div
          v-for="msg in messages"
          :key="msg.id"
          :class="['row items-end', msg.isOwn ? 'justify-end' : 'justify-start']"
        >
          <q-chat-message
            :text="[msg.text]"
            :sent="msg.isOwn"
            :stamp="formatTime(msg.timestamp)"
            :avatar="!msg.isOwn ? profilePicture : undefined"
            :bg-color="msg.isOwn ? 'secondary' : 'grey-4'"
            :text-color="msg.isOwn ? 'white' : 'dark'"
            class="q-mb-xs"
          />
        </div>
      </div>
    </q-scroll-area>

    <MessageField />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import profilePicture from '../assets/profile-picture.png';
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import MessageField from 'components/MessageField.vue';

interface Message {
  id: number;
  text: string;
  timestamp: Date;
  isOwn: boolean;
}

export default defineComponent({
  name: 'MainPage',
  components: { MessageField },
  data() {
    return {
      currentChatName: 'Channel name',
      newMessage: '',
      messagesContainer: null as HTMLElement | null,
      messages: [
        {
          id: 1,
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          isOwn: false,
        },
      ] as Message[],
    };
  },
  watch: {
    '$route.params.id': {
      handler(newId) {
        this.loadMessages(newId);
      },
      immediate: true,
    },
  },
  beforeRouteUpdate(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) {
    const rawId = to.params.id;
    const id = Array.isArray(rawId) ? rawId[0] : (rawId ?? '');
    this.loadMessages(id);
    next();
  },
  computed: {
    profilePicture() {
      return profilePicture;
    },
  },
  methods: {
    loadMessages(newId: string | number | string[] | undefined) {
      // CHANGE NEWID TO CORRECT TYPE
      const id = Array.isArray(newId) ? newId[0] : (newId ?? '');
      this.currentChatName = String(id);
      this.messages = [
        {
          id: 1,
          text: `Messages for ${String(this.$route.params.id)}`,
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          isOwn: false,
        },
      ] as Message[];
      console.log('Loading messages for user id:', id);
    },
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
  mounted() {
    this.messagesContainer = this.$refs.messagesContainer as HTMLElement;
  },
});
</script>
