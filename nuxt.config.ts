export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },
  css: ["primeicons/primeicons.css", "~/assets/css/tailwind.css"],
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  vite: {
    optimizeDeps: {
      include: ["socket.io-client"],
    },
  },
  plugins: [
    "~/plugins/01.socket.client.js",
    "~/plugins/02.socket-lister.client.js",
  ],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URI,
      socketUrl: process.env.SOCKET_URL,
    },
  },
});
