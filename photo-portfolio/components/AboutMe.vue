<template>
    <div class="w-full grid lg:grid-cols-3 gap-6 xl:gap-12 mt-16 xl:mt-32">
        <div class="">
            <h2 class="section-header font-semibold">O mnie</h2>
        </div>
        <div class="col-span-2 grid lg:grid-cols-2 gap-12">
            <div class="flex flex-col justify-between">
                <div></div>
                <div>
                    <p class="mr-6 text-xl md:text-2xl mb-3 font-semibold">Jestem fotografem z przypadku.</p>
                    <p class="p-4 border border-black" v-html="contentStore.introText"></p>
                </div> 
                <div class="text-xl mt-3 font-semibold">/ portfolio</div>
            </div>
            <div class="w-full sm:w-1/2 lg:w-full my-auto">
                <img src="/img/ob/ob3.jpg" />
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useContentStore } from '~/stores/content'
    const contentStore = useContentStore()
</script>

<style lang="scss" scoped>

</style>