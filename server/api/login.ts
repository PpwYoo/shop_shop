import { defineEventHandler, readBody, createError } from 'h3';
import jwt from 'jsonwebtoken';

interface IBody {
  username: string;
  password: string;
}

const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];

const secretKey = process.env.JWT_SECRET || 'default_secret_key';

export default defineEventHandler(async (event) => {
  const body = await readBody<IBody>(event);
  const { username, password } = body;

  const decodedPassword = Buffer.from(password, 'base64').toString('ascii');
  const user = users.find(u => u.username === username && u.password === decodedPassword);

  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Invalid username or password',
    });
  }
  const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });

  return {
    success: true,
    message: 'Login successful',
    token: token,
  };
});
