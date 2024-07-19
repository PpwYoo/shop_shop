import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '~/stores/user';

const isLoggedIn = ref(false);

export function useAuth() {
  const router = useRouter();
  const authStore = useAuthStore();
  const cookie = useCookie('token');

  const checkLoginStatus = async () => {
    const token = cookie.value;

    if (token) {
      try {
        const response = await fetch('/api/auth');
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const responseData = await response.json();
        const username = responseData.username;
        
        if (!username) {
          throw new Error('Username not found in response');
        }

        authStore.setUsername(username);
        authStore.setToken(token);

        const mockProfile = {
          name: username,
          fname: 'First',
          lname: 'Last',
          email: `${username}@gmail.com`,
          tel: '012-345-6789',
          img: 'https://cdn-icons-png.freepik.com/256/64/64572.png?semt=ais_hybrid'
        };
        authStore.setProfile(mockProfile);
        isLoggedIn.value = true;
      } catch (error) {
        console.error('Invalid token', error);
        isLoggedIn.value = false;
        authStore.clearAuth();
        router.push('/login');
      }
    } else {
      authStore.clearAuth();
      isLoggedIn.value = false;
      router.push('/login');
    }
  };

  onMounted(() => {
    checkLoginStatus();
  });

  const login = (token: string, user: string) => {
    isLoggedIn.value = true;
    cookie.value = token;
    authStore.setUsername(user);
  };

  const logout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to logout');
      }
      const data = await response.json();
      if (data.success) {
        isLoggedIn.value = false;
        authStore.clearAuth();
        cookie.value = null;
        router.push('/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    isLoggedIn,
    login,
    logout,
  };
}




