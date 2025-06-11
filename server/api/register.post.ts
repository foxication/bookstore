import { z } from 'zod';
import { UserLocal } from '~/stores/storage';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
  // clear the current user session just in case
  await clearUserSession(event);

  // validate input data
  const { email, password } = await readValidatedBody(
    event,
    registerSchema.parse
  );

  // check if email already exists in storage
  const storage = useStorage('data');
  const user_storage = (await storage.getItem<UserLocal[]>('user')) ?? [];
  const existingUser = user_storage.find((user) => user.email === email);
  if (existingUser !== undefined) {
    return createError({
      statusCode: 400,
      statusMessage: 'User already exists',
    });
  }

  // if the user doesn't exist, create a new user object
  const user = {
    name: email.split('@')[0],
    email,
  };

  // store user data in database
  user_storage.push({
    id: user_storage.length + 1,
    ...user,
    password_hash: await hashPassword(password),
  });
  await storage.setItem('user', user_storage);

  return await setUserSession(event, {
    user,
    loggedInAt: new Date(),
  });
});
