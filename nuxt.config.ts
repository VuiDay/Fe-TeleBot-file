export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {},
  runtimeConfig: {
    public: {
      urlBackend: process.env.URL,
    },
  },
  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "@ant-design-vue/nuxt",
    "nuxt-primevue",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
    "@pinia-plugin-persistedstate/nuxt",
  ],
  imports: {
    dirs: ["store"],
  },
  i18n: {
    locales: [
      {
        code: "vi",
        files: [{ path: "vi.js", cache: false }],
      },
      {
        code: "en",
        files: [{ path: "en.js", cache: false }],
      },
    ],
    lazy: true,
    langDir: "lang",
    defaultLocale: "vi",
  },
  antd: {},
  primevue: {
    cssLayerOrder: "reset,primevue",
    options: {
      unstyled: true,
    },
    importPT: { from: "~/presets/lara/" },
  },
  css: ["primevue/resources/themes/aura-light-green/theme.css"],
});
