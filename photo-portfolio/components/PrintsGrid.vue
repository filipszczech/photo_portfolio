<template>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
        <GridContainer>
            <div v-for="(print, printIndex) in prints" :key="printIndex">
                <NuxtLink :to="'/prints/' + print.slug">
                    <img :src="print.src_border" alt="print" class="cursor-pointer hover:shadow-xl transition-all duration-500" />
                </NuxtLink>
                <NuxtLink :to="'/prints/' + print.slug">
                    <p class="text-center mt-2">{{ print.name }}</p>
                </NuxtLink>
            </div>
        </GridContainer>
    </div>
</template>

<script setup>

    const props = defineProps({
        limit: {
            type: Number,
            default: null
        },
        horizontal: {
            type: Boolean,
            default: null
        }
    });

    const supabase = useSupabaseClient();

    const prints = ref([]);
    const error = ref(null);
    const loading = ref(true);

    const fetchPrints = async () => {
        loading.value = true;
        error.value = null;
        console.log(props.horizontal)

        try {
            let query = supabase
                .from('prints')
                .select();

            if (props.limit !== null) {
                query = query.limit(props.limit);
            }

            if(props.horizontal === true) {
                query = query.eq("horizontal", true)
            }
            else if(props.horizontal === false) {
                query = query.eq("horizontal", false)
            }

            const { data: printsData, error: printsError } = await query;

            if (printsError) {
                throw new Error('Error fetching print: ' + printsError.message)
            }
            prints.value = printsData

        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
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