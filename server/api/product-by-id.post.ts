import { z } from 'zod';
import { Book } from '~/stores/storage';

const idSchema = z.object({ id: z.number() });

export default defineEventHandler(async (event) => {
  const { id } = await readValidatedBody(event, idSchema.parse);

  const storage = useStorage('assets:server');
  return ((await storage.getItem<Book[]>('book.json')) ?? []).find(
    (book) => book.id === id
  );
});
