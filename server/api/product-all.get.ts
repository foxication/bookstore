import { Book } from '~/stores/storage';

export default defineEventHandler(async () => {
  const storage = useStorage('assets:server');
  return (await storage.getItem<Book[]>('book')) ?? [];
});
