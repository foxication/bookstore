import { z } from 'zod';
import { UserLocal } from '~/stores/storage';
import { user_storage } from '../user-storage';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
  // validate input data
  const { email, password } = await readValidatedBody(event, loginSchema.parse);

  // get the user from the storage
  const userWithPassword = await user_storage.getItem<UserLocal>(email);

  // if the user doesn't exist, return an error
  if (userWithPassword === null) {
    return createError({
      statusCode: 400,
      statusMessage: 'Please check your email and password.',
    });
  }

  const isPasswordValid = await verifyPassword(
    userWithPassword.password_hash,
    password
  );

  // if the password is invalid, return an error
  if (!isPasswordValid) {
    return createError({
      statusCode: 400,
      statusMessage: 'Please check your email and password.',
    });
  }

  // set user the session without password
  const { password_hash: excluded, ...user } = userWithPassword;
  await setUserSession(event, {
    user,
    loggedInAt: new Date(),
  });

  // finally return the session data to the client
  // not necessary but could be useful for the app to have
  return await getUserSession(event);
});
