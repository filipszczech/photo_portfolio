<template>
    <div class="my-16 lg:my-32">
        <h2 class="section-header mb-4 xl:mb-12">Umów się na sesję</h2>
        <div class="grid grid-cols-2 md:grid-cols-3  gap-6 xl:gap-9">
            <div class="col-span-2 p-4 border border-black">
                <p v-html="contentStore.SessionContactFormText"></p>
            </div>
            <form @submit="onSubmit" class="col-span-2 grid grid-cols-2 gap-6 xl:gap-9">
                <div class="col-span-2 md:col-span-1 relative">
                    <input type="email" placeholder="Email *" v-model="email" v-bind="emailAttrs" class="w-full p-3 bg-inherit border-[1px] border-black" />
                    <p class="absolute -bottom-6">{{ errors.email }}</p>
                </div>
                <div class="col-span-2 md:col-span-1 relative">
                    <input type="name" placeholder="Imię *" v-model="name" v-bind="nameAttrs" class="w-full p-3 bg-inherit border-[1px] border-black" />
                    <p class="absolute -bottom-6">{{ errors.name }}</p>
                </div>
                <div class="col-span-2 md:col-span-1 relative">
                    <input  id="phone" placeholder="Telefon" v-model="phone" v-bind="phoneAttrs" class="w-full p-3 bg-inherit border-[1px] border-black" />
                    <p class="absolute -bottom-6">{{ errors.phone }}</p>
                </div>
                <div class="col-span-2 md:col-span-1 relative">
                    <select v-model="selectedSubject" v-bind="subjectAttrs" class="w-full p-3 bg-inherit border-[1px] border-black">
                        <option value="studio_session">sesja w studiu</option>
                        <option value="outdoor_session">sesja w plenerze</option>
                        <option value="occasional_session">sesja okazjonalna</option>
                        <option value="product_session">sesja produktowa</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                    <p class="absolute -bottom-6">{{ errors.selectedSubject }}</p>
                </div>
                <div class="relative col-span-2">
                    <input type="date" placeholder="Wybierz termin *" v-model="date" v-bind="dateAttrs" class="w-full p-3 bg-inherit border-[1px] border-black" />
                    <p class="absolute -bottom-6">{{ errors.date }}</p>
                </div>
                <div class="relative col-span-2">
                    <textarea placeholder="Dodatkowe informacje" v-model="message" v-bind="messageAttrs" class="w-full p-3 bg-inherit border-[1px] border-black min-h-32"></textarea>
                    <p class="absolute -bottom-6">{{ errors.message }}</p>
                </div>
                <div class="col-span-2">
                    <button class="bg-black px-6 py-3 text-white hover-scale-105">/ Wyślij</button>
                </div>
            </form>
            <Toast position="bottom-left" />
            <button class="bg-black px-6 py-3 text-white hover-scale-105" @click="showSuccess">/ Wyślij</button>
        </div>
    </div>
</template>

<script setup>
    import { useForm } from 'vee-validate';
    import * as yup from 'yup';
    import { useContentStore } from '~/stores/content';
    import Toast from 'primevue/toast';
    import { useToast } from "primevue/usetoast";
    const toast = useToast();

    const showSuccess = () => {
        toast.add({ severity: 'success', summary: 'Wysłano pomyślnie! :)', detail: 'Dzięki za kontakt.', life: 3000 });
    };
    const contentStore = useContentStore();
    
    const { errors, handleSubmit, resetForm, defineField, setFieldValue } = useForm({
        initialValues: {
            selectedSubject: 'studio_session',
            name: '',
            email: '',
            phone: '',
            date: ''
        },
        validationSchema: yup.object().shape({
            email: yup.string().email('Wprowadź poprawny email.').required('Uzupełnij adres email.'),
            name: yup.string().required('Uzupełnij imię.'),
            message: yup.string().min(6, 'Wiadomość jest za krótka.'),
            phone: yup.string().matches(/^\d{9}$/, 'Wprowadź poprawny numer').notRequired(),
            selectedSubject: yup.string().required('Wybierz rodzaj sesji.'),
            date: yup.string().required('Wybierz datę.')
        }),
    });

    // const onSubmit = handleSubmit(values => {
    //     console.log(values);
    //     resetForm();
    // });

    const onSubmit = handleSubmit(async (values) => {
        try {
            console.log('Wiadomość wysłana:', values);
            toast.add({ severity: 'success', summary: 'Wysłano pomyślnie! :)', detail: 'Dzięki za kontakt.', life: 3000, styleClass: 'p-toast-message' });
            resetForm();
        } catch (error) {
            console.error('Błąd podczas wysyłania wiadomości:', error);
        }
    });

    const [email, emailAttrs] = defineField('email');
    const [name, nameAttrs] = defineField('name');
    const [message, messageAttrs] = defineField('message');
    const [phone, phoneAttrs] = defineField('phone');
    const [selectedSubject, subjectAttrs] = defineField('selectedSubject');
    const [date, dateAttrs] = defineField('date');
    
</script>

<style>
    .is-invalid {
        background-color: red;
    }
    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }
    .p-toast {
        background-color: #EFEEEA !important;
        z-index: 100;
        padding: 2rem;
    }
    .p-toast-message {
        z-index: 100;
        background-color: #EFEEEA;
    }
</style>