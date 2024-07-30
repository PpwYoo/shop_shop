<template>
  <div>
    <h1 style="text-align: center; margin: 50px; font-family: 'Mukta';">Your Cart</h1>

    <div class="grid-container">

      <!-- list products -->
      <div class="grid-item item1">
        <table class="cart-table">
          <thead>
            <tr>
              <th style="text-align: start;" class="table-header">PRODUCT</th>
              <th class="table-header">PRICE</th>
              <th class="table-header">QUANTITY</th>
              <th class="table-header">TOTAL</th>
              <th class="table-header"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in cartItems" :key="product.id" class="cart-item">
              <td style="text-align: start;">
                <div class="product-info">
                  <img :src="product.image" alt="Product image" class="product-image" />
                  <span class="product-title">{{ product.title }}</span>
                </div>
              </td>
              <td>${{ product.price }}</td>
              <td>
                <button @click="updateQuantity(product.id, product.quantity + 1)">+</button>
                <span>&nbsp;&nbsp;&nbsp;{{ product.quantity }}&nbsp;&nbsp;&nbsp;</span>
                <button @click="updateQuantity(product.id, product.quantity - 1)" :disabled="product.quantity <= 1">-</button>
              </td>
              <td>${{ product.price * product.quantity }}</td>
              <td><button @click="removeFromCart(product.id)" class="remove-btn">x</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- order summary -->
      <div class="grid-item">
        <div class="item2">
          <div class="order-sum"><h3 style="font-weight: normal;">Order Summary</h3></div>
          <div style="display: flex;">
            <p style="padding: 15px 30px; color: #898989;">Subtotal</p>
            <p style="padding: 15px">&nbsp;&nbsp;&nbsp;${{ calculateTotalPrice() }}</p>
          </div>
          <div style="display: flex;">
            <p style="padding: 0px 30px 15px; color: #898989;">Shipping</p>
            <p style="padding-left: 15px">&nbsp;&nbsp;&nbsp;Free</p>
          </div>
          <div class="order-sum" style="display: flex;">
            <h3 style="font-weight: normal;">Total</h3>
            <p style="padding: 5px 75px;">${{ calculateTotalPrice() }}</p>
          </div>
        </div>
        <button class="checkout-btn">CHECKOUT</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const cartItems = ref([]);

const fetchCart = async () => {
  const response = await $fetch('/api/cart');
  cartItems.value = response;
};

const updateQuantity = async (productId, newQuantity) => {
  if (newQuantity < 1) return;
  const product = cartItems.value.find(item => item.id === productId);
  
  if (product) {
    product.quantity = newQuantity;
    const response = await $fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ product, quantity: newQuantity }), 
    });

    cartItems.value = response.cart;
  }
};

const removeFromCart = async (productId) => {
  const response = await $fetch('/api/cart', {
    method: 'DELETE',
    body: { productId },
  });
  cartItems.value = response.cart;
};

const calculateTotalPrice = () => {
  let totalPrice = 0;
  cartItems.value.forEach(product => {
    totalPrice += product.price * product.quantity;
  });
  return totalPrice.toFixed(2); //digit
};

definePageMeta({
  middleware: 'auth'
});

onMounted(() => {
  fetchCart();
});
</script>

<style scoped>
/* Mukta / Montserrat */
@import url('https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat&family=Mukta:wght@200;300;400;500;600;700;800&family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.table-header, .cart-item, .item2 {
  font-family: 'Montserrat';
}

.product-title, .item2 {
  font-size: 14px;
}

.order-sum {
  font-family: 'Mukta';
}

.grid-container {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 20px;
}

.grid-item {
  padding: 20px;
}

.item2 {
  background: #eeeeee;
  margin-top: 80px;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
}

.cart-table th, .cart-table td {
  padding: 30px;
  text-align: center;
}

.table-header {
  border-bottom: 1px solid #ccc;
  color: #898989;
  font-weight: normal;
}

.cart-item {
  border-bottom: 1px solid #ccc;
}

.product-title {
  font-weight: bold;
}

.product-info {
  display: flex;
  align-items: center;
}

.product-image {
  width: 90px;
  height: 100px;
  margin-right: 30px;
}

.remove-btn {
  border: none;
  font-size: 16px;
  padding: 6px 12px;
  border-radius: 15px;
}

.remove-btn:hover {
  background-color: #000000;
  color: white;
}

.order-sum {
  background: #e5e5e5;
  padding: 5px 30px;
}

.checkout-btn {
  background-color: #409c43;
  width: 100%;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
}

.checkout-btn:hover {
  background-color: rgb(76, 168, 80);
}
</style>
