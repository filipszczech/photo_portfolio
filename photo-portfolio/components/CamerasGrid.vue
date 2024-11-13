<template>
    <GridContainer>
        <div v-for="camera in cameras" :key="camera.id" class="">
            <ImageCard :src="camera.img" :desc="'/ ' + camera.name" link="/cameras" />
        </div>
    </GridContainer>
</template>

<script setup>
    defineProps({
        cameras: Array
    });
</script>