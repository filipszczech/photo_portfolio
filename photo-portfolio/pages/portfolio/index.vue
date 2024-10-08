<template>
    <div>
        <div class="my-6">
            <span>/</span>
            <NuxtLink class="mx-2" to="/">strona główna</NuxtLink>
            <span>/</span>
            <span class="ml-2">portfolio</span>
        </div>
        <h1 class="section-header my-6">Portfolio</h1>
        <div class="grid grid-cols-3 gap-6 lg:gap-12 mb-6 lg:mb-12">
            <div class="p-4 border border-black col-span-3 lg:col-span-2">
                <p>Poniżej znajdziesz zrealizowane przeze mnie sesje. Podzieliłem je tematycznie oraz na sprzęt, którym były realizowane.</p>
            </div>
        </div>
        <div v-if="categoriesPending">Loading...</div>
        <div v-else-if="categoriesError">{{ categoriesError.message }}</div>
        <div v-else class="mb-12 lg:mb-24">
            <GridContainer>
                <div v-for="category in categories" :key="category.id">
                    <ImageCard :src="category.img" :desc="'/ ' + category.name" :link="'/categories/' + category.slug" />
                </div>
            </GridContainer>
        </div>
        <h2 class="section-header mb-6">Aparaty</h2>
        <div class="grid grid-cols-3 gap-6 lg:gap-12 mb-6 lg:mb-12">
            <div class="p-4 border border-black col-span-3 lg:col-span-2">
                <p>Jeśli Cię to interesuje to tutaj znajdziesz zdjęcia z podziałem na aparat oraz film, którymi zostały wykonane. Opisałem także wrażenia z ich korzystania.</p>
            </div>
        </div>
        <div v-if="camerasPending">Loading...</div>
        <div v-else-if="camerasError">{{ camerasError.message }}</div>
        <div v-else class="mb-12 lg:mb-24">
            <GridContainer>
                <div v-for="camera in cameras" :key="camera.id" class="">
                    <ImageCard :src="camera.img" :desc="'/ ' + camera.name" :link="'/portfolio/' + camera.slug" />
                </div>
            </GridContainer>
        </div>
    </div>
</template>

<script setup>
    useHead({
        title: 'Gluciak.pl | portfolio'
    });

    const { data: categories, pending: categoriesPending, error: categoriesError } = await useAsyncData('categories', () =>
        useSupabaseFetch('categories')
    );

    const { data: cameras, pending: camerasPending, error: camerasError } = await useAsyncData('cameras', () => 
        useSupabaseFetch('cameras')
    );

    useSetSeoData({
        title: 'portfolio',
        description: `zobacz moje portfolio.`,
    });
</script>