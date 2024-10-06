<template>
    <div class="my-16 lg:my-32">
        <h2 class="section-header mb-6">Kontakt</h2>
        <div class="grid grid-cols-2 md:grid-cols-3  gap-6 xl:gap-12">
            <div class="col-span-2 p-4 border border-black">
                <p v-html="contentStore.ContactFormText"></p>
            </div>
            <form @submit="onSubmit" class="col-span-2 grid grid-cols-2 gap-6 xl:gap-12">
                <div class="col-span-2 md:col-span-1 relative">
                    <input type="email" placeholder="Email *" v-model="email" v-bind="emailAttrs" class="w-full p-3 bg-inherit border-[1px] border-black" />
                    <p class="absolute -bottom-6">{{ errors.email }}</p>
                </div>
                <div class="col-span-2 md:col-span-1 relative">
                    <input type="text" placeholder="Imię *" v-model="name" v-bind="nameAttrs" class="w-full p-3 bg-inherit border-[1px] border-black" />
                    <p class="absolute -bottom-6">{{ errors.name }}</p>
                </div>
                <div class="col-span-2 md:col-span-1 relative">
                    <input type="phone" id="phone" placeholder="Telefon" v-model="phone" v-bind="phoneAttrs" class="w-full p-3 bg-inherit border-[1px] border-black" />
                    <p class="absolute -bottom-6">{{ errors.phone }}</p>
                </div>
                <div class="col-span-2 md:col-span-1 relative">
                    <select v-model="selectedSubject" v-bind="subjectAttrs" class="w-full p-3 bg-inherit border-[1px] border-black">
                        <option disabled value="">Temat wiadomości</option>
                        <option value="sesja">Sesja</option>
                        <option value="print">Printy</option>
                        <option value="inne">Inne</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                    <p class="absolute -bottom-6">{{ errors.selectedSubject }}</p>
                </div>
                <div v-if="selectedSubject === 'sesja'" class="relative col-span-2">
                    <input type="date" placeholder="Wybierz termin" v-model="date" v-bind="dateAttrs" class="w-full p-3 bg-inherit border-[1px] border-black" />
                    <p class="absolute -bottom-6">{{ errors.date }}</p>
                </div>
                <div class="relative col-span-2">
                    <textarea placeholder="wiadomość *" v-model="message" v-bind="messageAttrs" class="w-full p-3 bg-inherit border-[1px] border-black min-h-32"></textarea>
                    <p class="absolute -bottom-6">{{ errors.message }}</p>
                </div>
                <div class="col-span-2">
                    <button class="bg-black px-6 py-3 text-white hover-scale-105">/ Wyślij</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
    import { useForm } from 'vee-validate';
    import * as yup from 'yup';
    import { ref, watch } from 'vue';
    import { useContentStore } from '~/stores/content';
    const contentStore = useContentStore();
    const mail = useMail();
    
    const { errors, handleSubmit, resetForm, defineField, setFieldValue } = useForm({
        initialValues: {
            selectedSubject: '',
            name: '',
            email: '',
            phone: '',
            date: '',
            message: '',
            date: '',
        },
        validationSchema: yup.object().shape({
            email: yup.string().email('Wprowadź poprawny email.').required('Uzupełnij adres email.'),
            name: yup.string().required('Uzupełnij imię.'),
            message: yup.string().min(6, 'Wiadomość jest za krótka.').required('Wprowadź tekst wiadomości.'),
            phone: yup.string().matches(/^\d{9}$/, 'Wprowadź poprawny numer'),
            selectedSubject: yup.string().required('Wybierz temat wiadomości.'),
            date: yup.string().when('selectedSubject', {
                is: (val) => {
                    return val === "sesja";
                },
                then:  (s) => s.required('Wybierz datę.'),
                otherwise: (s) => s.notRequired(),
            }),
        }),
    });

    const onSubmit = handleSubmit(async (values) => {
        try {
            mail.send({
                from: values.email,
                subject: `Wiadomość od ${values.email}.`,
                text: `
                    Imię i nazwisko: ${values.name}
                    Email: ${values.email}
                    Numer telefonu: ${values.phone ? values.phone : '-'}
                    Temat wiadomości: ${values.selectedSubject}
                    Dodatkowe informacje: ${values.message ? values.message : '-'}
                `,
            });
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

    watch(selectedSubject, (newVal) => {
        if (newVal !== 'sesja') {
            setFieldValue('date', '');
        }
    });
    
</script>

<style scoped>
    .is-invalid {
        background-color: red;
    }
    select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }
</style>