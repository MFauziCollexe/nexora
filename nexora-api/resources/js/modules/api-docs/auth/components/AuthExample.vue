<script setup>
defineProps({
    title: {
        type: String,
        default: "Auth example",
    },
})
</script>

<template>
    <div class="rounded border border-slate-200 bg-white p-4 text-sm text-slate-700">
        {{ title }}
    </div>
</template>
