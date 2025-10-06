import { defineStore } from 'pinia';
import { type User } from 'src/types/user';

export const useUserStore = defineStore('userStore', {
  state: (): { user: User | null } => ({
    user: null,
  }),
  getters: {},
  actions: {
    setUser(user: User | null) {
      this.user = user;
    },
  },
});
