<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <div class="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <div class="mx-auto max-w-xl">
            <p class="text-lg font-semibold text-slate-900">
                Placeholder content
            </p>
            <p class="mt-4 text-slate-600">
                Build the interface for the <strong>{{ title }}</strong> page here later.
            </p>
        </div>
    </div>
</template>
