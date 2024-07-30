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
    let decoded;
    try {
      decoded = jwt.verify(token, config.jwtSecret) as { username: string };
      return {
        username: decoded.username,
      };
    } catch (err) {
      console.log('JWT verification failed, checking if it is a Google token');
    }

    const googleUserInfoResponse = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`);
    if (!googleUserInfoResponse.ok) {
      throw createError({
        message: 'Invalid token',
      });
    }
    const googleUserInfo = await googleUserInfoResponse.json();
    
    return {
      username: googleUserInfo.email.split('@')[0],
    };
    
  } catch (err) {
    throw createError({
      message: 'Invalid token',
    });
  }
});
