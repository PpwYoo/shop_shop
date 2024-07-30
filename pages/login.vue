<template>
  <div class="login-container">
    <img src="https://cdn-icons-png.freepik.com/256/64/64572.png?semt=ais_hybrid" alt="">
    <form @submit.prevent="onSubmit" class="login-form">
      <div class="form-group">
        <input id="username" v-model="username" type="text" class="form-input" placeholder="Username" />
      </div>
      <div class="form-group">
        <input id="password" v-model="password" type="password" class="form-input" placeholder="Password" />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      <p v-if="error">{{ error }}</p>
      <p v-if="successMessage">{{ successMessage }}</p>
    </form>

    <br>
    <button @click="googleSignIn" class="google">Sign in with Google</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/user';

const username = ref('');
const password = ref('');
const error = ref('');
const successMessage = ref('');
const router = useRouter();
const authStore = useAuthStore();
const cookie = useCookie('token');

const onSubmit = async () => {
  error.value = '';
  successMessage.value = '';

  const encodedPassword = btoa(password.value);

  try {
    const response = await $fetch('/api/login', {
      method: 'POST',
      body: { username: username.value, password: encodedPassword },
    });

    if (response.success) {
      cookie.value = response.token;
      authStore.setToken(response.token);
      successMessage.value = response.message;

      router.push('/profile');
    } else {
      error.value = response.message || 'Login failed';
    }

  } catch (e) {
    error.value = e.data.message || 'An error occurred';
  }
};

// Google Sign In
const googleSignIn = () => {
  const clientId = '200524597847-unr59avncneb3pdekku6e9k21ksa0n8s.apps.googleusercontent.com';
  const redirectUri = encodeURIComponent('http://localhost:3000/login');
  const scope = 'profile email';
  const responseType = 'token';

  const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;
  
  window.location.href = authUrl;
};

const handleAuthResponse = async () => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');

  if (accessToken) {
    console.log('Access Token:', accessToken);
    cookie.value = accessToken;
    authStore.setToken(accessToken);

    await fetchUserProfile(accessToken);
    router.push('/profile');
  }
};

const fetchUserProfile = async (accessToken) => {
  try {
    const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`);

    if(!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
    const profile = await response.json();
    authStore.setUser(profile);

  } catch (e) {
    error.value = 'Failed to fetch user profile';
  }
};

onMounted(() => {
  handleAuthResponse();
});
</script>

<style scoped>
/* Mukta / Montserrat */
@import url('https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Mukta:wght@200;300;400;500;600;700;800&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.login-container{
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: 'Mukta';
}

.form-group{
  margin-bottom: 15px;
}

.form-input{
  width: 75%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.btn{
  width: auto; 
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-top: 10px; 
}

.btn:hover{
  background-color: #5b5b5b;
  color: white;
}

img{
  width: 100px;
  margin-bottom: 20px;
}

.google{
  border: none;
  background: none;
}

.google:hover{
  color: green;
  font-weight: bolder;
}
</style>