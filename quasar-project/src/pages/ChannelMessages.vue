<template>
  <q-page v-if="channel" class="flex column full-height no-wrap">
    <div class="row items-center bg-secondary q-pa-sm">
      <div class="col text-subtitle text-weight-medium text-white flex items-center">
        {{ channel.name }}
        <q-badge v-if="isAdmin" class="q-ml-xs gt-xs" outline color="warning" label="Admin" />
      </div>
      <div class="col text-center">
        <q-chip v-if="channel.isPublic" icon="lock_open" :clickable="false" :ripple="false">
          Pu<span class="gt-xs">blic</span>
        </q-chip>
        <q-chip v-else icon="lock" :clickable="false" :ripple="false">
          Pr<span class="gt-xs">ivate</span>
        </q-chip>
      </div>
      <div class="col text-right">
        <q-btn
          v-if="!isAdmin && !isInvite"
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
          v-if="isAdmin"
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
            <span :class="{ 'text-primary': !channel.isPublic }">Private</span>
            <q-toggle
              v-model="channel.isPublic"
              color="primary"
              checked-icon="lock_open"
              unchecked-icon="lock"
              keep-color
            />
            <span :class="{ 'text-primary': channel.isPublic }">Public</span>
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

    <q-scroll-area v-if="!isInvite" style="flex: 1 1 0" class="q-px-sm" ref="scrollArea">
      <!--
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


          <div v-if="false" class="text-primary q-mt-sm">
            {{ typingUser }} is typing...
            <q-btn
              flat
              size="sm"
              :label="showPreview ? 'Close' : 'View live'"
              @click="showPreview = !showPreview"
            />
          </div>


          <q-chip v-if="false" class="q-pa-sm q-mt-sm bg-grey-2">
            <div class="text-caption text-secondary">{{ typingUser }}'s draft:</div>
            <div class="text-primary">{{ liveDraft }}</div>
          </q-chip>

    -->
      <div v-for="(msg) in messages" :key="msg.id" class="q-mb-sm">
          <q-chat-message
          :sent="msg.userId === authStore.currentUser?.id"
          :name="getUserName(msg.userId)"
          :stamp="calculateTimeAgo(msg.sentAt)"
          :text="[msg.content]"
        />
      </div>
    </q-scroll-area>

    <div
      v-if="isInvite"
      class="flex column justify-center items-center col q-ma-sm"
      style="flex: 1"
    >
      <q-icon name="groups" size="64px" color="primary" />
      <div class="text-h4 q-my-md text-weight-medium">
        You have been invited to <span class="text-primary">{{ channel.name }}</span>
      </div>
      <div class="text-subtitle">Accept or decline the invite bellow.</div>
      <div class="flex q-mt-md">
        <q-btn outline color="positive" label="Accept" class="q-mr-sm" @click="acceptInvite" />
        <q-btn outline color="negative" label="Decline" @click="rejectInvite" />
      </div>
    </div>

    <MessageField :channel="channel" @message-added="onmessageAdded" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import { calculateTimeAgo, notify } from 'src/misc/helpers';
import { type QScrollArea } from 'quasar';
import { type ChannelsStoreType, useChannelsStore } from 'stores/channels';
import { type SocketStoreType, useSocketStore } from 'stores/socket';
import { getChannel } from 'src/services/channelService';
import { type Channel } from 'src/models/Channel';
import { type AuthStoreType, useAuthStore } from 'stores/auth';
import MessageField from 'components/MessageField.vue';
import { getMessages } from 'src/services/messageService';
interface EventMap {
  [event: string]: (...args: any[]) => void | Promise<void>;
}

interface ChannelMessagesState {
  channelsStore: ChannelsStoreType;
  authStore: AuthStoreType;
  socketStore: SocketStoreType;
  channel: Channel | null;
  leaveChannelDialogOpen: boolean;
  adminOptionsDialogOpen: boolean;
  userToAdd: string;
  listeners: EventMap;
  messages: any[];
}

export default defineComponent({
  components: { MessageField },
  data(): ChannelMessagesState {
    return {
      channelsStore: useChannelsStore(),
      authStore: useAuthStore(),
      socketStore: useSocketStore(),
      channel: null,
      leaveChannelDialogOpen: false,
      adminOptionsDialogOpen: false,
      userToAdd: '',
      listeners: {},
      messages: [] as any[],

    };
  },
  methods: {
    async loadChannel(channelId: string) {
      const response = await getChannel(channelId);
       const msgs = await getMessages(channelId);
      if (msgs.success) {
        this.messages = msgs.data.map((m: any) => ({
          ...m,
          sentAt: new Date(m.sentAt)
        }))
       console.log("nove spravy:" , msgs);

        await nextTick()
        this.scrollToBottom()
        this.socketStore.ws?.emit('message:join', channelId);

      }
      if (response.success) {
        this.channel = response.data!;
        console.log(this.channel);
      } else {
        notify(response.message!, true);
      }
    },
      getUserName(userId: number) {
    return this.channel?.users?.find(u => u.id === userId)?.nickname ?? 'Unknown';
  },
    calculateTimeAgo(date: Date) {
      return calculateTimeAgo(date);
    },
    async leaveChannel() {},
    acceptInvite() {
      this.socketStore.ws?.emit('invite:accept', this.channel?.invites?.[0]?.id);
    },
    rejectInvite() {
      this.socketStore.ws?.emit('invite:reject', this.channel?.invites?.[0]?.id);
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
    onmessageAdded() {},
    addUserToChannel() {},
    initializeListeners() {
      this.listeners['invite:accepted'] = async (channel: Channel) => {
        this.channelsStore.addOrUpdateChannel(channel);
        await this.loadChannel(channel.id);
      };

      this.listeners['invite:rejected'] = async (channel: Channel) => {
        this.channelsStore.removeChannel(channel.id);
        await this.$router.push('/');
      };

       this.listeners['message:new'] = async (msg) => {
      this.messages.push({
        ...msg,
        sentAt: new Date(msg.sentAt)
    });
    await nextTick();
    this.scrollToBottom();
  };
    },
    subscribe() {
      Object.keys(this.listeners).forEach((event) => {
        this.socketStore.ws?.on(event, this.listeners[event]!);
      });
    },
    unsubscribe() {
      Object.keys(this.listeners).forEach((event) => {
        this.socketStore.ws?.off(event, this.listeners[event]!);
      });
    },
  },
  watch: {
    '$route.params.id': {
      async handler(newId) {
        await this.loadChannel(newId);
        await nextTick();
        this.scrollToBottom();
      },
      immediate: true,
    },
  },
  computed: {
    tokenizedMessages() {
      return [];
    },
    isAdmin() {
      return this.channel?.users?.some((x) => x.isAdmin && x.id === this.authStore.currentUser!.id);
    },
    isInvite() {
      return this.channel?.invites?.length ?? false;
    },
  },
  async created() {
    const id = this.$route.params.id as string;
    await this.loadChannel(id);

    this.initializeListeners();
    this.subscribe();
   
  },
  beforeUnmount() {
    this.unsubscribe();
  },
});
</script>
