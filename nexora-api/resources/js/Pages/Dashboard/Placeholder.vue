<script setup>
import { computed } from 'vue'
import DashboardLayout from '@/Layouts/DashboardLayout.vue'

const props = defineProps({
    page: {
        type: String,
        default: 'overview',
    },
})

const title = computed(() => {
    return props.page
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
})
</script>

<template>
    <DashboardLayout>
        <div class="p-8">
            <div class="mb-8">
                <h1 class="text-4xl font-bold text-slate-900">{{ title }}</h1>
                <p class="mt-2 text-slate-500">
                    This page is intentionally blank for now.
                </p>
            </div>

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
        </div>
    </DashboardLayout>
</template>
