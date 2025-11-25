<template>
  <q-separator class="q-mx-sm" />
  <div v-if="commands.length" class="q-pt-sm q-pl-sm">
    <q-badge
      v-for="(command, i) in commands"
      :key="i"
      class="q-mr-sm"
      :color="!command.startsWith('/') && i == 0 ? 'red' : 'black'"
    >
      <q-icon
        v-if="!command.startsWith('/') && i == 0"
        name="warning"
        size="10px"
        class="q-mr-xs"
      />
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
    <q-btn
      icon="send"
      size="12px"
      flat
      round
      color="primary"
      class="q-ml-sm"
      @click="addMessage"
      :disable="disableButton"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { useSocketStore } from 'stores/socket';
import type { Channel } from 'src/models/Channel';
import { useAuthStore } from 'stores/auth';

export default defineComponent({
  data() {
    return {
      socketStore: useSocketStore(),
      authStore: useAuthStore(),
      newMessage: '',
    };
  },
  props: {
    channel: { type: Object as PropType<Channel | null>, required: false, default: null },
  },
  methods: {
    addMessage() {
      if (this.isMessageEmpty || (this.commands.length && !this.commands[0]!.startsWith('/'))) {
        return;
      }

      this.constructMessage();

      this.newMessage = '';
      this.$emit('message-added');
    },
    constructMessage() {
      if (this.commands.length) {
        switch (this.commands[0]) {
          case '/join': {
            this.socketStore.ws?.emit(
              'join:sent',
              this.commands[1]!,
              this.commands.length === 2,
              false,
            );
            break;
          }

          case '/invite': {
            this.socketStore.ws?.emit('invite:sent', this.channel!.id, this.commands[1]!);
            break;
          }

          case '/revoke': {
            this.socketStore.ws?.emit('revoke:sent', this.channel!.id, this.commands[1]!);
            break;
          }

          case '/kick': {
            this.socketStore.ws?.emit('kick:sent', this.channel!.id, this.commands[1]!);
            break;
          }

          case '/quit': {
            this.socketStore.ws?.emit('quit:sent', this.channel!.id);
            break;
          }

          case '/cancel': {
            this.socketStore.ws?.emit('cancel:sent', this.channel!.id);
            break;
          }

          case '/list':
            break;

          default:
            break;
        }
      }
    },
  },
  computed: {
    commands(): string[] {
      const text = this.newMessage.trim();
      if (!text.startsWith('/')) return [];

      const parts = text.split(/\s+/);
      const error = 'Invalid command, message will be sent as plain text';

      const command = parts[0];
      const args = parts.slice(1);

      switch (command) {
        case '/join':
          if (args.length === 1) {
            return parts;
          } else if (args.length === 2) {
            if (args[1] !== '[private]') {
              return [error];
            }
            return parts;
          } else {
            return [error];
          }

        case '/invite':
          if (args.length === 1) {
            if (this.channel) {
              if (!this.channel.isPublic && !this.isAdmin) {
                return ['Only admin can invite users to private channel'];
              }
              return parts;
            } else {
              return ['You need to open a channel to invite members'];
            }
          } else {
            return [error];
          }

        case '/revoke':
          if (args.length === 1) {
            if (this.channel) {
              if (this.channel.isPublic || !this.isAdmin) {
                return ['Only admin of private channel can revoke users'];
              }
              return parts;
            } else {
              return ['You need to open a channel to revoke members'];
            }
          } else {
            return [error];
          }

        case '/kick':
          if (args.length === 1) {
            if (this.channel) {
              if (!this.channel.isPublic) {
                return ['You can kick users only in public channels'];
              }
              return parts;
            } else {
              return ['You need to open a channel to kick members'];
            }
          } else {
            return [error];
          }

        case '/quit':
          if (args.length === 0) {
            if (this.channel) {
              if (!this.isAdmin) {
                return ['You have to be admin to quit a channel'];
              }
              return parts;
            } else {
              return ['You need to open a channel to quit it'];
            }
          } else {
            return [error];
          }

        case '/cancel':
          if (args.length === 0) {
            if (this.channel) {
              return parts;
            } else {
              return ['You need to open a channel to cancel it'];
            }
          } else {
            return [error];
          }

        case '/list':
          if (args.length === 0) {
            if (this.channel) {
              return parts;
            } else {
              return ['You need to open a channel to list members'];
            }
          } else {
            return [error];
          }

        default:
          return [error];
      }
    },
    mentions() {
      const text = this.newMessage.trim();
      if (text.startsWith('/') || !text.includes('@') || !this.channel || this.isInvite) return [];

      const parts = text.split(/\s+/);
      const mentions = parts.filter((x) => x.startsWith('@'));

      const users = this.channel?.users?.map((x) => '@' + x.nickname) ?? [];
      return mentions.filter((x) => users.includes(x));
    },
    isAdmin() {
      return this.channel?.users?.some((x) => x.isAdmin && x.id === this.authStore.currentUser!.id);
    },
    isInvite() {
      return this.channel?.invites?.length ?? false;
    },
    isMessageEmpty() {
      return this.newMessage.trim().length === 0;
    },
    disableButton() {
      return this.isMessageEmpty || (!this.channel && this.commands.length < 2);
    },
  },
});
</script>
