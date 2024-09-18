<template>
    <div>
        <h1 class="section-header font-semibold mb-6">test</h1>
        <div class="grid grid-cols-3 gap-12">
            <div class="p-4 border border-black col-span-2">
                <p></p>
            </div>
        </div>
    </div>
</template>

<script setup>

    const { id } = useRoute().params;
    // const camera = cameras.filter(camera => camera.slug === id)[0];

    // if(!camera) {
    //     throw createError({
    //         statusCode: 404,
    //         statusMessage: 'Nie znaleziono aparatu o takiej nazwie.',
    //         fatal: true
    //     });
    // };
    // // const filteredSessions = sessions.filter(session => session.categorySlugs.includes(id));
</script>