<template :key="category.id">
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">{{ error.message }}</div>
    <div v-else>
        <div class="w-full mt-6 mb-6 xl:mb-12 grid grid-cols-3 gap-12">
            <div class="col-span-3 lg:col-span-2">
                <div class="mb-6">
                    <span>/</span>
                    <NuxtLink class="mx-2" to="/">strona główna</NuxtLink>
                    <span>/</span>
                    <NuxtLink class="mx-2" to="/portfolio">portfolio</NuxtLink>
                    <span>/</span>
                    <span class="ml-2">{{ category.name.toLowerCase() }}</span>
                </div>
                <h1 class="text-6xl font-semibold mb-6">{{ category.name }}</h1>
                <div class="border border-black p-4">
                    {{ category.desc }}
                </div>
            </div>
        </div>
        <GridContainer>
            <div v-for="session in sessions" :key="session.slug" class="">
                <ImageCard :src="session.img" :desc="'/ ' + session.name" :link="'/sessions/' + session.slug" />
            </div>
        </GridContainer>
    </div>
</template>

<script setup>
    const { slug } = useRoute().params;

    const { data: category, pending, error } = await useAsyncData('category', () =>
        useSupabaseFetch('categories', { slug: slug }, true)
    );

    const { data: sessions } = await useAsyncData('sessions', () =>
        useSupabaseFetch('sessions', { category_id: category.value.id })
    );

    if (category.value) {
        useSetSeoData({
            title: category.value.name,
            description: `zdjęcia z kategorii ${category.value.name.toLowerCase()}.`,
            image: category.value.img,
        });
    }

    if (!category.value) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Nie znaleziono kategorii o takiej nazwie.',
            fatal: true
        });
    }
</script>
