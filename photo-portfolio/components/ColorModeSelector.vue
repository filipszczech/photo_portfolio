<template>
    <div>
        <button @click="toggleMode">{{ nextMode }}</button>
    </div>
</template>

<script setup>
    const colorMode = useColorMode()

    const modes = [
        'system',
        'light',
        'dark'
    ]

    const nextModeIcons = {
        system: '',
        light: '',
        dark: '',
    }
    const nextMode = computed(() => {
        const currentModeIndex = modes.indexOf(colorMode.preference);
        let nextModeIndex = null;
        if(currentModeIndex + 1 === modes.length) {
            nextModeIndex = 0;
        } else {
            nextModeIndex = currentModeIndex + 1;
        }

        return modes[nextModeIndex];
    })

    const toggleMode = () => colorMode.preference = nextMode.value;
</script>