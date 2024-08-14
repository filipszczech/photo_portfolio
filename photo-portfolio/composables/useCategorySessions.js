import { useSupabaseClient, useAsyncData } from '#imports';

export function useCategorySessions(categoryId) {
    const supabase = useSupabaseClient();

    const { data: sessions, status: sessionsStatus, error: sessionsError } = useAsyncData(
        `sessions-category-${categoryId}`, 
        async () => {
            if (!categoryId) return []; // Jeśli `categoryId` jest null lub undefined, zwracamy pustą tablicę

            const { data, error } = await supabase
                .from('sessions') // Zakładam, że nazwa tabeli to 'sessions'
                .select()
                .eq('category_id', categoryId); // Filtrowanie sesji po `category_id`

            if (error) throw new Error(error.message);
            return data || [];
        }
    );

    return {
        sessions,
        sessionsStatus,
        sessionsError,
    };
}
