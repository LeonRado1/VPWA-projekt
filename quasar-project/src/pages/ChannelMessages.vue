<template>
  <q-page class="flex column full-height no-wrap">
    <div class="row items-center bg-secondary q-pa-sm">
      <div class="col text-subtitle text-weight-medium text-white flex items-center">
        {{ channel?.name }}
        <q-badge v-if="channel?.isAdmin" class="q-ml-xs" outline color="warning" label="Admin" />
      </div>
      <div class="col text-center">
        <q-chip v-if="channel?.isPublic" icon="lock_open" :clickable="false" :ripple="false">
          Public
        </q-chip>
        <q-chip v-else icon="lock" :clickable="false" :ripple="false">Private</q-chip>
      </div>
      <div class="col text-right">
        <q-btn flat round size="12px" icon="exit_to_app" color="white" aria-label="Leave channel" @click="leaveChannelDialogOpen = !leaveChannelDialogOpen">
          <q-tooltip anchor="top middle">Leave channel</q-tooltip>
        </q-btn>
      </div>
    </div>
    <q-dialog v-model="leaveChannelDialogOpen" persistent>
      <q-card class="shadow-1 rounded-xl" style="min-width: 400px">
        <q-card-section class="text-h6 text-secondary">Are you sure you want to leave this channel?</q-card-section>
        <q-separator />

        <q-card-actions align="right">
          <q-btn unelevated class="q-mr-xs" label="Leave" color="primary" @click="leaveChannel" />
          <q-btn flat label="Cancel" color="secondary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-scroll-area v-if="!channel?.isInvite" style="flex: 1 1 0" class="q-px-sm">
      <div v-for="(msg, i) in tokenizedMessages" :key="msg.id">
        <q-chat-message
          :class="{ 'q-mt-md': i == 0 }"
          class="q-pr-sm"
          :sent="msg.isOwn"
          :name="msg.sender"
          :stamp="calculateTimeAgo(msg.sentAt)"
        >
          <template v-slot:avatar v-if="!msg.isOwn">
            <q-avatar color="secondary" class="q-mr-md" size="lg" text-color="white">
              {{ msg.sender[0] }}
              <q-badge
                :color="i % 3 == 0 ? 'positive' : i % 3 == 1 ? 'negative' : 'secondary'"
                rounded
                floating
              />
            </q-avatar>
          </template>
          <div>
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

    <div v-else class="flex column justify-center items-center col" style="flex: 1">
      <q-icon name="groups" size="64px" color="primary" />
      <div class="text-h4 q-my-md text-weight-medium">
        You have been invited to <span class="text-primary">{{ channel.name }}</span>
      </div>
      <div class="text-subtitle">Accept or decline the invite bellow.</div>
      <div class="flex q-mt-md">
        <q-btn outline color="positive" label="Accept" class="q-mr-sm" />
        <q-btn outline color="negative" label="Decline" />
      </div>
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
import { calculateTimeAgo, tokenizeMessage } from 'src/misc/helpers';
import { leaveChannelById } from 'src/misc/data';
export default defineComponent({
  components: { MessageField },
  data() {
    return {
      exampleChannels: channels,
      channel: null as Channel | null,
      exampleMessages: [] as Message[],
      leaveChannelDialogOpen: false,
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
    calculateTimeAgo(date: Date) {
      return calculateTimeAgo(date);
    },
    async leaveChannel() {
      if (this.channel) {
        leaveChannelById(this.channel.id);
        await this.$router.push('/');
      }
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
