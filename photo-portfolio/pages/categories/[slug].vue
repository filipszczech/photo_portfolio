<template>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
        <div class="w-full mb-12 xl:mb-12 grid grid-cols-3 gap-12">
            <div class="col-span-2">
                <h1 class="text-6xl font-semibold mb-6">{{ category.name }}</h1>
                <div class="border border-black p-4">
                    {{ category.desc }}
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-12">
            <div v-for="session in sessions" :key="session.slug" class="">
                <!-- <h2 class="text-2xl xl:text-4xl font-bold mb-3">{{ session.name }}</h2> -->
                <ImageCard :src="session.img" :desc="'/ ' + session.name" :link="'/sessions/' + session.slug" />
            </div>
        </div>
    </div>
</template>

<script setup>

    const { slug } = useRoute().params;
    const supabase = useSupabaseClient();

    const category = ref(null)
    const sessions = ref([])
    const loading = ref(true)
    const error = ref(null)

    const fetchCategoryAndSessions = async () => {
        loading.value = true
        error.value = null

        try {
            // Fetch category data
            const { data: categoryData, error: categoryError } = await supabase
                .from('categories')
                .select('*')
                .eq('slug', slug)
                .single()

            if (categoryError) {
                throw new Error('Error fetching category: ' + categoryError.message)
            }

            category.value = categoryData

            // Fetch sessions data
            const { data: sessionsData, error: sessionsError } = await supabase
                .from('sessions')
                .select('*')
                .eq('category_id', categoryData.id)

            if (sessionsError) {
                throw new Error('Error fetching sessions: ' + sessionsError.message)
            }

            sessions.value = sessionsData
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
        title: "Gluciak.pl | ",
        meta: [
            { name: 'description', content: 'Na tej podstronie znajdują się zdjęcia z mojego portfolio.' }
        ]
    });

</script>