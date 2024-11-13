<template>
    <GridContainer>
        <div v-for="category in categories" :key="category.id">
            <ImageCard :src="category.img" :desc="'/ ' + category.name" :link="'/portfolio/' + category.slug" />
        </div>
    </GridContainer>
</template>

<script setup>
    defineProps({
        categories: Array
    });
</script>