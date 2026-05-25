<script setup>
defineProps({
    id: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    modelValue: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'text',
    },
    placeholder: {
        type: String,
        default: '',
    },
    autocomplete: {
        type: String,
        default: '',
    },
    autofocus: {
        type: Boolean,
        default: false,
    },
    required: {
        type: Boolean,
        default: true,
    },
    error: {
        type: String,
        default: '',
    },
});

defineEmits(['update:modelValue']);
</script>

<template>
    <div>
        <label :for="id" class="block text-[11px] font-semibold text-slate-950 dark:text-slate-100">
            {{ label }}
        </label>

        <div class="relative mt-1.5">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
                <slot name="icon" />
            </div>

            <input
                :id="id"
                :type="type"
                :value="modelValue"
                :placeholder="placeholder"
                :autocomplete="autocomplete"
                :autofocus="autofocus"
                :required="required"
                class="h-9 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-9 text-xs text-slate-900 shadow-sm transition duration-200 placeholder:text-slate-500 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-violet-400 dark:focus:ring-violet-500/20"
                :class="{ 'border-rose-400 focus:border-rose-500 focus:ring-rose-100 dark:border-rose-500 dark:focus:border-rose-400 dark:focus:ring-rose-500/20': error }"
                @input="$emit('update:modelValue', $event.target.value)"
            />

            <div v-if="$slots.action" class="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 dark:text-slate-400">
                <slot name="action" />
            </div>
        </div>

        <p v-if="error" class="mt-1 text-[11px] text-rose-600 dark:text-rose-400">
            {{ error }}
        </p>
    </div>
</template>
