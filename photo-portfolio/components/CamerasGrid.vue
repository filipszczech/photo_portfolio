<template>
    <GridContainer>
        <div v-for="camera in cameras" :key="camera.id" class="">
            <ImageCard :src="camera.img" :desc="'/ ' + camera.name" :link="'/portfolio/' + camera.slug" />
        </div>
    </GridContainer>
</template>

<script setup>
    const supabase = useSupabaseClient();

    const cameras = ref([])
    const camerasLoading = ref(true)
    const camerasError = ref(null)

    const fetchCameras = async () => {
        camerasLoading.value = true
        camerasError.value = null

        try {
            const { data: cameraData, error: camerasError } = await supabase
                .from('cameras')
                .select();

            if (camerasError) {
                throw new Error('Error fetching cameras: ' + camerasError.message)
            }
            cameras.value = cameraData
        } catch (err) {
            camerasError.value = err.message
        } finally {
            camerasLoading.value = false
        }
    }

    onMounted(() => {
        fetchCameras()
    })
</script>