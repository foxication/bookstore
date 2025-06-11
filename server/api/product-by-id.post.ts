import { z } from 'zod';
import { local_storage_books } from '~/stores/storage';

const idSchema = z.object({ id: z.number() });

export default defineEventHandler(async (event) => {
  const { id } = await readValidatedBody(event, idSchema.parse);
  return local_storage_books.find((book) => book.id === id);
});
