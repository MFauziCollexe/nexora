<script setup>
defineProps({
    variant: {
        type: String,
        default: 'primary',
        validator: (v) => ['primary', 'secondary', 'ghost', 'danger'].includes(v),
    },
    size: {
        type: String,
        default: 'md',
        validator: (v) => ['sm', 'md', 'lg'].includes(v),
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        default: 'button',
    },
})

const variants = {
    primary:   'bg-sky-500 text-white hover:bg-sky-400 shadow-lg shadow-sky-200',
    secondary: 'border border-sky-100 bg-white text-slate-700 hover:bg-sky-50',
    ghost:     'bg-transparent text-slate-600 hover:bg-sky-50',
    danger:    'bg-rose-500 text-white hover:bg-rose-400 shadow-lg shadow-rose-200',
}

const sizes = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-6 py-3 text-base rounded-2xl',
    lg: 'px-8 py-5 text-lg rounded-2xl',
}
</script>

<template>
    <button
        :type="type"
        :disabled="disabled"
        :class="[variants[variant], sizes[size], { 'opacity-50 cursor-not-allowed': disabled }]"
        class="font-semibold transition-all duration-200"
    >
        <slot />
    </button>
</template>
