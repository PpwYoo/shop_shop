import { defineStore } from 'pinia';

export const useAuthStore = defineStore('user', {
  state: () => ({
    username: '',
    token: '',
    profile: {
      name: '',
      family_name: '',
      given_name: '',
      email: '',
      tel: '',
      img: 'https://cdn-icons-png.freepik.com/256/64/64572.png?semt=ais_hybrid'
    },
  }),
  actions: {
    setUsername(username: string) {
      this.username = username;
    },
    setToken(token: string) {
      this.token = token;
    },
    setProfile(profile: any) {
      this.profile = profile;
    },
    setProfileImage(base64String: string) {
      this.profile.img = base64String
      localStorage.setItem('profileImage', base64String);
    },
    loadProfileImage() {
      const storedImage = localStorage.getItem('profileImage');
      this.profile.img = storedImage || 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEidO5vwwLm34AaQMo2TVuu5Shvp3oXKv2ZaTQUB_LxV9fl5vvPcLMUexO5iFbuk-53lljprPLbdOxIMPgfNePqxndeC9HsZs2cxs5VJ_3gIiYE8LfQmPWYTwizFr3bD2gTgrZofEIc2mEVO/s200/onepiece17_doflamingo.png'
    },
    clearAuth() {
      this.username = '';
      this.token = '';
      this.profile = {
        name: '',
        family_name: '',
        given_name: '',
        email: '',
        tel: '',
        img: ''
      };
      // localStorage.removeItem('profileImage');
      // this.profile.img = '';
    }
  }
});

