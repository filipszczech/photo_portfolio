<template>
    <div>
        <div class="my-6">
            <span>/</span>
            <NuxtLink class="mx-2" to="/">strona główna</NuxtLink>
            <span>/</span>
            <span class="ml-2">printy</span>
        </div>
        <h1 class="section-header text-center mb-6">Printy</h1>
        <div class="mb-6 lg:mb-12 p-4 border border-black w-full lg:w-2/3 mx-auto">
            <p>
                Fotografię traktuję jako pasję i zawodowo zajmuję się czymś zupełnie innym. Z drugiej strony, jestem dumny z tego co tworzę i postanowiłem spróbować swoich sił w sprzedaży printów.<br>W sierpniu 2024 wybrałem się z ziomami na tripa busem po Bałkanach i przywiozłem stamtąd oprócz pięknych wspomnień trochę dobrych zdjęć. Stąd też powstał pomysł na pierwszą serię druków.
            </p>
        </div>
        <GridContainer>
            <div v-for="(print, printIndex) in prints" :key="printIndex" class="flex flex-col justify-center">
                <NuxtLink :to="'/prints/' + print.slug">
                    <NuxtImg format="avif" :src="print.src_border" alt="print" class="cursor-pointer hover:shadow-xl transition-all duration-500" />
                </NuxtLink>
                <NuxtLink :to="'/prints/' + print.slug">
                    <p class="text-center mt-2">{{ print.name }}</p>
                </NuxtLink>
            </div>
        </GridContainer>
    </div>
</template>

<script setup>

    const { data: prints, pending, error } = useAsyncData('prints', async () => {
        return await useSupabaseFetch('prints', {}, false, 'order', true);
    });
    
    useSetSeoData({
        title: 'printy',
        description: `Lista printów na sprzedaż.`,
    });
</script>