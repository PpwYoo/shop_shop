import { defineEventHandler, setCookie } from 'h3';

export default defineEventHandler((event) => {
  setCookie(event, 'token', '', {
    expires: new Date(0)
  });

  return {
    success: true,
  };
});
