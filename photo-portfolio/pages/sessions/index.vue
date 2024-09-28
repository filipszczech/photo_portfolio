<template>
    <div>
        <div class="my-6">
            <span>/</span>
            <NuxtLink class="mx-2" to="/">strona główna</NuxtLink>
            <span>/</span>
            <span class="ml-2">sesje</span>
        </div>
        <!-- <h1 class="section-header text-center">Sesje</h1> -->
        <div class="grid grid-cols-6 gap-6 xl:gap-12 mt-6 lg:mt-12 mb-24">
            <img class="col-span-6 lg:col-span-3" src="https://invicpjbigavhuttylvh.supabase.co/storage/v1/object/public/photo-portfolio/rozne/60760009.jpg"/>
            <div class="col-span-6 lg:col-span-3 flex flex-col justify-center">
                <h2 class="section-header mb-6">Zapraszam na sesje</h2>
                <p class="text-xl">Jesteś modelem/modelką?<br>Nie masz doświadczenia w pozowaniu, ale chciałbxś zaczać? Super dawaj!</p>
            </div>
        </div>
        <h2 class="section-header lg:text-center mb-6 lg:mx-6">Co możemy razem zrobić</h2>
        <p class="border border-black p-4 mb-6 lg:mb-12 w-full md:w-2/3 mx-auto">
            Jeśli chcesz uzyskać zdjęcia w niepowtaralnym klimacie i o wyróżniającej się estetyce to średni format jest świetnym narzędziem. Jestem otwarty na wszelkie formy fotografii, nie tylko portretowej. Zgłoś się do mnie i na pewno coś wymyślimy.
        </p>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else class="grid grid-cols-6 gap-9 xl:gap-12">
            <div v-for="(session, sessionIndex) in sessionTypes" :key="sessionIndex" class="col-span-6 md:col-span-3 lg:col-span-2">
                <NuxtImg format="avif" placeholder :src="session.img" />
                <p class="text-2xl font-semibold my-2 xl:my-4">{{ session.title }}</p>
                <p>{{ session.desc }}</p>
            </div>
        </div>
        <SessionContactForm />
        </div>
</template>

<script setup>
    useHead({
        title: "Gluciak.pl | sesje"
    });

    const sessionTypes = ref([]);
    const error = ref(null);
    const loading = ref(true);

    const fetchSessionTypes = async () => {
        loading.value = true;
        error.value = null;

        try {
            const sessionTypesData = await useSupabaseFetch('session_types');
            sessionTypes.value = sessionTypesData;

        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
            console.log(sessionTypes.value);
        }
    }

    onMounted(() => {
        fetchSessionTypes()
    });

    if(!sessionTypes) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Bład podczas wczytywania sesji.',
            fatal: true
        });
    };
</script>