<template>
    <Teleport to="body">
        <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50" @click.self="closeModal">
            <div class="bg-white p-6 max-w-lg w-full">
                <h2 class="text-xl md:text-3xl font-semibold mb-3">Zamów print</h2>
                <p class="mb-3 md:mb-6">Zamów interesujący Cię print, a ja odezwę się w sprawie finalizacji transakcji i wysyłki.<br>Wielkie dzięki za wsparcie! :)</p>
                <form @submit.prevent="submitForm">
                    <div class="mb-3 md:mb-6">
                        <!-- <label for="email" class="block mb-2">Email:</label> -->
                        <input v-model="email" id="email" type="email" placeholder="email*" class="w-full p-2 bg-inherit border-[1px] border-black" required />
                    </div>
                    <div class="mb-3 md:mb-6">
                        <!-- <label for="email" class="block mb-2">Email:</label> -->
                        <input v-model="name" id="name" type="text" placeholder="imię*" class="w-full p-2 bg-inherit border-[1px] border-black" required />
                    </div>
                    <div class="mb-3 md:mb-6">
                        <!-- <label for="email" class="block mb-2">Email:</label> -->
                        <input v-model="phone" id="phone" type="phone" placeholder="Numer telefonu" class="w-full p-2 bg-inherit border-[1px] border-black" />
                    </div>
                    <!-- <div class="mb-3 lg:mb-9">
                    <label for="size" class="block mb-2">Rozmiar:</label>
                    <select v-model="selectedSize" id="size" class="w-full p-2 bg-inherit border-[1px] border-black">
                        <option v-for="(size, index) in sizes" :key="index" :value="size">{{ size }}</option>
                    </select>
                    </div> -->
                    <div class="mb-3 lg:mb-6">
                        <p>Rozmiar: {{ selectedSize }}</p>
                        <p>Ramka: {{ selectedBorder === 'whiteBorder' ? 'biała ramka' : 'bez ramki' }}</p>
                        <p>Cena: {{ price }}zł</p>
                    </div>
                    <button type="submit" class="text-white bg-black px-9 py-2 border border-black hover-scale-105">Zamów</button>
                    <button @click="closeModal" class="ml-4 bg-transparent px-9 py-2 border border-black hover-scale-105">Anuluj</button>
                </form>
            </div>
        </div>
    </Teleport>
  </template>
  
  <script setup>
    const props = defineProps({
        showModal: Boolean,
        selectedBorder: String,
        selectedSize: String,
        price: String,
    });
    
    const email = ref('');
    const name = ref('');
    const phone = ref(null);
    const emit = defineEmits(['close', 'submit']);
    
    const closeModal = () => {
        emit('close');
    };
    
    const submitForm = () => {
        emit('submit', { email: email.value, name: name.value, phone: phone.value });
        closeModal();
    };
  </script>
  
  <style scoped>
  /* Stylizacja modala */
  </style>
  