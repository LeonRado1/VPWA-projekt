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
import { notify } from 'src/misc/helpers';
import { useUserStore } from 'src/stores/user';

export default {
  data() {
    return {
      email: '',
      password: '',
      userStore: useUserStore(),
    };
  },
  methods: {
    login() {
      console.log(this.email, this.password);
      if (this.email.length > 10) {
        this.userStore.setUser({
          email: this.email,
        });
        this.$router.push('/')
      } else {
        notify('Invalid login credentials', true);
      }
    },
    isFormValid(): boolean {
      const pattern = /^\S+@\S+\.\S+$/;
      return this.email.length > 0 && this.password.length > 0 && pattern.test(this.email);
    },
  },
};
</script>
