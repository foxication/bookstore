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
  // we'll make sure to include the password in the user object as it's stored in storage
  // but it's not returned from the server as part of the user object

  const user = await prisma.user.findUnique({ where: { email } });

  // if the user doesn't exist, return an error
  if (user === null) {
    return createError({
      statusCode: 400,
      statusMessage: 'Please check your email and password.',
    });
  }

  // if the user does exist, we'll verify the password
  // we'll use the verifyPassword function from Nuxt Auth Utils
  // to compare the stored hashed password with the user provided password
  const isPasswordValid = await verifyPassword(user.password ?? '', password);

  // if the password is invalid, return an error
  if (!isPasswordValid) {
    return createError({
      statusCode: 400,
      statusMessage: 'Please check your email and password.',
    });
  }

  // if the password is valid, we can set the session
  // without the user data without the password (for security)

  const { password: excluded, ...userAvailable } = user;
  // delete user.password;
  await setUserSession(event, {
    user,
    loggedInAt: new Date(),
  });

  // finally return the session data to the client
  // not really necessary but could be useful for the app to have
  return await getUserSession(event);
});
