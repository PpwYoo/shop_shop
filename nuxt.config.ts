// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2024-07-05",

  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    public: {
      apiBase: '/api'
    }
  },

  modules: [
    '@pinia/nuxt',
  ],
})

