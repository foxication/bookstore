import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
  // Clear the current user session just in case
  await clearUserSession(event);

  const storage = useStorage('data');
  const { email, password } = await readValidatedBody(
    event,
    registerSchema.parse
  );

  // check if email already exists in storage
  // and return an error if it does
  const existingUser = await storage.getItem(email);
  if (existingUser) {
    return createError({
      statusCode: 400,
      statusMessage: 'User already exists',
    });
  }

  // if the user doesn't exist, create a new user object
  // You could also include some other user data here like a profile picture, bio, etc. based on your registration form
  const user = {
    name: email.split('@')[0],
    email,
    createdAt: new Date(),
  };

  // and store it in KV storage
  // along with the hashed password
  await storage.setItem(email, {
    ...user,
    // make sure to hash the password with Nuxt Auth Utils's built-in function
    // never store plain text passwords!
    password: await hashPassword(password),
  });

  // NOTE: You could also include email verification by
  // 1. generating a token and storing the token in KV storage
  // 2. sending the token to the user's email address
  // 3. checking the token sent to the user's email address against the token in KV storage

  // finally set the userSession cookie with the new user data
  // so that the user is logged in after registration
  // I hate it when apps don't log you in after registration! 😅
  return await setUserSession(event, {
    user,
    loggedInAt: new Date(),
  });
});
