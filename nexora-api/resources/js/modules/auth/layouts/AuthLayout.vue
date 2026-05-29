<script setup>
defineProps({
    maxWidthClass: {
        type: String,
        default: 'max-w-[820px]',
    },
});
</script>

<template>
    <main class="h-screen overflow-hidden bg-slate-50 px-2 py-2 text-slate-950 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-50 sm:px-3 lg:px-4">
        <div :class="maxWidthClass" class="mx-auto flex h-full w-full flex-col items-center justify-center">
            <slot />
        </div>
    </main>
</template>
