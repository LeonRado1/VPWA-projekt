<template>
  <q-separator class="q-mx-sm" />
  <div class="row items-center q-px-sm" style="padding-block: 11px">
    <q-input
      v-model="newMessage"
      placeholder="Type a message..."
      outlined
      dense
      class="col rounded-lg"
      autogrow
      :max-height="100"
    />
    <q-btn icon="send" size="12px" flat round color="primary" class="q-ml-sm" @click="addMessage"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import  { addMessage } from 'src/misc/data';
import type { Message } from 'src/types/message';
export default defineComponent({
  data() {
    return {
      newMessage: '',
    };
  },
  methods: {
    addMessage() {
      if (this.newMessage.trim().length === 0) {
        return;
      }
      const message: Message = {
        id: Date.now().toString(),
        message: this.newMessage.trim(),
        mentions: [],
        sender: 'you',
        isOwn: true,
        sentAt: new Date(),
      };
      addMessage(message);
        this.newMessage = '';
        this.$emit('message-added', message);
    },
  },
});
</script>
