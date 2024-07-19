<template>
  <div>
    <!-- info -->
    <div class="grid-container">
      <div class="grid-item">
        <img :src="product.image" alt="Product image" class="product-image">
      </div>
      <div class="grid-item" style="margin-right: 80px;">
        <h1>{{ product.title }}</h1>
        <h3 style="color: rgb(189, 21, 21);"><b>${{ product.price }}</b></h3> <hr>
        <p>{{ product.description }}</p>
        <hr>
        <div style="margin-top: 30px; margin-bottom: 30px;">
          <input type="number" v-model="quantity" min="1" id="quantity" class="quan">
          <button @click="addToCart" class="addtocart">ADD TO CART</button>
        </div>
        <div>
            <p><b>Category</b> {{ product.category }}</p>
            <div style="display: flex;">
              <p><b>Share the product</b> &nbsp;</p>
                <div class="social">
                  <img src="https://cdn-icons-png.flaticon.com/512/59/59439.png" alt="">
                  <img src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-black-icon.png" alt="">
                  <img src="https://cdn4.iconfinder.com/data/icons/picons-social/57/38-instagram-2-512.png" alt="">
                </div>
            </div>
        </div>
      </div>
    </div>

    <!-- desc & review -->
    <div style="margin: 80px;">
      <div class="tabs">
        <button class="tab-button" :class="{ active: activeTab === 'description' }" @click="activeTab = 'description'"><b>Description</b></button>
        <button class="tab-button" :class="{ active: activeTab === 'review' }" @click="activeTab = 'review'"><b>Review</b></button>
      </div>
      
      <div v-if="activeTab === 'description'" class="tab-content">
        <hr><br><br>
        <p>{{ product.description }}</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia, amet molestias! Atque ipsam deserunt quasi id omnis laudantium illum minus minima cupiditate repudiandae, cumque nulla facere, quo, suscipit cum harum quas incidunt a dolorem sit unde? Optio cum et adipisci ad voluptates iure fugit, quam quasi praesentium quo quis ratione! Quod vitae maiores odit tenetur laborum excepturi aliquam nam distinctio ducimus esse totam voluptates ex reiciendis animi deleniti minima autem necessitatibus, cumque sed eum dolor beatae? Reiciendis asperiores hic pariatur iusto temporibus tempore, perferendis a? Ducimus ipsa delectus asperiores, minus aspernatur odit modi cumque nihil at sed impedit veritatis voluptates?</p>
        <br><br><hr>
      </div>
      
      <div v-if="activeTab === 'review'" class="tab-content">
        <hr><br><br>
        <p style="text-align: center; color: gray;">No Review</p>
        <br><br><hr>
      </div>
    </div>

    <!-- related -->
    <div>
      <h2 style="text-align: center; font-family: 'Mukta';">Related products</h2>
        <div class="container">
          <div v-for="product in limitedProducts" :key="product.id">
            <div>
              <img :src="product.image" alt="Product image" class="product-related" />
              <p><b>{{ product.title }}</b></p>
            <p style="color: rgb(189, 21, 21);"><b>${{ product.price }}</b></p>
            </div>
          </div>
        </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const activeTab = ref('description');
const route = useRoute();
const router = useRouter();
const product = ref('');
const quantity = ref(1);
const token = useCookie('token');

onMounted(async () => {
  const productID = route.params.id;

  try {
    const response = await $fetch(`https://fakestoreapi.com/products/${productID}`);
    product.value = response;
  } catch (error) {
    console.error("Failed to fetch product:", error);
  }
});

const addToCart = async () => {
  if (!token.value) {
    alert('Please login first');
    router.push('/login');
    return;
  }

  if (product.value) {
    await $fetch('/api/cart', {
      method: 'POST',
      body: { product: product.value, quantity: quantity.value }
    });
    router.push('/cart');
  }
};

const products = ref([]);
const { data } = await useFetch('https://fakestoreapi.com/products');
products.value = data.value;

const limitedProducts = computed(() => {
  return products.value.slice(0, 4);
});
</script>

<style scoped>
/* Mukta / Montserrat */
@import url('https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Mukta:wght@200;300;400;500;600;700;800&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

h1, h3 {
  font-family: 'Montserrat';
  font-size: 24px;

}

h3 {
    font-size: 18px;
}

p {
    font-family: 'Montserrat';
    font-size: 14px;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.grid-item {
  padding: 20px;
}

hr {
  border: 1px solid rgb(234, 234, 234);
}

.product-image {
  width: 400px;
  height: 400px;
  border: 1px solid rgb(208, 208, 208);
  padding: 40px;
  margin-left: 80px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.quan {
    padding: 10px;
    width: 10%;
}

.addtocart {
    color: white;
    background: rgb(26, 26, 26);
    padding: 10px; 
    width: 40%;
    border-radius: 5px;
    margin-left: 10px;
    border: none;
}

.addtocart:hover {
    background: rgb(46, 143, 46);
}

.social img {
    width: 20px;
    margin: 5px;
    padding-top: 6px;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.tab-button {
  font-size: 18px;
  padding: 10px 20px;
  border: none;
  background-color: white;
  cursor: pointer;
  margin: 0 5px;
}

.tab-button.active {
  color: rgb(175, 31, 31);
}

.container {
  width: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
  margin-bottom: 50px;
  margin-left: 70px;
}

.product-related{
  width: 150px;
  height: 150px;
  padding: 20px;
  margin: auto;
  border: 1px solid rgb(234, 234, 234);
}
</style>
