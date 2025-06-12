import { z } from 'zod';
import { UserLocal } from '~/stores/storage';
import { user_storage } from '../user-storage';

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

  const existingUser = await user_storage.getItem<UserLocal>(email);
  if (existingUser !== null) {
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
  await user_storage.setItem(email, {
    id: user_storage.keys.length + 1,
    ...user,
    password_hash: await hashPassword(password),
  });

  return await setUserSession(event, {
    user,
    loggedInAt: new Date(),
  });
});
