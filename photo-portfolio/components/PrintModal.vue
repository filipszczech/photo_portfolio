<template>
    <Teleport to="body">
        <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50" @click.self="closeModal">
            <div class="bg-white p-6 lg:p-9 max-w-xl w-full">
                <h2 class="text-xl md:text-3xl font-semibold mb-3">Zamów print</h2>
                <p class="mb-3 md:mb-6">Zamów interesujący Cię print, a ja odezwę się w sprawie finalizacji transakcji i wysyłki.<br>Wielkie dzięki za wsparcie! :)</p>
                <form @submit.prevent="onSubmit">
                    <div class="grid w-2/3 gap-3 md:gap-6 mb-3 md:mb-6">
                        <div class="relative">
                            <input type="email" placeholder="Email *" v-model="email" v-bind="emailAttrs" class="w-full p-3 bg-inherit border-[1px] border-black" />
                            <p class="absolute text-sm -bottom-5">{{ errors.email }}</p>
                        </div>
                        <div class="relative">
                            <input type="name" placeholder="Imię *" v-model="name" v-bind="nameAttrs" class="w-full p-3 bg-inherit border-[1px] border-black" />
                            <p class="absolute text-sm -bottom-5">{{ errors.name }}</p>
                        </div>
                        <div class="relative">
                            <input type="phone" id="phone" placeholder="Telefon" v-model="phone" v-bind="phoneAttrs" class="w-full p-3 bg-inherit border-[1px] border-black" />
                            <p class="absolute text-sm -bottom-5">{{ errors.phone }}</p>
                        </div>
                    </div>
                    <div class="mb-3 lg:mb-6">
                        <p>Print: {{ printName }}</p>
                        <p>Rozmiar: {{ selectedSize }}</p>
                        <p>Ramka: {{ selectedBorder === 'whiteBorder' ? 'biała ramka' : 'bez ramki' }}</p>
                        <p>Cena: {{ price }}zł</p>
                    </div>
                    <p class="mb-3 lg:mb-6">
                        Kliknięcie 'Zamów' nie jest zobowiązujące i możesz w każdej chwili zrezygnować. Jeśli będą chętni to w przyszłości powstanie pełnoprawny sklep.
                    </p>
                    <button type="submit" class="text-white bg-black px-9 py-2 border border-black hover-scale-105">Zamów</button>
                    <button @click="closeModal" class="ml-4 bg-transparent px-9 py-2 border border-black hover-scale-105">Anuluj</button>
                </form>
            </div>
        </div>
    </Teleport>
  </template>
  
  <script setup>
    import { useForm } from 'vee-validate';
    import * as yup from 'yup';
    import { useToast } from "primevue/usetoast";

    const props = defineProps({
        printName: String,
        showModal: Boolean,
        selectedBorder: String,
        selectedSize: String,
        price: Number,
    });

    const emit = defineEmits(['close']);
    const mail = useMail();
    const toast = useToast(); 
    
    const closeModal = () => {
        emit('close');
    };

    const { errors, handleSubmit, resetForm, defineField, setFieldValue } = useForm({
        validationSchema: yup.object().shape({
            email: yup.string().email('Wprowadź poprawny email.').required('Uzupełnij adres email.'),
            name: yup.string().required('Uzupełnij imię.'),
            phone: yup.string().matches(/^\d{9}$/, 'Wprowadź poprawny numer').notRequired(),
        }),
    });

    const onSubmit = handleSubmit(async (values) => {
        try {
            mail.send({
                from: values.email,
                subject: `Zamówienie printa od ${values.email}.`,
                text: `
                    Dane dotyczące zamówienia:
                    Imię i nazwisko: ${values.name}
                    Email: ${values.email}
                    Numer telefonu: ${values.phone ? values.phone : '-'}
                    Nazwa printa: ${props.printName}
                    Rozmiar printa: ${props.selectedSize}
                    Ramka: ${props.selectedBorder === 'whiteBorder' ? 'z ramką' : 'bez ramki'}
                `,
            });
            resetForm();
            closeModal();
            toast.add({
                severity: 'success',
                summary: 'Wiadomość wysłana!',
                detail: 'Dzięki za zamówienie, odezwę się wkrótce. :)',
                life: 5000,
            });
        } catch (error) {
            console.error('Błąd podczas wysyłania wiadomości:', error);
        }
    });
    const [email, emailAttrs] = defineField('email');
    const [name, nameAttrs] = defineField('name');
    const [phone, phoneAttrs] = defineField('phone');
  </script>
  
  <style scoped>
    .p-toast {
        max-width: 300px;
        width: 100%;
        padding: 1rem;
        z-index: 1000;
    }
  </style>
  