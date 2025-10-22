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
    <q-btn icon="send" size="12px" flat round color="primary" class="q-ml-sm" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      newMessage: '',
    };
  },
});
</script>
