<template>
    <GridContainer>
        <div v-for="category in categories" :key="category.id">
            <ImageCard :src="category.img" :desc="'/ ' + category.name" :link="'/categories/' + category.slug" />
        </div>
    </GridContainer>
</template>

<script setup>
    const categories = ref([]);
    const categoriesLoading = ref(true);
    const categoriesError = ref(null);

    const fetchCategories = async () => {
        categoriesLoading.value = true;
        categoriesError.value = null;

        try {
            const categoriesData = await useSupabaseFetch('categories');
            categories.value = categoriesData;
        } catch (err) {
            categoriesError.value = err.message;
        } finally {
            categoriesLoading.value = false;
        }
    }

    onMounted(() => {
        fetchCategories()
    })
</script>