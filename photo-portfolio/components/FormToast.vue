<template>
    <Toast ref="toast" position="bottom-left" />
</template>
  
<script setup>
    import Toast from 'primevue/toast';
    import { useToast } from 'primevue/usetoast';

    const toast = useToast();

    const showSuccessToast = () => {
    toast.add({
        severity: 'success',
        summary: 'Wysłano pomyślnie! :)',
        detail: 'Dzięki za kontakt.',
        life: 3000,
    });
    };

    defineExpose({
        showSuccessToast,
    });
</script>
