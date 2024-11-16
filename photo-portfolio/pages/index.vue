<template>
    <div>
        <div class="grid lg:grid-cols-3 gap-4 xl:gap-12 mt-9 mb-12 xl:mb-32">
            <NuxtImg class="lg:col-span-2 w-full order-2 lg:order-1" format="avif" src="https://invicpjbigavhuttylvh.supabase.co/storage/v1/object/public/photo-portfolio/rozne/homepage_main.png" alt="my photo" /> 
            <div class="flex flex-col justify-end order-1 lg:order-2">
                <h1 class="section-header mb-6">Hejka :)</h1>
                <div class="p-4 border border-black w-full">
                    <p>Witam na stronie poświęconej mojej twórczości.<br>Mam na imię Filip, miło mi Cię poznać.</p>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-12">
            <div class="flex flex-col justify-end lg:col-span-2">
                <h1 class="section-header mb-6">Foty</h1>
                <div class="p-4 border border-black mb-6 xl:mb-12">
                    <p class="">Tutaj znajdziesz zdjęcia, które wykonałem. Zapraszam do sprawdzenia. :)</p>
                    <p class="mt-3">Głównym tematem zdjęć, które robię są ludzie i moje otoczenie, ale zdarzają się odstępstwa. Kiedy gdzieś jadę, zawsze mam pod ręką aparat.</p>
                    <NuxtLink to='/portfolio'>
                        <p class="text-lg mt-3 font-semibold">/ portfolio.</p>
                    </NuxtLink>
                </div>
            </div>
            <div></div>
        </div>
        <div class="mb-16 xl:mb-32">
            <div v-if="categoriesPending">Loading...</div>
            <div v-else-if="categoriesError">{{ error }}</div>
            <CategoriesGrid v-else :categories="categories" />
        </div>
        <AboutMe />
        <SessionSection />
        <!-- <div class="mt-16 xl:mt-32 grid grid-cols-3 gap-6 xl:gap-12">
            <div class="col-span-3 lg:col-span-2">
                <h2 class="section-header mb-6">Sprzęt</h2>
                <div class="p-4 border border-black">
                    <p class="">Posługuję się praktycznie tylko aparatami analogowymi.</p>
                    <p class="mt-3">Na codzień używam moich dwóch głównych sprzętów: Nikon FG oraz Mamiya 645.<br>Nikon jest aparatem małoformatowym i ze względu na to oraz jego poręczność towarzyszy mi na wyjazdach oraz przy luźniejszych projektach.<br>Kiedy zależy mi na jak najlepszej jakości i mogę sobie na to pozwolić, sięgam po średni format - Mamiyę.</p>
                </div>
            </div>
            <div class="col-span-3">
                <div v-if="camerasPending">Loading...</div>
                <div v-else-if="camerasError">{{ error }}</div>
                <CamerasGrid v-else :cameras="cameras" />
            </div>
        </div> -->
        <div class="mt-16 xl:mt-32">
            <div class="grid grid-cols-3 gap-6 xl:gap-12">
                <div class="col-span-3 lg:col-span-2">
                    <h2 class="section-header mb-6">Printy</h2>
                    <div class="p-4 border border-black w-full mb-6 xl:mb-12">
                        <p class="mb-6">Planuję wrzucać tutaj serie tematycznych printów. Na początek zdjęcia z wyjazdu z przyjaciółmi wokół Bałkanów. Mam nadzieję, że Ci się spodobają. :)</p>
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
    useSeoMeta({
        description: 'Filip Szczęch - strona główna portfolio fotograficznego.',
        ogTitle: 'Gluciak.pl - homepage',
        ogDescription: 'Filip Szczęch - strona główna portfolio fotograficznego.',
        ogImage: 'https://invicpjbigavhuttylvh.supabase.co/storage/v1/object/public/photo-portfolio/rozne/60760009.jpg',
        ogUrl: '[og:url]',
        twitterTitle: 'strona główna',
        twitterDescription: 'Filip Szczęch - strona główna portfolio fotograficznego.',
        twitterImage: 'https://invicpjbigavhuttylvh.supabase.co/storage/v1/object/public/photo-portfolio/rozne/60760009.jpg',
        twitterCard: 'summary',
    });

    useHead({
        title: "Gluciak.pl",
        meta: [
            { name: 'description', content: 'Strona główna mojego portfolio fotograficznego.' }
        ],
        htmlAttrs: {
            lang: 'pl'
        },
        link: [
            {
            rel: 'icon',
            type: 'image/png',
            href: '/favicon2.png'
            }
        ]
    });

    const { data: categories, pending: categoriesPending, error: categoriesError } = useAsyncData('categories', async () => {
        return await useSupabaseFetch('categories');
    });

    const { data: cameras, pending: camerasPending, error: camerasError } = useAsyncData('cameras', async () => {
        return await useSupabaseFetch('cameras');
    });
</script>

<style scoped>

</style>