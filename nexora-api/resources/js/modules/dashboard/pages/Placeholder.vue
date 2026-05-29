<script setup>
import { computed } from 'vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import ApiEndpointPage from '@/modules/api-docs/shared/components/ApiEndpointPage.vue'
import EmptyDashboardPage from '@/modules/api-docs/shared/components/EmptyDashboardPage.vue'
import { apiEndpointPages } from '@/modules/api-docs/registry/pages'

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

const endpointModule = computed(() => apiEndpointPages[props.page] ?? null)
</script>

<template>
    <DashboardLayout>
        <div class="p-6">
            <div class="mb-6">
                <h1 class="text-3xl font-bold text-slate-900 dark:text-white">{{ endpointModule?.title ?? title }}</h1>
                <p class="mt-1.5 text-sm text-slate-500 dark:text-slate-300">
                    {{ endpointModule?.description ?? 'This page is intentionally blank for now.' }}
                </p>
            </div>

            <ApiEndpointPage
                v-if="endpointModule"
                :module="endpointModule"
            />

            <EmptyDashboardPage
                v-else
                :title="title"
            />
        </div>
    </DashboardLayout>
</template>
