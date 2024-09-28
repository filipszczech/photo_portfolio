<template>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
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
    const supabase = useSupabaseClient();

    const session = ref(null)
    const photos = ref([])
    const category = ref(null)
    const loading = ref(true)
    const error = ref(null)

    const fetchSessionAndPhotos = async () => {
        loading.value = true
        error.value = null
        try {
            const sessionData = await useSupabaseFetch('sessions', { slug: id }, true);
            session.value = sessionData
            const categoryData = await useSupabaseFetch('categories', { id: sessionData.category_id }, true);
            category.value = categoryData
            const photosData = await useSupabaseFetch('photos', { session_id: sessionData.id });
            photos.value = photosData
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

    onMounted(() => {
        fetchSessionAndPhotos()
    })

    useHead({
        title: "Gluciak.pl | " + session.name
    });

    
    useHead({
        title: "Gluciak.pl | ",
        meta: [
            { name: 'description', content: 'Na tej podstronie znajdują się zdjęcia z sesji.' }
        ]
    });

    watch(
        () => session.value,
        (newSession) => {
            if (newSession && newSession.name) {
                useHead({
                    title: "Gluciak.pl | " + newSession.name,
                });
            }
        }
    );

    if(!session) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Nie znaleziono sesji o takiej nazwie.',
            fatal: true
        });
    };

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