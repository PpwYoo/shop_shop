<template>
  <div>
    <!-- cover img -->
    <div class="row">
      <div class="box">
        <img src="https://wallpapers.com/images/featured/clothes-background-ot7pkynbf8g28jsr.jpg" style="width: 100%; height: 100%;" alt="">
      </div>
      <div class="column">
        <div class="box2">
            <img src="https://png.pngtree.com/background/20231101/original/pngtree-d-render-of-summer-beach-accessories-with-phone-on-yellow-background-picture-image_5834652.jpg" style="width: 100%; height: 100%;" alt="">
        </div>
        <div class="row">
          <div class="box3">
            <img src="https://img.freepik.com/premium-photo/flat-lay-with-set-professional-decorative-cosmetics-makeup-tools-woman-spring-summer-accessories-pink-wall-with-copy-space-beauty-blog-fashion-party-shopping-concept-top-view_72402-4426.jpg" style="width: 100%; height: 100%;" alt="">
          </div>
          <div class="box4">
            <img src="https://img.freepik.com/premium-photo/business-woman-s-everyday-life-travel-accessories-flat-lay-light-wooden-background_55540-1.jpg" style="width: 100%; height: 100%;" alt="">
          </div>
        </div>
      </div>
    </div>

    <!-- intro -->
    <div class="intro">
      <h1>Lorem lorem</h1>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos illo iure adipisci distinctio. Iste, minus!</p>
    </div>
    <br>

    <!-- products -->
    <div class="container">
      <NuxtLink v-for="product in limitedProducts" :key="product.id" :to="'/product/' + product.id" class="link">
        <div class="product-card">
          <img :src="product.image" alt="Product image" class="product-image" />
        </div>
        <p class="product-title">{{ product.title }}</p>
        <p class="product-price"><b>${{ product.price }}</b></p>
      </NuxtLink>
    </div>

    <div style="height: 400px; background-color: gray;">
      <img src="https://t4.ftcdn.net/jpg/02/40/86/83/360_F_240868381_H0yM2TZRttm5mLuDXJoCONKj9B5vZvPh.jpg" style="width: 100%; height: 100%;" alt="">
    </div>

  </div>
</template>

<script setup>
const products = ref([]);
const { data } = await useFetch('https://fakestoreapi.com/products');
products.value = data.value;

const limitedProducts = computed(() => {
  return products.value.slice(0, 10);
});
</script>

<style scoped>
/* Mukta / Montserrat */
@import url('https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Mukta:wght@200;300;400;500;600;700;800&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.intro {
  font-family: 'Mukta';
}

.product-title, .product-price {
  font-family: 'Montserrat';
  font-size: 14px;
}

.link {
  text-decoration: none;
  color: inherit;
}

.link:hover {
  opacity: 0.7;
}

.box{
  background-color: gray;
  height: auto;
  margin: 8px;
  flex: 1.5;
}

.box2{
  background-color: gray;
  height: 230px;
  margin: 8px;
}

.box3, .box4{
  background-color: gray;
  height: 230px;
  margin: 8px;
  flex: 1;
}

.row{
  display: flex;
}

.column{
  display: flex;
  flex-direction: column;
  flex: 1;
}

.intro{
  margin-top: 80px;
  text-align: center;
}

.product-image{
  width: 150px;
  height: 200px;
}

.product-title{
  color: rgb(144, 144, 144);
}

.product-card {
  border: 1px solid #ebebeb;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  width: auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 20px;
  margin-bottom: 50px;
}
</style>
