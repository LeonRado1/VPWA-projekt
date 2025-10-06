<template>
  <q-form @submit.prevent="signup" class="q-gutter-sm q-my-lg q-pt-md text-center">
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
      v-model="fullName"
      filled
      dense
      label="Full Name"
      type="text"
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || 'This field is required',
        (val) => /^[A-Za-z]+( [A-Za-z]+){1,2}$/.test(val) || 'Invalid name format',
      ]"
    >
      <template v-slot:prepend>
        <q-icon size="xs" name="person" />
      </template>
    </q-input>
    <q-input
      v-model="nickname"
      filled
      dense
      label="Nickname"
      type="text"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || 'This field is required']"
    >
      <template v-slot:prepend>
        <q-icon size="xs" name="person" />
      </template>
    </q-input>
    <q-input
      v-model="password"
      filled
      dense
      label="Password"
      type="password"
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || 'This field is required',
        (val) => (val && val.length > 8) || 'Minimum 8 characters',
      ]"
    >
      <template v-slot:prepend>
        <q-icon size="xs" name="key" />
      </template>
    </q-input>
    <q-input
      v-model="confirmPassword"
      filled
      dense
      label="Confirm Password"
      type="password"
      lazy-rules
      :rules="[
        (val) => (val && val.length > 0) || 'This field is required',
        (val) => (val && val === password) || 'Passwords do not match',
      ]"
    >
      <template v-slot:prepend>
        <q-icon size="xs" name="key" />
      </template>
    </q-input>
    <div class="text-left">
      <q-checkbox v-model="termsAccepted" label="I agree to the Terms and Conditions" />
    </div>
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

export default {
  data() {
    return {
      email: '',
      fullName: '',
      nickname: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    };
  },
  methods: {
    signup() {
      console.log(
        this.email,
        this.fullName,
        this.nickname,
        this.password,
        this.confirmPassword,
        this.termsAccepted,
      );
      if (this.email.length > 10) {
        this.$router.push('/');
      } else {
        notify('Nickname is already in use', true);
      }
    },
    isFormValid(): boolean {
      const emailPattern = /^\S+@\S+\.\S+$/;
      const fullNamePattern = /^[A-Za-z]+( [A-Za-z]+){1,2}$/;

      const isFilled = [
        this.email,
        this.fullName,
        this.nickname,
        this.password,
        this.confirmPassword,
        this.termsAccepted,
      ].every((val) => val);

      const doPasswordsMatch = this.password === this.confirmPassword;
      const isFormatCorrect = emailPattern.test(this.email) && fullNamePattern.test(this.fullName);

      return isFilled && doPasswordsMatch && isFormatCorrect;
    },
  },
};
</script>
