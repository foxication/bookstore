import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  modules: ['nuxt-auth-utils', '@nuxt/ui'],
  ui: {
    fonts: false,
  },
  colorMode: {
    preference:  'light'
  },
  nitro: {
    storage: {
      data: { driver: 'vercelKV' },
    },
  },
});
