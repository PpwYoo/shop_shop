<template>
  <NuxtLink :to="'/product/' + product.id" class="link">
    <div class="product-card">
      <img :src="product.image" alt="Product image" :class="custom" />
    </div>
    <p class="product-title">{{ product.title }}</p>
    <p class="product-price"><b>${{ product.price }}</b></p>
  </NuxtLink>
</template>

<script setup>
defineProps({
  product: Object,
  custom: String,
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Mukta:wght@200;300;400;500;600;700;800&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.link{
  text-decoration: none;
  color: inherit;
}

.link:hover{
  opacity: 0.7;
}

.product-card{
  border: 1px solid #ebebeb;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-image{
  width: 150px;
  height: 200px;
}

.product-title{
  color: rgb(144, 144, 144);
}

.product-title, .product-price{
  font-family: 'Montserrat';
  font-size: 14px;
}

.product-related{
  width: 150px;
  height: 150px;
  padding: 20px;
}
</style>
