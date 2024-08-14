<template>
    <div>
        <header>
            <nav class="w-full bg-[#EFEEEA]">
                <div class="fixed top-0 w-full flex justify-between items-center bg-[#EFEEEA] p-4 xl:p-12 z-50">
                    <div>
                        <i class="pi pi-instagram hover-scale-105" style="color: black; font-size: 1.5rem"></i>
                    </div>
                    <NuxtLink to="/" class="absolute-center">
                        <div class="text-2xl font-bold h-10">
                            <img class="h-full" src="/img/logo3.png" />
                        </div>
                    </NuxtLink>
                    <ul class="navbar-links flex gap-9 xl:gap-12 font-semibold">
                        <li v-for="(link, index) in navLinks" :key="index">
                            <NuxtLink :to="link.link" class="hover-scale-105">{{ link.name }}</NuxtLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <div class="p-4 xl:p-12 mt-16 lg:mt-24 max-w-[92rem] mx-auto">
            <slot />
        </div>
        <footer class="p-4 xl:p-12">
            <div class="flex justify between">
                <div></div>
                <ul class="flex flex-wrap mx-auto justify-center gap-9 xl:gap-12 font-semibold">
                    <li v-for="(link, index) in footerLinks" :key="index" class="flex gap-9 xl:gap-12">
                        <NuxtLink :to="link.link" class="hover-scale-105">{{ link.name }}</NuxtLink>
                        <div v-if="index < footerLinks.length - 1">/</div>
                    </li>
                </ul>
                <div>
                    <i class="pi pi-instagram hover-scale-105" style="color: black; font-size: 1.5rem"></i>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
    const navLinks = [
        { link: "/portfolio", name: "Portfolio" },
        { link: "/sessions", name: "Sesje" },
        { link: "/prints", name: "Printy" },
    ]
    const footerLinks = [
        { link: "/", name: "Strona główna" },
        { link: "/portfolio", name: "Portfolio" },
        { link: "/sessions", name: "Sesje" },
        { link: "/prints", name: "Printy" },
    ]
</script>

<style scoped>
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