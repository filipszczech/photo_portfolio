<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
        <div v-if="$slots.header" class="col-span-full">
            <slot name="header"></slot>
        </div>
        <div v-if="$slots.text" class="col-span-1 sm:col-span-2">
            <div class="p-4 border border-black w-full">
                <slot name="text"></slot>
            </div>
        </div>
        <div v-if="$slots.text" class="hidden lg:block"></div>
        <slot />
    </div>
</template>

<script setup>

</script>