<template>
    <div>
        <div class="my-6">
            <span>/</span>
            <NuxtLink class="mx-2" to="/">strona główna</NuxtLink>
            <span>/</span>
            <span class="ml-2">sesje</span>
        </div>
        <h1 class="section-header text-center">Sesje</h1>
        <div class="grid grid-cols-6 gap-6 xl:gap-12 mt-6 lg:mt-12 mb-24">
            <img class="col-span-6 lg:col-span-3" src="https://invicpjbigavhuttylvh.supabase.co/storage/v1/object/public/photo-portfolio/rozne/60760009.jpg"/>
        </div>
        <h2 class="section-header lg:text-center mb-6 lg:mx-6">Co możemy razem zrobić</h2>
        <p class="border border-black p-4 mb-6 lg:mb-12 w-full md:w-2/3 mx-auto">
            Jeśli chcesz uzyskać zdjęcia w niepowtaralnym klimacie i o wyróżniającej się estetyce to średni format jest świetnym narzędziem. Jestem otwarty na wszelkie formy fotografii, nie tylko portretowej. Zgłoś się do mnie i na pewno coś wymyślimy.
        </p>
        <div class="grid grid-cols-6 gap-9 xl:gap-12">
            <div class="col-span-6 md:col-span-3 lg:col-span-2">
                <img src="https://invicpjbigavhuttylvh.supabase.co/storage/v1/object/public/photo-portfolio/wika%20studio/ws1.jpg"/>
                <p class="text-2xl font-semibold my-2 xl:my-4">sesje w studiu</p>
                <p>Klimatyczne sesje w studiu w wybranym stylu i ustalonym wcześniej klimacie.</p>
            </div>
            <div class="col-span-6 md:col-span-3 lg:col-span-2">
                <img src="https://invicpjbigavhuttylvh.supabase.co/storage/v1/object/public/photo-portfolio/botaniczny/ob4.jpg"/>
                <p class="text-2xl font-semibold my-2 xl:my-4">sesje plenerowe</p>
                <p>Wolisz ruszyć w teren? Nie ma problemu, zdjęcia w niecodziennych lokalizacjach to coś, co lubię.</p>
            </div>
            <div class="col-span-6 md:col-span-3 lg:col-span-2">
                <img src="https://invicpjbigavhuttylvh.supabase.co/storage/v1/object/public/photo-portfolio/czarnogora%202024/0018_15A.jpg?t=2024-09-15T22%3A10%3A45.305Z"/>
                <p class="text-2xl font-semibold my-2 xl:my-4">sesje okolicznościowe</p>
                <p>Chcesz uchwycić ważny moment w twoim życiu? Oki.</p>
            </div>
            <div class="col-span-6 md:col-span-3 lg:col-span-2">
                <img src="https://invicpjbigavhuttylvh.supabase.co/storage/v1/object/public/photo-portfolio/rozne/60860011.jpg"/>
                <p class="text-2xl font-semibold my-2 xl:my-4">sesje produktowe</p>
                <p>Tworzysz coś ciekawego i chciałbyś się tym podzielić ze światem? Z wielką chęcią to uwiecznię na zdjęciach.</p>
            </div>
        </div>
        <SessionContactForm />
    </div>
</template>

<script setup>

</script>