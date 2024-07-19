<template>
  <div class="profile-container">
    <div v-if="authStore.profile" class="profile-info">
      <img :src="authStore.profile.img" alt="Profile Image" class="profile-image">
      <p class="profile-name">{{ authStore.profile.name }}</p>
      <div class="user-info">
        <!-- Fname and Lname -->
        <div class="info-block">
          <h5 class="title">First Name</h5>
          <p class="info">{{ authStore.profile.fname }}</p>
        </div>
        <div class="info-block">
          <h5 class="title">Last Name</h5>
          <p class="info">{{ authStore.profile.lname }}</p>
        </div>
      </div>

      <div class="user-info">
        <!-- Email and Tel -->
        <div class="info-block">
          <h5 class="title">Email</h5>
          <p class="info">{{ authStore.profile.email }}</p>
        </div>
        <div class="info-block">
          <h5 class="title">Telephone</h5>
          <p class="info">{{ authStore.profile.tel }}</p>
        </div>
      </div>
    </div>
    <button @click="logout" class="btn btn-primary">Logout</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/user';
import { useAuth } from '~/composables/useAuth';
const { logout } = useAuth();

const authStore = useAuthStore();
const router = useRouter();
const token = useCookie('token');

onMounted(() => {
  if (!token.value) {
    router.push('/login');
  }
});
</script>

<style scope>
/* Mukta / Montserrat */
@import url('https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Mukta:wght@200;300;400;500;600;700;800&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.profile-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
  font-family: 'Mukta';
}

.profile-image {
  width: 100px;
  height: 100px;
}

.profile-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-transform: uppercase;
}

.profile-info {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.user-info {
  display: flex;
  justify-content: space-around;
}

.title {
  font-size: 1rem;
  color: #555;
  margin-bottom: 5px;
  text-align: left;
}

.info {
  text-align: left;
  border: 1px solid #ddd;
  background: #fff;
  color: #797979;
  padding: 10px;
  border-radius: 5px;
  width: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Montserrat';
  font-size: 12px;
}

.btn {
  margin-top: 20px;
  border: none;
  width: 20%;
  border-radius: 5px;
  padding: 10px;
  background: #797979;
  color: white;
}

.btn:hover {
  background: #3f3f3f;
}
</style>