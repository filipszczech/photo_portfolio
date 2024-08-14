import { ref } from 'vue';
import { useSupabaseClient, useAsyncData } from '#imports';

export function useCategories() {
    const categories = ref([]);
    const supabase = useSupabaseClient();

    const { data, pending, error } = useAsyncData('categories', async () => {
        const { data, error } = await supabase
            .from('categories')
            .select();
        if (error) throw new Error(error.message);
        return data || [];
    });

    if (data.value) {
        categories.value = data.value;
    }

    return {
        categories,
        pending,
        error
    };
}