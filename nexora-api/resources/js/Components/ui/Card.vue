<script setup>
defineProps({
    padding: {
        type: String,
        default: 'md',
        validator: (v) => ['none', 'sm', 'md', 'lg'].includes(v),
    },
    hover: {
        type: Boolean,
        default: false,
    },
})
</script>

<template>
    <div
        :class="{
            'p-0': padding === 'none',
            'p-4': padding === 'sm',
            'p-6': padding === 'md',
            'p-8': padding === 'lg',
            'hover:-translate-y-1 hover:shadow-lg transition duration-300': hover,
        }"
        class="rounded-3xl border border-sky-100 bg-white backdrop-blur-xl"
    >
        <slot />
    </div>
</template>
