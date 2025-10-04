<template>
  <q-form @submit.prevent="login" class="q-gutter-sm q-my-lg q-pt-md text-center">
    <q-input
      v-model="email"
      filled
      dense
      label="Email"
      type="email"
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || 'This field is required',
        (val) => /^\S+@\S+\.\S+$/.test(val) || 'Invalid email format',
      ]"
    >
      <template v-slot:prepend>
        <q-icon size="xs" name="email" />
      </template>
    </q-input>
    <q-input
      v-model="password"
      filled
      dense
      label="Password"
      type="password"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'This field is required']"
    >
      <template v-slot:prepend>
        <q-icon size="xs" name="key" />
      </template>
    </q-input>
    <q-btn
      class="q-mt-md"
      type="submit"
      color="primary"
      label="Submit"
      :disabled="!isFormValid()"
    />
  </q-form>
</template>

<script lang="ts">
import { Notify } from 'quasar';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      console.log(this.email, this.password);
      if (this.email.length > 10) {
        this.$router.push('/');
      } else {
        Notify.create({
          message: 'Invalid login credentials',
          color: 'negative',
          icon: 'error',
          position: 'bottom-right',
          actions: [
            {
              color: 'white',
              rounded: true,
              icon: 'close',
              handler: () => {},
            },
          ],
        });
      }
    },
    isFormValid(): boolean {
      const pattern = /^\S+@\S+\.\S+$/;
      return this.email.length > 0 && this.password.length > 0 && pattern.test(this.email);
    },
  },
};
</script>
