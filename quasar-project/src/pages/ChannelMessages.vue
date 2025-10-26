<template>
  <q-page class="flex column full-height no-wrap">
    <div class="row items-center bg-secondary q-pa-sm">
      <div class="col text-subtitle text-weight-medium text-white flex items-center">
        {{ channel?.name }}
        <q-badge
          v-if="channel?.isAdmin"
          class="q-ml-xs gt-xs"
          outline
          color="warning"
          label="Admin"
        />
      </div>
      <div class="col text-center">
        <q-chip v-if="channel?.isPublic" icon="lock_open" :clickable="false" :ripple="false">
          Pu<span class="gt-xs">blic</span>
        </q-chip>
        <q-chip v-else icon="lock" :clickable="false" :ripple="false">
          Pr<span class="gt-xs">ivate</span>
        </q-chip>
      </div>
      <div class="col text-right">
        <q-btn
          v-if="!channel?.isInvite && !channel?.isAdmin"
          flat
          round
          size="12px"
          icon="exit_to_app"
          color="white"
          aria-label="Leave channel"
          @click="leaveChannelDialogOpen = !leaveChannelDialogOpen"
        >
          <q-tooltip class="gt-xs" anchor="top left">Leave channel</q-tooltip>
        </q-btn>
        <q-btn
          v-if="channel?.isAdmin"
          flat
          round
          size="12px"
          icon="more_vert"
          color="white"
          aria-label="Channel settings"
          @click="adminOptionsDialogOpen = !adminOptionsDialogOpen"
        >
          <q-tooltip class="gt-xs" anchor="top left">Channel settings</q-tooltip>
        </q-btn>
      </div>
    </div>

    <q-dialog v-model="adminOptionsDialogOpen" persistent>
      <q-card class="shadow-1 rounded-xl" style="min-width: min(400px, 95%)">
        <q-card-section class="text-h6 text-secondary">Channel Settings</q-card-section>
        <q-card-section>
          <div class="row justify-center items-center text-weight-bold">
            <span :class="{ 'text-primary': !isPublic }">Private</span>
            <q-toggle
              v-model="isPublic"
              color="primary"
              checked-icon="lock_open"
              unchecked-icon="lock"
              keep-color
            />
            <span :class="{ 'text-primary': isPublic }">Public</span>
          </div>
          <div class="row items-start no-wrap q-mt-md">
            <q-input
              class="col-9 q-mr-sm"
              v-model="userToAdd"
              label="New User"
              filled
              dense
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'This field is required']"
            >
              <template v-slot:prepend>
                <q-icon size="xs" name="person" />
              </template>
            </q-input>
            <q-btn
              class="col-3"
              flat
              label="Add"
              color="primary"
              size="16px"
              :disable="!userToAdd"
              @click="addUserToChannel"
            />
          </div>
          <q-btn
            class="full-width q-mt-md"
            unelevated
            label="Delete Channel"
            color="negative"
            @click="leaveChannel"
          />
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat label="Close" color="secondary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="leaveChannelDialogOpen" persistent>
      <q-card class="shadow-1 rounded-xl" style="min-width: min(400px, 95%)">
        <q-card-section class="text-h6 text-weight-regular"
          >Are you sure you want to leave this channel?</q-card-section
        >
        <q-separator />

        <q-card-actions align="right">
          <q-btn unelevated class="q-mr-xs" label="Leave" color="primary" @click="leaveChannel" />
          <q-btn flat label="Cancel" color="secondary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-scroll-area v-if="!channel?.isInvite" style="flex: 1 1 0" class="q-px-sm" ref="scrollArea">
      <div v-for="(msg, i) in tokenizedMessages" :key="msg.id">
        <q-chat-message
          :class="{ 'q-mt-md': i == 0 }"
          class="q-pr-sm"
          :sent="msg.isOwn"
          :name="msg.sender"
          :stamp="calculateTimeAgo(msg.sentAt)"
          :bg-color="
            msg.mentions.includes('jordan') && !['system', 'you'].includes(msg.sender)
              ? 'warning'
              : undefined
          "
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
              :class="{
                'text-weight-bold': token.type === 'mention',
                'bg-warning': token.type === 'mention' && msg.sender !== 'system',
                'bg-secondary': token.type === 'mention' && msg.sender === 'system',
              }"
            >
              {{ token.value }}
            </span>
          </div>
        </q-chat-message>
      </div>

      <div v-if="typingUser" class="text-primary q-mt-sm">
        {{ typingUser }} is typing...
        <q-btn flat size="sm" :label="showPreview ? 'Close' : 'View live'" @click="showPreview = !showPreview" />
      </div>

      <q-chip v-if="showPreview && (scrollToBottom(), true)" class="q-pa-sm q-mt-sm bg-grey-2">
        <div class="text-caption text-secondary">{{ typingUser }}'s draft:</div>
        <div class="text-primary">{{ liveDraft }}</div>
      </q-chip>


    </q-scroll-area>


    <div v-else class="flex column justify-center items-center col q-ma-sm" style="flex: 1">
      <q-icon name="groups" size="64px" color="primary" />
      <div class="text-h4 q-my-md text-weight-medium">
        You have been invited to <span class="text-primary">{{ channel.name }}</span>
      </div>
      <div class="text-subtitle">Accept or decline the invite bellow.</div>
      <div class="flex q-mt-md">
        <q-btn outline color="positive" label="Accept" class="q-mr-sm" @click="acceptChannel()" />
        <q-btn outline color="negative" label="Decline" @click="leaveChannel()" />
      </div>
    </div>

    <MessageField :channel="channel" @message-added="onmessageAdded" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import MessageField from 'components/MessageField.vue';
import { type Channel } from 'src/types/channel';
import { type Message } from 'src/types/message';
import { acceptChannelById, addUser, channels, messages, users } from 'src/misc/data';
import { calculateTimeAgo, tokenizeMessage } from 'src/misc/helpers';
import { leaveChannelById } from 'src/misc/data';
import { type QScrollArea } from 'quasar';
import { addMessage } from 'src/misc/data';
export default defineComponent({
  components: { MessageField },
  data() {
    return {
      exampleChannels: channels,
      channel: null as Channel | null,
      exampleMessages: <Message[]>[],
      leaveChannelDialogOpen: false,
      adminOptionsDialogOpen: false,
      userToAdd: '',
      typingUser: null as string | null, 
      liveDraft: '',                    
      showPreview: false,  
    };
  },
  methods: {
    loadChannel(channelId: string) {
      this.channel = this.exampleChannels.find((x) => x.id === channelId)!;
      this.channel.users = users.value;
      if (!this.channel.isInvite) {
        this.loadMessages();
      }
    },
    loadMessages() {
      this.exampleMessages = messages.value;
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
    acceptChannel() {
      if (this.channel) {
        acceptChannelById(this.channel.id);
        this.loadChannel(this.channel.id);
      }
    },
    changeChannelVisibility() {
      if (this.channel) {
        this.channel.isPublic = !this.channel.isPublic;
      }
    },
    scrollToBottom() {

      const el = this.$refs.scrollArea as QScrollArea | undefined;
      if (!el) return;

      const scrollEl = el.getScrollTarget();
      if (scrollEl) {
        const max = scrollEl.scrollHeight;
        el.setScrollPosition('vertical', max, 300);
      }
    },
    onmessageAdded() {
      this.scrollToBottom();
      this.simulateTyping();
    },
    addUserToChannel() {
      const name = this.userToAdd.trim();
      if (name === '') {
        return;
      }
      addUser({ email: '', nickname: name });
      this.userToAdd = '';
    },
        simulateTyping() {
      this.typingUser = 'Ed';
      this.liveDraft = 'I';
      const response = 'I personally think that VPWA is a great subject. I love building UIs with Quasar and creating awesome applications! I want to get an A in this course.';
      let index = 0;
      const typingInterval = setInterval(() => {
        this.liveDraft = response.slice(0, index);
        index++;
        if (index > response.length) {
            clearInterval(typingInterval);
            addMessage({
              id: Date.now().toString(),
              message: this.liveDraft,
              mentions: [],
              sender: this.typingUser? 'Ed' : '',
              isOwn: false,
              sentAt: new Date(),
            });
            this.scrollToBottom();
            this.typingUser = null;
            this.liveDraft = '';
            this.showPreview = false;
          }
        }, 100);

    },
  },
  watch: {
    '$route.params.id': {
      async handler(newId) {
        this.loadChannel(newId);
        await nextTick();
        this.scrollToBottom();
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
    isPublic: {
      get() {
        return this.channel?.isPublic ?? false;
      },
      set(val: boolean) {
        if (this.channel) this.channel.isPublic = val;
      },
    },
  },
  mounted() {
    const id = this.$route.params.id as string;
    this.loadChannel(id);
  },
});
</script>
