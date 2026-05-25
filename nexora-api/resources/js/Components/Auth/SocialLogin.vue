<script setup>
defineProps({
    provider: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <button
        type="button"
        class="flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm transition duration-200 hover:border-violet-300 hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-violet-500 dark:hover:bg-slate-800 dark:focus:ring-violet-500/20"
    >
        <span v-if="provider === 'Google'" class="text-base font-bold tracking-normal">
            <span class="text-blue-500">G</span><span class="text-red-500">o</span><span class="text-yellow-500">o</span><span class="text-blue-500">g</span><span class="text-emerald-500">l</span><span class="text-red-500">e</span>
        </span>

        <span v-else class="grid h-[18px] w-[18px] grid-cols-2 gap-0.5">
            <span class="bg-red-500"></span>
            <span class="bg-emerald-500"></span>
            <span class="bg-blue-500"></span>
            <span class="bg-yellow-400"></span>
        </span>

        <span>{{ provider }}</span>
    </button>
</template>
