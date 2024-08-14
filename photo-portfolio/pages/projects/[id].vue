<template>
    <div>
        <p>Project details {{ id }}</p>
    </div>
</template>

<script setup>
    const { id } = useRoute().params
</script>

<style lang="scss" scoped>

</style>