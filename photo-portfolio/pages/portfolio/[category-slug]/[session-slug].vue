<template :key="session_slug">
    <div v-if="photosPending || categoryPending || sessionPending">Loading...</div>
    <div v-else-if="photosError || categoryError || sessionError">{{ error.message }}</div>
    <div v-else>
        <div class="mb-9">
            <div class="my-6 flex gap-2 flex-wrap">
                <div>
                    <span>/</span>
                    <NuxtLink class="ml-2" to="/">Strona główna</NuxtLink>
                </div>
                <div>
                    <span>/</span>
                    <NuxtLink class="ml-2" to="/portfolio">portfolio</NuxtLink>
                </div>
                <div>
                    <span>/</span>
                    <NuxtLink class="ml-2" :to="'/portfolio/' + category.slug"><span class="mx-2">{{ category.name.toLowerCase() }}</span></NuxtLink>
                </div>
                <div>
                    <span>/</span>
                    <span class="ml-2">{{ session.name.toLowerCase() }}</span>
                </div>
            </div>
            <h1 class="section-header font-semibold text-center mb-4 md:mb-6">{{ session.name }}</h1>
            <p class="text-center xl:w-1/2 mx-auto">{{ session.desc }}</p>
            <div class="p-4 border border-black lg:w-1/3 mx-auto mt-6">
                <p v-if="session.models">
                    / Model:
                    <span v-for="(link, name) in session.models" :key="name">
                        <template v-if="link">
                            <a :href="link" target="_blank" class="underline">@{{ name }}</a>
                        </template>
                        <template v-else>
                            {{ name }}
                        </template>
                        <span v-if="Object.keys(session.models).length > 1 && name !== Object.keys(session.models).pop()">, </span>
                    </span>
                </p>
                <p v-if="session.camera">
                    <span>{{ session.camera.length > 1 ? '/ Aparaty: ' : '/ Aparat: ' }}</span>
                    <span>{{ session.camera.join(', ') }}</span>
                </p>
                <p v-if="session.film">
                    <span>{{ session.film.length > 1 ? '/ Filmy: ' : '/ Film: ' }}</span>
                    <span>{{ session.film.join(', ') }}</span>
                </p>
                <p v-if="session.lens">
                    <span>{{ session.lens.length > 1 ? '/ Obiektywy: ' : '/ Obiektyw: ' }}</span>
                    <span>{{ session.lens.join(', ') }}</span>
                </p>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div v-for="(group, index) in groupedPhotos" :key="index" class="flex flex-col gap-4">
                <div v-for="(photo, photoIndex) in group" :key="photoIndex" class="photo">
                    <NuxtImg format="avif" placeholder :src="photo.src" :alt="photo.alt" class="w-full h-auto object-cover" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const session_slug = useRoute().params['sessionslug'];
const category_slug = useRoute().params['categoryslug'];

const { data: session, pending: sessionPending, error: sessionError } = await useAsyncData(`session-${session_slug}`, async () => {
    return await useSupabaseFetch('sessions', { slug: session_slug }, true)
});

const { data: category, pending: categoryPending, error: categoryError } = await useAsyncData(`category-${category_slug}`, async () => {
    return await useSupabaseFetch('categories', { slug: category_slug }, true)
});

const { data: photos, pending: photosPending, error: photosError } = await useAsyncData(`photos-${session_slug}`, async () => {
    return await useSupabaseFetch('photos', { session_id: session.value.id })
});

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
