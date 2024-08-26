export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "nuxt-icon",
    "nuxt-vuefire",
    "@vee-validate/nuxt",
    "@morev/vue-transitions/nuxt",
  ],

  tailwindcss: { exposeConfig: true },
  colorMode: { classSuffix: "" },
  typescript: { shim: false },

  imports: {
    imports: [
      { from: "tailwind-variants", name: "tv" },
      { from: "tailwind-variants", name: "VariantProps", type: true },
      { from: "vue-sonner", name: "toast", as: "useSonner" },
    ],
  },

  app: {
    head: {
      title: "Nuxt Petz",
      titleTemplate: "%s - Nuxt Petz",
    },
  },

  vuefire: {
    auth: {
      enabled: true,
      // Realized that this was not needed later on
      //sessionCookie: true
    },
    config: {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
    },
  },

  build: { transpile: ["vue-sonner"] },
  compatibilityDate: "2024-08-20",
});
