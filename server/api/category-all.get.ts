import { local_storage_category } from '~/stores/storage';

export default defineEventHandler(async () => {
  return local_storage_category;
});
