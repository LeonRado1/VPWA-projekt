import { LocalStorage } from 'quasar';
import { defineStore } from 'pinia';
import { type User } from 'src/models/User';

interface AuthState {
  user: User | null;
  token: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    user: null,
  }),
  getters: {
    currentToken: (state: AuthState) => state.token,
    currentUser: (state: AuthState) => state.user,
    isLoggedIn: (state: AuthState) => state.token !== null,
  },
  actions: {
    onInit(token: string, user: User) {
      this.token = token;
      this.user = user;
    },
    async onLogin(token: string, user: User) {
      LocalStorage.setItem('auth_token', token);

      this.token = token;
      this.user = user;

      await this.router.push('/');
    },
    async onLogout() {
      LocalStorage.removeItem('auth_token');

      this.token = null;
      this.user = null;

      await this.router.push('/auth/login');
    },
  },
});

export type AuthStoreType = ReturnType<typeof useAuthStore>;
