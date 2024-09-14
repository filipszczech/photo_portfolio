<template>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="grid grid-cols-3 gap-12 mt-12 items-center">
        <div v-for="(print, printIndex) in prints" :key="printIndex">
            <NuxtLink :to="'/prints/' + print.slug">
                <img :src="print.src" alt="print" class="cursor-pointer hover:shadow-xl transition-all duration-500" />
            </NuxtLink>
            <NuxtLink :to="'/prints/' + print.slug">
                <p class="text-center mt-2">{{ print.name }}</p>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
    const supabase = useSupabaseClient();

    const prints = ref([])
    const error = ref(null)
    const loading = ref(true)

    const fetchPrints = async () => {
        loading.value = true
        error.value = null

        try {
            const { data: printsData, error: printsError } = await supabase
                .from('prints')
                .select()

            if (printsError) {
                throw new Error('Error fetching print: ' + printsError.message)
            }
            prints.value = printsData

        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
            console.log(prints.value)
        }
    }

    onMounted(() => {
        fetchPrints()
    })

    // useHead({
    //     title: "Gluciak.pl | " + print.name
    // });

    if(!prints) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Bład podczas wczytywania printów.',
            fatal: true
        });
    };

</script>