import { defineStore } from 'pinia';

interface AuthState {
  username: string | null;
  token: string | null;
  profile: object | null;
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): AuthState => ({
    username: null,
    token: null,
    profile: null,
  }),
  actions: {
    setUsername(username: string) {
      this.username = username;
    },
    setToken(token: string) {
      this.token = token;
    },
    setProfile(profile: object) {
      this.profile = profile;
    },
    clearAuth() {
      this.username = null;
      this.token = null;
      this.profile = null;
    },
  },
});


