import { local_storage_books } from '~/stores/storage';

export default defineEventHandler(async () => {
  return local_storage_books;
});
