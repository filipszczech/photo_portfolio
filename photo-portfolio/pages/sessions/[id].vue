<template :key="session.id">
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">{{ error.message }}</div>
    <div v-else>
        <div class="mb-9">
            <div class="mb-6">
                <span>/</span>
                <NuxtLink class="mx-2" to="/">Strona główna</NuxtLink>
                <span>/</span>
                <NuxtLink class="mx-2" to="/portfolio">portfolio</NuxtLink>
                <span>/</span>
                <NuxtLink class="mx-2" :to="'/categories/' + category.slug"><span class="mx-2">{{ category.name.toLowerCase() }}</span></NuxtLink>
                <span>/</span>
                <span class="ml-2">{{ session.name.toLowerCase() }}</span>
            </div>
            <h1 class="text-6xl font-semibold text-center mb-6">{{ session.name }}</h1>
            <p class="text-center xl:w-1/2 mx-auto">{{ session.desc }}</p>
            <div class="p-4 border border-black lg:w-1/3 mx-auto mt-6">
                <p class="">/ Modelka: @Wiktoria</p>
                <p>/ Aparat: Mamiya 645</p>
                <p class="">/ Obiektyw: Mamiya Sekkor C 105mm</p>
                <p class="">/ Film: Lomography 400</p>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div v-for="(group, index) in reorderedPhotos" :key="index" class="flex flex-col gap-4">
                <div v-for="(photo, photoIndex) in group" :key="photoIndex" class="photo">
                    <NuxtImg format="avif" placeholder :src="photo.src" :alt="photo.alt" class="w-full h-auto object-cover" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { id } = useRoute().params;

const { data: session, pending, error } = await useAsyncData('session', () =>
    useSupabaseFetch('sessions', { slug: id }, true)
);

const { data: category } = await useAsyncData('category', () => 
    useSupabaseFetch('categories', { id: session.value.category_id }, true)
);

const { data: photos } = await useAsyncData('photos', () => 
    useSupabaseFetch('photos', { session_id: session.value.id })
);

if (session.value) {
    useSetSeoData({
        title: session.value.name,
        description: `zdjęcia z sesji ${session.value.name.toLowerCase()}.`,
        image: session.value.img,
    });
}

if (!session.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Nie znaleziono sesji o takiej nazwie.',
        fatal: true
    });
}

const groupedPhotos = computed(() => {
    const groups = [[], [], []];
    photos.value.forEach((photo, index) => {
        groups[index % 3].push(photo);
    });
    return groups;
});

const reorderedPhotos = computed(() => {
    return [groupedPhotos.value[0], groupedPhotos.value[2], groupedPhotos.value[1]];
});
</script>

<style>
.is-invalid {
    background-color: red;
}
select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
</style>
