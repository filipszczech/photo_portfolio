<template>
    <div>
        <h1 class="text-4xl lg:text-6xl font-semibold mb-6">Portfolio.</h1>
        <div class="grid grid-cols-3 gap-6 lg:gap-12">
            <div class="p-4 border border-black col-span-3 lg:col-span-2">
                <p>Poniżej znajdziesz zrealizowane przeze mnie sesje. Podzieliłem je tematycznie oraz na sprzęt, którym były realizowane.</p>
            </div>
            <div class="col-span-3 mb-12">
                <CategoriesGrid />
            </div>
        </div>
        <h2 class="text-4xl lg:text-6xl font-semibold mb-6">Aparaty.</h2>
        <div class="grid grid-cols-3 gap-6 lg:gap-12">
            <div class="p-4 border border-black col-span-3 lg:col-span-2">
                <p>Jeśli Cię to interesuje to tutaj znajdziesz zdjęcia z podziałem na aparat oraz film, którymi zostały wykonane. Opisałem także wrażenia z ich korzystania.</p>
            </div>
            <div class="col-span-3 mb-12">
                <CamerasGrid />
            </div>
        </div>
    </div>
</template>

<script setup>
    useHead({
        title: 'Gluciak.pl | portfolio'
    });
</script>