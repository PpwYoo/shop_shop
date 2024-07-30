<template>
  <div>
    <div class="menu-container">
      <div class="head">
        <div class="logo">Logo</div>
        <input type="text" placeholder="Search for products" class="search-box" v-model="searchQuery" @input="searchProducts" />
      </div>
      <hr>

      <div class="search-results" v-show="searchQuery.length > 0">
        <div v-for="product in filteredProducts" :key="product.id" class="search-result">
          <NuxtLink :to="'/product/' + product.id" @click="resetSearch" class="psearch">
            <p>🔍 &nbsp;{{ product.title }}</p>
          </NuxtLink>
        </div>
      </div>

      <nav class="menu">
        <NuxtLink to="/home" class="menu-link">Home</NuxtLink>
        <NuxtLink to="/" class="menu-link">Shop</NuxtLink>
        <NuxtLink to="/cart" class="menu-link">Cart</NuxtLink>
        <NuxtLink to="/login" class="menu-link" v-if="!isLoggedIn">Login</NuxtLink>
        <NuxtLink to="/profile" class="menu-link" v-else>Profile</NuxtLink>
      </nav>

      <div class="content">
        <slot />
      </div>

      <footer class="footer">
        <p class="footer-text">Copyright &copy; 2024 all rights reserved.</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth';
const { isLoggedIn } = useAuth();

const products = ref([]);
const filteredProducts = ref([]);
const searchQuery = ref('');

const fetchProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();
  products.value = data;
  filteredProducts.value = data;
};

const searchProducts = () => {
  const query = searchQuery.value.toLowerCase();
  filteredProducts.value = products.value.filter(product =>
    product.title.toLowerCase().includes(query)
  );
};

const resetSearch = () => {
  searchQuery.value = '';
};

onMounted(fetchProducts); 
</script>

<style scoped>
/* Mukta / Montserrat */
@import url('https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600&family=Mukta:wght@200;300;400;500;600;700;800&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.head, .menu {
  font-family: 'Mukta';
}

.menu-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.head {
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.search-box {
  width: 300px;
  padding: 5px;
  border: 1px solid #dadada;
}

hr {
  width: 90%;
  border: 1px solid #e9e9e9;
}

.search-results {
  position: absolute;
  top: calc(8%);
  right: calc(5%);
  background-color: white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  width: 500px;
  padding: 20px;
}

.search-result {
  padding: 5px;
}

.psearch {
  text-decoration: none;
  color: inherit;
  font-family: 'Montserrat';
  font-size: 14px;
}

.psearch:hover {
  color: #bfb342;
}

.menu {
  display: flex;
  gap: 20px;
}

.menu-link {
  text-decoration: none;
  font-size: 18px;
  color: black;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 4px;
}

.menu-link:hover {
  background-color: #dadada;
}

.content {
  width: 100%;
  max-width: 1200px;
  padding: 20px;
}

.footer {
  width: 1440px;
  background-color: #000000;
}

.footer-text {
  color: white;
  text-align: center;
  font-size: 14px;
}
</style>
