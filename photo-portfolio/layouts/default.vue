<template>
    <div>
        <header>
            <nav class="fixed top-0 w-full bg-[#EFEEEA] z-50">
                <div class="w-full flex justify-between items-center bg-[#EFEEEA] px-4 py-8 xl:px-12 xl:py-12">
                    <a href="https://www.instagram.com/gluciakpl/" target="_blank">
                        <i class="pi pi-instagram hover-scale-105" style="color: black; font-size: 1.5rem"></i>
                    </a>
                    <NuxtLink to="/" class="absolute-center">
                        <div class="text-2xl font-bold h-10">
                            <img class="h-full" src="/img/logo3.png" />
                        </div>
                    </NuxtLink>
                    <!-- Hamburger menu icon for small screens -->
                    <div class="lg:hidden hover-scale-105" @click="toggleMenu">
                        <i class="pi pi-bars" style="font-size: 1.5rem; color: black"></i>
                    </div>
                    <!-- Navigation links for larger screens -->
                    <ul class="navbar-links hidden lg:flex gap-9 xl:gap-12 font-semibold">
                        <li v-for="(link, index) in navLinks" :key="index">
                            <NuxtLink :to="link.link" class="hover-scale-105">{{ link.name }}</NuxtLink>
                        </li>
                    </ul>
                </div>
                <!-- Slide-out menu for small screens -->
                <transition name="slide-down">
                    <ul v-if="isMenuOpen" class="flex flex-col justify-center items-end gap-4 lg:hidden bg-[#EFEEEA] p-4">
                        <li v-for="(link, index) in navLinks" :key="index">
                            <NuxtLink :to="link.link" @click="toggleMenu" class="hover-scale-105">{{ link.name }}</NuxtLink>
                        </li>
                    </ul>
                </transition>
            </nav>
        </header>
        <div class="p-6 xl:p-12 mt-16 lg:mt-24 max-w-[92rem] mx-auto">
            <slot />
        </div>
        <footer class="px-4 py-4 xl:px-12 xl:py-9">
            <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
                <div class="order-2 lg:order-1">
                    <p class="text-center xl:text-left">Designed and coded by Filip Szczęch.</p>
                </div>
                <ul class="order-1 xl:order-2 flex flex-wrap mx-auto justify-center gap-4 2xl:gap-7 font-semibold">
                    <li v-for="(link, index) in footerLinks" :key="index" class="flex gap-4 2xl:gap-7">
                        <NuxtLink :to="link.link" class="hover-scale-105">{{ link.name }}</NuxtLink>
                        <div v-if="index < footerLinks.length - 1">/</div>
                    </li>
                </ul>
                <div class="order-3 flex justify-end mx-auto xl:mx-0">
                    <a href="https://www.instagram.com/gluciakpl/" target="_blank">
                        <i class="pi pi-instagram hover-scale-105" style="color: black; font-size: 1.5rem"></i>
                    </a>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { useNavigationStore } from '~/stores/navigation'

    const isMenuOpen = ref(false)
    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value
    }

    const navigationStore = useNavigationStore()
    const navLinks = navigationStore.navLinks
    const footerLinks = navigationStore.footerLinks
</script>

<style scoped>
    .slide-down-enter-active, .slide-down-leave-active {
        transition: all 0.5s ease;
    }

    .slide-down-enter-from, .slide-down-leave-to {
        opacity: 0;
        max-height: 0;
    }

    .slide-down-enter-to, .slide-down-leave-from {
        opacity: 1;
        max-height: 300px;
    }

    footer .router-link-exact-active {
        border-bottom: 1px solid;
    }

    .navbar-links .router-link-exact-active {
        border-bottom: 1px solid;
    }
    .absolute-center {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

</style>