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
    <q-badge
      v-for="(mention, i) in mentions"
      :key="i"
      color="warning"
      class="q-mr-sm"
    >
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
import { defineComponent, type PropType } from "vue";
import { useSocketStore } from "stores/socket";
import type { Channel } from "src/models/Channel";
import { useAuthStore } from "stores/auth";

export default defineComponent({
  props: {
    channel: {
      type: Object as PropType<Channel | null>,
      required: false,
      default: null,
    },
  },

  data() {
    return {
      socketStore: useSocketStore(),
      authStore: useAuthStore(),
      newMessage: "",
    };
  },

  mounted() {
    const socket = this.socketStore.ws;

    if (!socket) return;

    if (this.channel?.id) {
      socket.emit("message:join", this.channel.id);
    }

    socket.on("message", (msg) => {
      this.$emit("message-received", msg);
    });
  },

  methods: {
    addMessage() {
      if (this.isMessageEmpty || (this.commands.length && !this.commands[0]!.startsWith("/"))) {
        return;
      }

      this.constructMessage();
      this.newMessage = "";

      this.$emit("message-added");
    },

    constructMessage() {
      const socket = this.socketStore.ws;

      if (!socket) return;

      // ak ide o WS príkaz (/join /invite ...)
      if (this.commands.length) {
        switch (this.commands[0]) {
          case "/join":
            socket.emit("join:sent", this.commands[1]!, this.commands.length === 2, false);
            break;

          case "/invite":
            socket.emit("invite:sent", this.channel!.id, this.commands[1]!);
            break;

          case "/revoke":
            socket.emit("revoke:sent", this.channel!.id, this.commands[1]!);
            break;

          case "/kick":
            socket.emit("kick:sent", this.channel!.id, this.commands[1]!);
            break;

          case "/quit":
            socket.emit("quit:sent", this.channel!.id);
            break;

          case "/cancel":
            socket.emit("cancel:sent", this.channel!.id);
            break;

          default:
            break;
        }
      } else {
        socket.emit("message:send", {
          channelId: this.channel!.id,
          content: this.newMessage.trim(),
          mentions: this.mentions,
        });
       
      }
    },
  },

  computed: {
    commands(): string[] {
      const text = this.newMessage.trim();
      if (!text.startsWith("/")) return [];

      const parts = text.split(/\s+/);
      const error = "Invalid command, message will be sent as plain text";

      const command = parts[0];
      const args = parts.slice(1);
      console.log(command)
      switch (command) {
        case "/join":
          if (args.length === 1) return parts;
          if (args.length === 2 && args[1] === "[private]") return parts;
          return [error];

        case "/invite":
          if (!this.channel) return ["You need to open a channel to invite members"];
          if (!this.channel.isPublic && !this.isAdmin)
            return ["Only admin can invite users to private channel"];
          if (args.length === 1) return parts;
          return [error];

        case "/revoke":
          if (!this.channel) return ["You need to open a channel to revoke members"];
          if (this.channel.isPublic || !this.isAdmin)
            return ["Only admin of private channel can revoke users"];
          if (args.length === 1) return parts;
          return [error];

        case "/kick":
          if (!this.channel) return ["You need to open a channel to kick members"];
          if (!this.channel.isPublic) return ["You can kick users only in public channels"];
          if (args.length === 1) return parts;
          return [error];

        case "/quit":
          if (!this.channel) return ["You need to open a channel to quit it"];
          if (!this.isAdmin) return ["You have to be admin to quit a channel"];
          if (args.length === 0) return parts;
          return [error];

        case "/cancel":
          if (!this.channel) return ["You need to open a channel to cancel it"];
          if (args.length === 0) return parts;
          return [error];

        case "/list":
          if (!this.channel) return ["You need to open a channel to list members"];
          if (args.length === 0) return parts;
          return [error];

        default:
          return [error];
      }
    },

    mentions() {
      const text = this.newMessage.trim();
      if (text.startsWith("/") || !text.includes("@") || !this.channel || this.isInvite)
        return [];

      const parts = text.split(/\s+/);
      const mentions = parts.filter((x) => x.startsWith("@"));

      const users = this.channel?.users?.map((x) => "@" + x.nickname) ?? [];
      return mentions.filter((x) => users.includes(x));
    },

    isAdmin() {
      return this.channel?.users?.some(
        (x) => x.isAdmin && x.id === this.authStore.currentUser!.id
      );
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
