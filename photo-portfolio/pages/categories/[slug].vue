<template>
    
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
        <!-- <Head>
            <Title>Gluciak.pl | {{ category.name }}</Title>
            <Meta name="description" content="Na tej podstronie znajdują się zdjęcia z mojego portfolio." />    
        </Head> -->
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
                <!-- <h2 class="text-2xl xl:text-4xl font-bold mb-3">{{ session.name }}</h2> -->
                <ImageCard :src="session.img" :desc="'/ ' + session.name" :link="'/sessions/' + session.slug" />
            </div>
        </GridContainer>
    </div>
</template>

<script setup>
    const { slug } = useRoute().params;
    const supabase = useSupabaseClient();

    const category = ref(null)
    const sessions = ref([])
    const loading = ref(true)
    const error = ref(null)
    const route = useRoute()

    const fetchCategoryAndSessions = async () => {
        loading.value = true
        error.value = null

        try {
            const categoryData = await useSupabaseFetch('categories', { slug: slug }, true);
            category.value = categoryData;

            const sessionsData = await useSupabaseFetch('sessions', { category_id: categoryData.id });
            sessions.value = sessionsData;
        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
        }
    }

    onMounted(() => {
        fetchCategoryAndSessions()
    })

    useHead({
        title: "Gluciak.pl | ...",
        meta: [
            { name: 'description', content: 'Na tej podstronie znajdują się zdjęcia z mojego portfolio.' }
        ]
    });

    useSeoMeta({
        description: `Filip Szczęch - zdjęcia z kategorii ${category.name}`,
        ogTitle: `Gluciak.pl - ${category.name}`,
        ogDescription: `Zobacz zdjęcia z kategorii ${category.name} na stronie Filip Szczęch.`,
        ogImage: category.image,
        ogUrl: `https://gluciak.pl/${route.fullPath}`,
        twitterTitle: `Kategoria: ${category.name}`,
        twitterDescription: `Portfolio Filip Szczęch - zdjęcia z kategorii ${category.name}.`,
        twitterImage: category.image,
        twitterCard: 'summary_large_image',
    })

    watch(
        () => category.value,
        (newCategory) => {
            if (newCategory && newCategory.name) {
                useHead({
                    title: "Gluciak.pl | " + newCategory.name.toLowerCase(),
                });
            }
        }
    );

</script>