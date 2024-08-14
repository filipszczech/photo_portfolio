<template>
    <!-- <div class="border-[0.12rem] border-black p-5 hover:shadow-xl transition-all duration-300"> -->
    <div class="">
        <div class="overflow-hidden">
            <template v-if="link">
                <NuxtLink :to="link">
                    <img :src="src" :alt="desc" class="w-full cursor-pointer hover:scale-105 transition-all duration-300" />
                </NuxtLink>
            </template>
            <template v-else>
                <img :src="src" :alt="desc" class="cursor-pointer hover:scale-105 transition-all duration-300" />
            </template>
        </div>
        <p v-if="desc" class="font-semibold xl:text-lg mt-5">{{ desc }}</p>
    </div>
</template>

<script setup>
    const props = defineProps({
        src: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: false
        },
        link: {
            type: String,
            required: false
        }
    });
</script>