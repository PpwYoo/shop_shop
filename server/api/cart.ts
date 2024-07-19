import { defineEventHandler, readBody } from 'h3';
let cart: any[] = [];

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === 'GET') {
    return cart;
  } else if (method === 'POST') {
    const body = await readBody(event);
    const { product, quantity } = body;

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity = quantity !== 0 ? quantity : existingProduct.quantity + 1;
    } else {
      cart.push({ ...product, quantity: quantity || 1 });
    }

    return { success: true, cart };
  } else if (method === 'DELETE') {
    const body = await readBody(event);
    cart = cart.filter(item => item.id !== body.productId);
    return { success: true, cart };
  }
});
