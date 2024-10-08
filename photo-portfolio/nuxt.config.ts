// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Gluciak.pl',
      meta: [
        { name: "description", content: "Portfolio fotograficzne - odkryj moje prace, zamów unikalne printy, i umów się na sesję fotograficzną. Sprawdź ofertę i skontaktuj się, aby nawiązać ze mną współpracę." },
        { property: 'og:url', content: 'https://gluciak.pl' },
        { property: 'og:title', content: 'Gluciak.pl' },
        { property: 'og:description', content: 'Filip Szczęch - portfolio fotograficzne.' },
        { property: 'og:image', content: 'https://invicpjbigavhuttylvh.supabase.co/storage/v1/object/public/photo-portfolio/rozne/60760009.jpg' },
        { property: 'og:type', content: 'website' },

        { name: 'twitter:title', content: 'Gluciak.pl' },
        { name: 'twitter:description', content: 'Filip Szczęch - portfolio fotograficzne.' },
        { name: 'twitter:image', content: 'https://invicpjbigavhuttylvh.supabase.co/storage/v1/object/public/photo-portfolio/rozne/60760009.jpg' },
        { name: 'twitter:card', content: 'summary' },

        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
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
    "@nuxt/image", 
    ['nuxt-mail', {
      smtp: {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
    }],
  ],
  mail: {
    message: {
      to: process.env.EMAIL_USER,
    },
    smtp: {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    },
  },
  formkit: {
    autoImport: true
  },
  supabase: {
    redirect: false
  },
})