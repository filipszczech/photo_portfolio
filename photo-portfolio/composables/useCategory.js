import { useSupabaseClient, useAsyncData } from '#imports';

export function useCategory(slug) {
    const supabase = useSupabaseClient();

    const { data: category, status: categoryStatus, error: categoryError } = useAsyncData(
        `category-${slug}`, 
        async () => {
            const { data, error } = await supabase
                .from('categories')
                .select()
                .eq('slug', slug)
                .single();
            if (error) throw new Error(error.message);
            return data || null;
        }
    );

    return {
        category,
        categoryStatus,
        categoryError,
    };
}