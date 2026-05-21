<script setup>
defineProps({
    color: {
        type: String,
        default: 'sky',
        validator: (v) => ['sky', 'emerald', 'amber', 'rose', 'indigo', 'slate'].includes(v),
    },
    size: {
        type: String,
        default: 'md',
        validator: (v) => ['sm', 'md', 'lg'].includes(v),
    },
})

const colors = {
    sky:    'bg-sky-50 text-sky-600 ring-sky-200',
    emerald:'bg-emerald-50 text-emerald-600 ring-emerald-200',
    amber:  'bg-amber-50 text-amber-600 ring-amber-200',
    rose:   'bg-rose-50 text-rose-600 ring-rose-200',
    indigo: 'bg-indigo-50 text-indigo-600 ring-indigo-200',
    slate:  'bg-slate-50 text-slate-600 ring-slate-200',
}

const sizeClass = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
}
</script>

<template>
    <span
        :class="[colors[color], sizeClass[size]]"
        class="inline-flex items-center rounded-full font-semibold ring-1 ring-inset"
    >
        <slot />
    </span>
</template>
