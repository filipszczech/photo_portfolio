<template>
    <div>
        <!-- <div class="grid lg:grid-cols-3 gap-4 xl:gap-12 mb-16 xl:mb-32">
            <div class="lg:col-span-3 relative flex justify-end order-2 lg:order-1">
                <div class="flex flex-col gap-6 w-1/2 mx-auto p-6 border border-black bg-white">
                    <img class="w-full " src="/img/10.png" alt="my photo" />
                    <h1 class="text-4xl lg:text-6xl font-semibold">Hejka :)</h1>
                    <p>Witam na stronie poświęconej mojej twórczości.<br>Mam na imię Filip, miło mi Cię poznać.</p>
                </div>
            </div>
        </div> -->
        <div class="grid lg:grid-cols-3 gap-4 xl:gap-12 mt-9 mb-12 xl:mb-32">
            <img class="col-span-2 w-full" src="/img/10.png" alt="my photo" /> 
            <div class="flex flex-col justify-end">
                <h1 class="section-header mb-6">Hejka :)</h1>
                <div class="p-4 border border-black w-full">
                    <p>Witam na stronie poświęconej mojej twórczości.<br>Mam na imię Filip, miło mi Cię poznać.</p>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-12">
            <div class="flex flex-col justify-end lg:col-span-2">
                <h1 class="section-header mb-6">Foty</h1>
                <div class="p-4 border border-black xl:mb-12">
                    <p class="">Tutaj znajdziesz zdjęcia, które wykonałem. Zapraszam do sprawdzenia. :)</p>
                    <p class="mt-3">Głównym tematem zdjęć, które robię są ludzie i moje otoczenie, ale zdarzają się odstępstwa. Kiedy gdzieś jadę, zawsze mam pod ręką aparat.</p>
                    <p class="text-lg mt-3 font-semibold">/ portfolio.</p>
                </div>
            </div>
            <div></div>
        </div>
        <div class="mb-16 xl:mb-32">
            <CategoriesGrid />
        </div>
        <AboutMe />
        <div class="mt-16 xl:mt-32 grid grid-cols-3 gap-6 xl:gap-12">
            <div class="col-span-3 lg:col-span-2">
                <h2 class="section-header mb-6">Sprzęt</h2>
                <div class="p-4 border border-black">
                    <p class="">Posługuję się praktycznie tylko aparatami analogowymi.</p>
                    <p class="mt-3">Na codzień używam moich dwóch głównych sprzętów: Nikon FG oraz Mamiya 645.<br>Nikon jest aparatem małoformatowym i ze względu na to oraz jego poręczność towarzyszy mi na wyjazdach oraz przy luźniejszych projektach.<br>Kiedy zależy mi na jak najlepszej jakości i mogę sobie na to pozwolić, sięgam po średni format - Mamiyę.</p>
                    <!-- <p class="text-xl mt-3 font-semibold">/ portfolio.</p> -->
                </div>
            </div>
            <div class="col-span-3">
                <CamerasGrid />
            </div>
        </div>
        <div class="mt-16 xl:mt-32">
            <div class="grid grid-cols-3 gap-6 xl:gap-12">
                <div class="col-span-2">
                    <h2 class="section-header mb-6">Printy</h2>
                    <div class="p-4 border border-black w-full mb-6 xl:mb-12">
                        <p class="mb-6">Printy Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci dolor natus eum beatae et enim molestias aut ab quam tenetur.</p>
                        <NuxtLink class="font-semibold w-fit" to="/prints"><p>/ zobacz wszystkie</p></NuxtLink>
                    </div>
                </div>
            </div>
            <PrintsGrid :limit="3" :horizontal="true" />
        </div>
        <ContactForm />
    </div>
</template>

<script setup>
</script>

<style scoped>

</style>