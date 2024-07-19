import { defineEventHandler, getCookie, createError } from 'h3';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token');

  if (!token) {
    throw createError({
      message: 'No token found in cookies',
    });
  }
  
  const config = useRuntimeConfig();
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { username: string };
    
    return {
      username: decoded.username,
    };
  } catch (err) {
    throw createError({
      message: 'Invalid token',
    });
  }
});
