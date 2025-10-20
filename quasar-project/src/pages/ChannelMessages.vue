<template>
  <q-page class="flex column full-height">
    <div class="row no-wrap items-center bg-secondary q-pa-sm">
      <div class="col no-wrap text-subtitle text-weight-medium text-white">
        {{ channel?.name }}
        <q-avatar
          v-if="channel?.isAdmin"
          class="q-ml-xs"
          icon="local_police"
          size="xs"
          color="warning"
        />
      </div>
      <div class="col no-wrap text-center">
        <q-chip v-if="channel?.isPublic" icon="lock" :clickable="false" :ripple="false">
          Public
        </q-chip>
        <q-chip v-else icon="lock" :clickable="false" :ripple="false">Private</q-chip>
      </div>
      <div class="col no-wrap text-right">
        <q-btn flat round size="12px" icon="more_vert" color="white" />
      </div>
    </div>

    <q-scroll-area v-if="!channel?.isInvite" style="flex: 1 1 0" class="q-px-sm">
      <div v-for="(msg, i) in tokenizedMessages" :key="msg.id">
        <q-chat-message :class="{ 'q-mt-md': i == 0 }" class="q-px-sm" :sent="msg.isOwn">
          <div class="message-body">
            <span
              v-for="(token, i) in msg.tokens"
              :key="i"
              :class="{ 'text-weight-bold color bg-warning': token.type === 'mention' }"
            >
              {{ token.value }}
            </span>
          </div>
        </q-chat-message>
      </div>
    </q-scroll-area>

    <div v-else class="flex column justify-center items-center" style="flex: 1">
      <q-icon name="forum" size="64px" color="primary" />
      <div class="text-h4 q-my-md text-weight-medium">Select a channel to start chatting</div>
      <div class="text-subtitle">Choose one from the left sidebar or create a new channel.</div>
    </div>

    <MessageField />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MessageField from 'components/MessageField.vue';
import { type Channel } from 'src/types/channel';
import { type Message } from 'src/types/message';
import { channels, messages } from 'src/misc/data';
import { tokenizeMessage } from 'src/misc/helpers';

export default defineComponent({
  components: { MessageField },
  data() {
    return {
      exampleChannels: channels,
      channel: null as Channel | null,
      exampleMessages: [] as Message[],
    };
  },
  methods: {
    loadChannel(channelId: string) {
      this.channel = this.exampleChannels.find((x) => x.id === channelId)!;
      if (!this.channel.isInvite) {
        this.loadMessages();
      }
    },
    loadMessages() {
      this.exampleMessages = messages;
    },
  },
  watch: {
    '$route.params.id': {
      handler(newId) {
        this.loadChannel(newId);
      },
      immediate: true,
    },
  },
  computed: {
    tokenizedMessages() {
      return this.exampleMessages.map((x) => ({
        ...x,
        tokens: tokenizeMessage(x),
      }));
    },
  },
  mounted() {
    const id = this.$route.params.id as string;
    this.loadChannel(id);
  },
});
</script>
