<template>
  <q-separator class="q-mx-sm" />
  <div v-if="commands.length" class="q-pt-sm q-pl-sm">
    <q-badge v-for="(command, i) in commands" :key="i" color="black" class="q-mr-sm">
      {{ command }}
    </q-badge>
  </div>
  <div v-if="mentions.length" class="q-pt-sm q-pl-sm">
    <q-badge v-for="(mention, i) in mentions" :key="i" color="warning" class="q-mr-sm">
      {{ mention }}
    </q-badge>
  </div>
  <div class="row items-center q-px-sm" style="padding-block: 11px">
    <q-input
      v-model="newMessage"
      placeholder="Type a message..."
      outlined
      dense
      class="col rounded-lg"
      autogrow
      :max-height="100"
      @keydown.enter.exact.prevent="addMessage"
    />
    <q-btn icon="send" size="12px" flat round color="primary" class="q-ml-sm" @click="addMessage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { addChannel, addMessage, leaveChannelById } from 'src/misc/data';
import type { Message } from 'src/types/message';
import { type Channel } from 'src/types/channel';

export default defineComponent({
  data() {
    return {
      newMessage: '',
    };
  },
  props: {
    channel: { type: Object as PropType<Channel | null>, required: false, default: null },
  },
  methods: {
    async addMessage() {
      if (this.newMessage.trim().length === 0) {
        return;
      }

      await this.constructMessage();

      this.newMessage = '';
      this.$emit('message-added');
    },
    async constructMessage() {
      if (this.commands.length) {
        switch (this.commands[0]) {
          case '/join': {
            const newChannel: Channel = {
              id: Date.now().toString(),
              name: this.commands[1]!,
              lastActivity: new Date(),
              isPublic: this.commands.length === 2,
              isInvite: false,
              isAdmin: true,
            };
            addChannel(newChannel);
            break;
          }

          case '/invite':
          case '/revoke':
          case '/kick':
            break;

          case '/quit':
          case '/cancel':
            leaveChannelById(this.channel!.id);
            await this.$router.push('/');
            break;

          case '/list': {
            const message: Message = {
              id: Date.now().toString(),
              message: this.channel!.users!.map((x) => '@' + x.nickname!).join(' '),
              mentions: this.channel!.users!.map((x) => x.nickname!),
              sender: 'system',
              isOwn: true,
              sentAt: new Date(),
            };
            addMessage(message);
          }
        }
      } else {
        const message: Message = {
          id: Date.now().toString(),
          message: this.newMessage.trim(),
          mentions: this.mentions.map((x) => x.slice(1)),
          sender: 'you',
          isOwn: true,
          sentAt: new Date(),
        };
        addMessage(message);
      }
    },
  },
  computed: {
    commands(): string[] {
      const text = this.newMessage.trim();
      if (!text.startsWith('/')) return [];

      const parts = text.split(/\s+/);
      const command = parts[0];
      const args = parts.slice(1);

      switch (command) {
        case '/join':
          if (args.length === 1) {
            return parts;
          } else if (args.length === 2) {
            if (args[1] !== '[private]') {
              return [];
            }
            return parts;
          } else {
            return [];
          }

        case '/invite':
        case '/revoke':
        case '/kick':
          if (args.length === 1 && this.channel && !this.channel.isInvite) {
            return parts;
          } else {
            return [];
          }

        case '/quit':
        case '/cancel':
        case '/list':
          if (args.length === 0 && this.channel && !this.channel.isInvite) {
            return parts;
          } else {
            return [];
          }

        default:
          return [];
      }
    },
    mentions() {
      const text = this.newMessage.trim();
      if (text.startsWith('/') || !this.channel || this.channel.isInvite) return [];

      const parts = text.split(/\s+/);
      const mentions = parts.filter((x) => x.startsWith('@'));

      const users = this.channel.users?.map((x) => '@' + x.nickname) ?? [];
      return mentions.filter((x) => users.includes(x));
    },
  },
});
</script>
