<template>
    <div>
      <GridContainer>
        <div v-for="(print, printIndex) in prints" :key="printIndex">
          <NuxtLink :to="'/prints/' + print.slug">
            <NuxtImg format="avif" :src="print.src_border" alt="print" class="cursor-pointer hover:shadow-xl transition-all duration-500" />
          </NuxtLink>
          <NuxtLink :to="'/prints/' + print.slug">
            <p class="text-center mt-2">{{ print.name }}</p>
          </NuxtLink>
        </div>
      </GridContainer>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    prints: {
      type: Array,
      required: true
    }
  });
  </script>
  