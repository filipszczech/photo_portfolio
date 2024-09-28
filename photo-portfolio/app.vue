<template>
    <div class="font-mono min-h-screen bg-[#EFEEEA]">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script setup>
    import 'primeicons/primeicons.css'

    useHead({
      meta: [
        { name: "description", content: "Portfolio fotograficzne - odkryj moje prace, zamów unikalne printy, i umów się na sesję fotograficzną. Sprawdź ofertę i skontaktuj się, aby nawiązać ze mną współpracę." },
        { property: 'og:url', content: 'https://gluciak.pl' },
        { property: 'og:title', content: 'Gluciak.pl' },
        { property: 'og:description', content: 'Filip Szczęch - portfolio fotograficzne.' },
        { property: 'og:image', content: 'https://invicpjbigavhuttylvh.supabase.co/storage/v1/object/public/photo-portfolio/rozne/60760009.jpg' },
        { property: 'og:type', content: 'website' },

        { name: 'twitter:title', content: 'Gluciak.pl' },
        { name: 'twitter:description', content: 'Filip Szczęch - strona portfolio fotograficzne.' },
        { name: 'twitter:image', content: 'https://invicpjbigavhuttylvh.supabase.co/storage/v1/object/public/photo-portfolio/rozne/60760009.jpg' },
        { name: 'twitter:card', content: 'summary' },

        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
        htmlAttrs: {
            lang: 'pl'
        },
        link: [
            {
            rel: 'icon',
            type: 'image/png',
            href: '/favicon2.png'
            }
        ]
    });
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
