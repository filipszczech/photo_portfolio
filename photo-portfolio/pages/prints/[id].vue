<template>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
        <div class="my-9 grid grid-cols-2 gap-12">
            <div>
                <img :src="print.src" />
            </div>
            <div>
                <h1 class="text-5xl font-semibold mb-6">{{ print.name }}</h1>
                <div class="mb-6">
                    <p>{{ print.desc }}</p>
                </div>
                <div class="mb-6">
                    <p class="text-xl mb-2">Ramka</p>
                    <select v-model="selectedBorder" class="w-48 p-2 bg-inherit border-[1px] border-black">
                        <option :value="'whiteBorder'">Biała ramka</option>
                        <option :value="'noBorder'">Bez ramki</option>
                    </select>
                </div>
                <div class="mb-6">
                    <p class="text-xl mb-2">Rozmiar</p>
                    <select v-model="selectedSize" class="w-48 p-2 bg-inherit border-[1px] border-black">
                        <option v-for="(size, index) in print.sizes" :key="index" :value="size">
                            {{ size }}
                        </option>
                    </select>
                </div>
                <div class="mb-6">
                    <p class="mb-3">Specyfikacje</p>
                    <ul class="list-disc">
                        <li class="ml-6">Fujicolor Crystal Deep Matte Velvet Paper</li>
                        <li class="ml-6">210gsm</li>
                        <li class="ml-6">Papier półmatowy wysokiej jakości</li>
                        <li class="ml-6">Każdy print jest starannie zapakowany i przetestowany</li>
                        <li class="ml-6">Wymiary dobrałem tak, aby łatwo było dobrać ramkę</li>
                    </ul>
                </div>
                <button class="bg-transparent w-48 py-2 border border-black hover-scale-105">zamów print</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    const { id } = useRoute().params;
    const supabase = useSupabaseClient();

    const print = ref(null);
    const error = ref(null);
    const loading = ref(true);
    const selectedSize = ref('');
    const selectedBorder = ref('whiteBorder');

    const fetchPrint = async () => {
        loading.value = true
        error.value = null

        try {
            const { data: printData, error: printError } = await supabase
                .from('prints')
                .select('*')
                .eq('slug', id)
                .single()

            if (printError) {
                throw new Error('Error fetching print: ' + printError.message)
            }
            print.value = printData

        } catch (err) {
            error.value = err.message
        } finally {
            loading.value = false
            selectedSize.value = print.value.sizes[0];
        }
    }

    onMounted(() => {
        fetchPrint()
    })

    useHead({
        title: "Gluciak.pl | " + print.name
    });

    if(!print) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Nie znaleziono printa o takiej nazwie.',
            fatal: true
        });
    };

</script>