import { Category } from '~/stores/storage';

export default defineEventHandler(async () => {
  const storage = useStorage('assets:server');
  const category_storage =
    (await storage.getItem<Category[]>('category')) ?? [];
  return category_storage;
});
