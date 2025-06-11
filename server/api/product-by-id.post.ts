import { z } from 'zod';
import prisma from '~/lib/prisma';

const idSchema = z.object({ id: z.number() });

export default defineEventHandler(async (event) => {
  const { id } = await readValidatedBody(event, idSchema.parse);
  return await prisma.book.findUnique({ where: { id } });
});
