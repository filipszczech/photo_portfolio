import { ref } from 'vue';
import { useSupabaseClient, useAsyncData } from '#imports';

export function useCameras() {
    const cameras = ref([]);
    const supabase = useSupabaseClient();

    const { data, pending, error } = useAsyncData('cameras', async () => {
        const { data, error } = await supabase
            .from('cameras')
            .select();
        if (error) throw new Error(error.message);
        return data || [];
    });

    if (data.value) {
        cameras.value = data.value;
    }

    return {
        cameras,
        pending,
        error
    };
}