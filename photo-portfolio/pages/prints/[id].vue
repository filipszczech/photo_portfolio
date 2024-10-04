<template>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">{{ error.message }}</div>
    <div v-else>
        <div class="mt-6 mb-9">
            <span>/</span>
            <NuxtLink class="mx-2" to="/">strona główna</NuxtLink>
            <span>/</span>
            <NuxtLink class="mx-2" to="/prints">printy</NuxtLink>
            <span>/</span>
            <span class="ml-2">{{ print.name.toLowerCase() }}</span>
        </div>
        <div class="mb-9 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
            <div>
                <NuxtImg format="avif" placeholder class="w-full" v-if="selectedBorder === 'noBorder'" :src="print.src" :alt="'print - ' + print.name" />
                <NuxtImg format="avif" placeholder class="w-full" v-else-if="selectedBorder === 'whiteBorder'" :src="print.src_border" :alt="'print - ' + print.name" />
            </div>
            <div>
                <h1 class="section-header font-semibold mb-3 lg:mb-6">{{ print.name }}</h1>
                <div class="mb-3 lg:mb-6">
                    <p>{{ print.desc }}</p>
                </div>
                <div class="mb-3 lg:mb-6">
                    <p>Cena: {{ print.sizes[selectedSize] }}zł</p>
                </div>
                <div class="mb-3 lg:mb-6">
                    <p class="text-xl mb-2">Ramka</p>
                    <div class="relative w-48 bg-inherit border-[1px] border-black">
                        <select v-model="selectedBorder" class="w-full bg-transparent p-2">
                            <option :value="'whiteBorder'">Biała ramka</option>
                            <option :value="'noBorder'">Bez ramki</option>
                        </select>
                        <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="mb-3 lg:mb-6 relative">
                    <p class="text-xl mb-2">Rozmiar</p>
                    <div class="relative w-48 bg-inherit border-[1px] border-black">
                        <select v-model="selectedSize" class="w-full bg-transparent p-2">
                            <option v-for="(price, size) in print.sizes" :key="size" :value="size">
                                {{ size }}
                            </option>
                        </select>
                        <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="mb-3 lg:mb-6">
                    <p class="mb-3">Specyfikacje</p>
                    <ul class="list-disc">
                        <li class="ml-6">Fujicolor Crystal Deep Matte Velvet Paper</li>
                        <li class="ml-6">210gsm</li>
                        <li class="ml-6">Papier półmatowy wysokiej jakości</li>
                        <li class="ml-6">Każdy print jest starannie zapakowany i przetestowany</li>
                        <li class="ml-6">Wymiary dobrałem tak, aby łatwo było dopasować ramkę</li>
                    </ul>
                </div>
                <button @click="openModal" class="bg-transparent w-48 py-2 border border-black hover-scale-105">zamów print</button>
            </div>
        </div>
        <PrintModal
            :showModal="isModalVisible"
            :selectedSize="selectedSize"
            :selectedBorder="selectedBorder"
            :price="print.sizes[selectedSize]"
            @close="isModalVisible = false"
            @submit="handleSubmit"
        />
    </div>
</template>

<script setup>
    const { id } = useRoute().params;

    const selectedSize = ref('');
    const selectedBorder = ref('whiteBorder');
    const isModalVisible = ref(false);
    const mail = useMail();

    const { data: print, pending, error } = await useAsyncData('print', () =>
        useSupabaseFetch('prints', { slug: id }, true)
    );

    if (print.value) {
        selectedSize.value = Object.keys(print.value.sizes)[0];
        useSetSeoData({
            title: print.value.name,
            description: `print na sprzedaż: ${print.value.name.toLowerCase()}.`,
            image: print.value.src,
        });
    }

    const openModal = () => {
        isModalVisible.value = true;
    };

    const handleSubmit = (formData) => {
        console.log('Zamówienie:', formData);

        mail.send({
            from: formData.email,
            subject: `Zamówienie printa od ${formData.email}.`,
            text: `
                Dane dotyczące zamówienia:
                Imię i nazwisko: ${formData.name}
                Email: ${formData.email}
                Numer telefonu: ${formData.phone ? formData.phone : '-'}
                Nazwa printa: ${print.value.name}
                Rozmiar printa: ${selectedSize.value}
                Ramka: ${selectedBorder.value === 'whiteBorder' ? 'z ramką' : 'bez ramki'}
            `,
        })
    };
</script>

<style>
    .is-invalid {
        background-color: red;
    }
    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }
</style>
