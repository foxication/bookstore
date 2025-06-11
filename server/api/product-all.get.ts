import { Book } from '~/stores/storage';

export default defineEventHandler(async () => {
  const storage = useStorage('data');
  return (await storage.getItem<Book[]>('book')) ?? [];
});
