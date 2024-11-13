<template>
    <div>
        <div class="my-6">
            <span>/</span>
            <NuxtLink class="mx-2" to="/">strona główna</NuxtLink>
            <span>/</span>
            <span class="ml-2">sesje</span>
        </div>
        <div class="grid grid-cols-6 gap-6 xl:gap-12 mt-6 lg:mt-12 mb-24">
            <img
            class="col-span-6 lg:col-span-3"
            src="https://invicpjbigavhuttylvh.supabase.co/storage/v1/object/public/photo-portfolio/rozne/60760009.jpg"
            />
            <div class="col-span-6 lg:col-span-3 flex flex-col justify-center">
            <h1 class="section-header mb-6">Zapraszam na sesje</h1>
            <p class="text-xl">
                Jesteś modelem/modelką?<br />Nie masz doświadczenia w pozowaniu, ale
                chciałbyś zacząć? Super dawaj!
            </p>
            </div>
        </div>
        <h2 class="section-header lg:text-center mb-6 lg:mx-6">
            Co możemy razem zrobić
        </h2>
        <p class="border border-black p-4 mb-6 lg:mb-12 w-full md:w-2/3 mx-auto">
            Jeśli chcesz uzyskać zdjęcia w niepowtarzalnym klimacie i o wyróżniającej
            się estetyce to średni format jest świetnym narzędziem. Jestem otwarty na
            wszelkie formy fotografii, nie tylko portretowej. Zgłoś się do mnie i na
            pewno coś wymyślimy.
        </p>
        <div v-if="pending">Loading...</div>
        <div v-else-if="error">{{ error.message }}</div>
        <div v-else class="grid grid-cols-6 gap-9 xl:gap-12">
            <div v-for="(session, sessionIndex) in data" :key="sessionIndex" class="col-span-6 md:col-span-3 lg:col-span-2" >
                <NuxtImg format="avif" placeholder :src="session.img" class="w-full" />
                <p class="text-2xl font-semibold my-2 xl:my-4">{{ session.title }}</p>
                <p>{{ session.desc }}</p>
            </div>
        </div>
        <SessionContactForm />
    </div>
</template>
  
  <script setup>
    useSetSeoData({
        title: 'sesje',
        description: `umów się na sesję.`,
        image: 'https://invicpjbigavhuttylvh.supabase.co/storage/v1/object/public/photo-portfolio/rozne/60760009.jpg',
    });
  
    const { data, pending, error } = useAsyncData('sessionTypes', async () => {
        return await useSupabaseFetch('session_types');
    });
  
    if (!data) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Błąd podczas wczytywania sesji.',
            fatal: true
        });
    }
  </script>
  