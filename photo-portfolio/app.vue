<template>
    <div class="font-mono min-h-screen bg-[#EFEEEA]">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script setup>
    import 'primeicons/primeicons.css'
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
