import prisma from '~/lib/prisma';

export default defineEventHandler(async () => {
  return await prisma.category.findMany();
});
