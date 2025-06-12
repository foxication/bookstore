import { createStorage } from 'unstorage';
import vercelKVDriver from 'unstorage/drivers/vercel-kv';
import fsDriver from 'unstorage/drivers/fs';

// if vercel-kv available, use it.
// it's implement this way to support writing user data on vercel platform
//
// on vercel deployment don't forget to connect upstash-redis database to project

const kv_url = process.env.KV_REST_API_URL;
const kv_token = process.env.KV_REST_API_TOKEN;

export const user_storage =
  kv_url !== undefined && kv_token !== undefined
    ? createStorage({
        driver: vercelKVDriver({ url: kv_url, token: kv_token }),
      })
    : createStorage({
        driver: fsDriver({ base: './user' }),
      });
