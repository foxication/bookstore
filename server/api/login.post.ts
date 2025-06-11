import { z } from 'zod';
import prisma from '~/lib/prisma';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
  // validate input data
  const { email, password } = await readValidatedBody(event, loginSchema.parse);

  // get the user from the storage
  const user = await prisma.user.findUnique({ where: { email } });

  // if the user doesn't exist, return an error
  if (user === null) {
    return createError({
      statusCode: 400,
      statusMessage: 'Please check your email and password.',
    });
  }

  const isPasswordValid = await verifyPassword(user.password_hash, password);

  // if the password is invalid, return an error
  if (!isPasswordValid) {
    return createError({
      statusCode: 400,
      statusMessage: 'Please check your email and password.',
    });
  }

  // set user the session without password
  const { password_hash: excluded, ...userAvailable } = user;
  await setUserSession(event, {
    user,
    loggedInAt: new Date(),
  });

  // finally return the session data to the client
  // not necessary but could be useful for the app to have
  return await getUserSession(event);
});
