<template>
  <div>
    <!-- img cover -->
    <img src="https://assets-static.invideo.io/images/large/Creative_Clothing_Advertisement_Ideas_To_Boost_Sales_revised_3_1_cefa9cda88.png" style="height: 400px; width: 100%; margin-bottom: 50px;" alt="">
    <div class="grid-container">
      <!-- category -->
      <div class="grid-item">
        <div class="item1">
          <div class="head-list">
            <p style="font-weight: bolder; font-size: 18px;">SHOP BY</p>
          </div>

          <!-- category -->
          <div class="shopby-title">
            <div style="margin-bottom: 10px;">CATEGORY</div>
            <div class="cat-detail">
              <label style="display: block; margin-bottom: 10px;"><input type="radio" value="all" v-model="selectedCategory" @change="filterProducts" /> All</label>
              <label style="display: block; margin-bottom: 10px;"><input type="radio" value="men's clothing" v-model="selectedCategory" @change="filterProducts" />Men's Clothing</label>
              <label style="display: block; margin-bottom: 10px;"><input type="radio" value="women's clothing" v-model="selectedCategory" @change="filterProducts" />Women's Clothing</label>
              <label style="display: block; margin-bottom: 10px;"><input type="radio" value="jewelery" v-model="selectedCategory" @change="filterProducts" /> Jewelery</label>
              <label style="display: block; margin-bottom: 10px;"><input type="radio" value="electronics" v-model="selectedCategory" @change="filterProducts" /> Electronics</label>
            </div>
          </div>

          <hr style="margin: 0px 15px 15px 15px;">
          
          <!-- price -->
          <div class="shopby-title">
            PRICE <br><br>
            <div class="price-detail">
              <button @click="sortByPrice('desc')">Max - Min</button>
              <button @click="sortByPrice('asc')">Min - Max</button>
            </div>
            <div>
              <input type="range" min="1" max="1000" step="0.01" class="slider" v-model="sliderValue" @input="updateSliderValue">
              <p style="text-align: center; margin-top: 0%; color: #7f7f7f;">$1.00 - ${{ sliderValue }}</p>
            </div>
          </div>

          <hr style="margin: 30px 15px 15px 15px;">

          <!-- color -->
          <div class="shopby-title">
            COLOR
            <div class="grid-container-color">
              <div style="font-weight: normal; color: #474747;">
                <p>🟥 &nbsp; Red</p>
                <p>🟩 &nbsp; Green</p>
                <p>🟧 &nbsp; Orange</p>
                <p>⬛️ &nbsp; Black</p>
              </div>
              <div style="font-weight: normal; color: #474747;">
                <p>🟦 &nbsp; Blue</p>
                <p>🟨 &nbsp; Yellow</p>
                <p>🟪 &nbsp; Purple</p>
                <p>⬜️ &nbsp; White</p>
              </div>
            </div>
          </div>
        </div>

        <br><br><br>
        <!-- best sellers -->
        <div class="head-list">
          <p style="font-weight: bolder; font-size: 18px;">BEST SELLERS</p>
        </div>
        <br>
        <div>
          <div v-for="product in products.slice(0, 3)" :key="product.id" style="display: flex;">
            <img :src="product.image" alt="" class="product-bsell">
            <div>
              <p class="product-title" style="text-align: left; margin-left: 20px;"><b>{{ product.title }}</b></p>
              <p class="product-price" style="text-align: left; margin-left: 20px;"><b>${{ product.price }}</b></p>
            </div>
          </div>
        </div>

      </div>

      <!-- products -->
      <div class="grid-item item2">
        <div class="products-container">
          <NuxtLink :to="'/product/' + product.id" class="product-card" v-for="product in filteredProducts" :key="product.id">
            <img :src="product.image" alt="" class="product-image">
            <div class="product-info">
              <p class="product-title"><b>{{ product.title }}</b></p>
              <p class="product-price"><b>${{ product.price }}</b></p>
              <p class="product-category">{{ product.category }}</p>
            </div>
            <div class="addCart">
              <button>ADD TO CART</button>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const products = ref([]);
const cartItems = ref([]);
const router = useRouter();
const token = useCookie('token');

// Category
const filteredProducts = ref([]);
const selectedCategory = ref('all');

const fetchProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();
  products.value = data;
  filterProducts(); 
};

const filterProducts = () => {
  if (selectedCategory.value === 'all') {
    filteredProducts.value = products.value.filter(product => {
      return product.price <= sliderValue.value;
    });
  } else {
    filteredProducts.value = products.value.filter(product => {
      return product.category === selectedCategory.value && product.price <= sliderValue.value;
    });
  }
};

// max-min Button
const sortByPrice = (order) => {
  filteredProducts.value.sort((a, b) => {
    if (order === 'desc') {
      return b.price - a.price;
    } else if (order === 'asc') {
      return a.price - b.price;
    }
    return 0;
  });
};

// Slider Price
const sliderValue = ref(1000);

const updateSliderValue = (event) => {
  sliderValue.value = event.target.value;
  filterProducts();
};

onMounted(fetchProducts);
</script>

<style scoped>
/* Mukta / Montserrat */
@import url('https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@600&family=Mukta:wght@200;300;400;500;600;700;800&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.head-list, .shopby-title {
  font-family: 'Mukta';
}

.product-title, .product-price, .product-category {
  font-family: 'Montserrat';
  font-size: 14px;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 20px;
}

.grid-item {
  padding: 20px;
}

.item1 {
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.head-list {
  background: #474747;
  color: white;
  padding: 1px 20px 1px 20px;
}

.shopby-title {
  padding: 15px;
  font-weight: bolder;
  font-size: 14px;
}

.cat-detail {
  font-weight: normal;
  color: #474747;
}

.price-detail {
  text-align: center;
  width: auto;
}

.price-detail button {
  padding: 10px 15px;
  border-radius: 0%;
  border: none;
  margin-right: 10px;
  margin-bottom: 10px;
}

.slider {
  margin-top: 20px;
  width: 100%;
  opacity: 0.7;
}

.slider:hover {
  opacity: 1;
}

.grid-container-color {
  padding-left: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.product-bsell {
  width: auto;
  height: 100px;
  border: 1px solid #e0e0e0; 
  padding: 20px;
  margin: 10px 0px 10px 0px;
}

.product-title {
  color: #000;
}

.product-price {
  color: rgb(189, 21, 21);
}

.product-category {
  color: #cfcfcf;
  text-align: center;
  font-size: 12px;
}

.products-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.product-card {
  border: 1px solid #e0e0e0;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
}

.product-card:hover {
  transform: scale(1.05);
}

.product-image {
  width: auto;
  height: 120px;
  margin-bottom: 30px;
}

.product-info {
  margin-top: auto;
}

.product-title, .product-price {
  margin: 10px 0;
  text-align: center;
}

.addCart {
  margin-top: 10px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
  width: 100%;
}

.addCart button {
  width: 100%;
  padding: 10px;
  border: none;
  font-weight: 800;
  background: none;
  color: rgb(151, 188, 41);
}

.addCart button:hover, .price-detail button:hover {
  background: #bfb242b5;
  color: white;
}
</style>

