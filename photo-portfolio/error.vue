<template>
    <div class="mx-4">
        <h1 class="text-7xl font-bold my-12 xl:my-16 text-center">Status błędu: {{ error.statusCode }}</h1>
        <div class="mx-auto max-w-7xl p-4 border-[1px] border-black">
            <p class="md:text-xl font-semibold">Wystąpił błąd! :(</p>
            <p v-if="error.statusCode === 404" class="md:text-xl font-semibold">Podana strona nie istnieje</p>
            <p class="md:text-xl font-semibold">Treść błędu: {{ error.message }}</p>
            <div @click="handleClearError" class="mx-auto w-fit my-6 border-[1px] border-black px-12 py-4 md:text-xl font-semibold hover-scale-105">/ powrót do strony głównej</div>
        </div>
    </div>
</template>

<script setup>
    defineProps(['error']);
    const handleClearError = () => clearError({ redirect: '/' });
</script>

<style scoped>

</style>