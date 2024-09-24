// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Gluciak.pl',
      meta: [
        { name: "description", content: "Portfolio fotograficzne - odkryj moje prace, zamów unikalne printy, i umów się na sesję fotograficzną. Sprawdź ofertę i skontaktuj się, aby nawiązać ze mną współpracę." }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon2.png' }
      ]
    }
  },
  plugins: ['@/plugins/primevue.js'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@formkit/nuxt',
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "@nuxt/image"
  ],
  formkit: {
    autoImport: true
  },
  supabase: {
    redirect: false
  },
})