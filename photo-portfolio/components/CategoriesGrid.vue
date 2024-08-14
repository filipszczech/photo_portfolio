<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xl:gap-12">
        <div v-for="category in categories" :key="category.id">
            <ImageCard :src="category.img" :desc="'/ ' + category.name" :link="'/categories/' + category.slug" />
        </div>
    </div>
</template>

<script setup>
    const supabase = useSupabaseClient();

    const categories = ref([])
    const categoriesLoading = ref(true)
    const categoriesError = ref(null)

    const fetchCategories = async () => {
        categoriesLoading.value = true
        categoriesError.value = null

        try {
            const { data: categoriesData, error: categoriesError } = await supabase
                .from('categories')
                .select();

            if (categoriesError) {
                throw new Error('Error fetching categories: ' + categoriesError.message)
            }
            categories.value = categoriesData
        } catch (err) {
            categoriesError.value = err.message
        } finally {
            categoriesLoading.value = false
        }
    }

    onMounted(() => {
        fetchCategories()
    })
</script>