<script setup>
import ApiEndpointOperation from './ApiEndpointOperation.vue'
import ApiModels from './ApiModels.vue'
import { useEndpointExecutor } from '@/modules/api-docs/shared/composables/useEndpointExecutor'

defineProps({
    module: {
        type: Object,
        required: true,
    },
})

const {
    authState,
    requestBodies,
    executeResults,
    executing,
    ensureRequestBody,
    resetRequestBody,
    executeEndpoint,
} = useEndpointExecutor()
</script>

<template>
    <div class="space-y-3">
        <div class="flex items-center justify-between border-b border-slate-300 pb-4">
            <div class="flex items-center gap-3">
                <h2 class="text-2xl font-bold leading-none text-slate-800">{{ module.key }}</h2>
                <span class="text-base text-slate-700">{{ module.description }}</span>
            </div>
            <div class="flex items-center gap-5">
                <a v-if="module.helpUrl" :href="module.helpUrl" class="text-base text-blue-700">Find out more about Nexora API</a>
                <span class="text-2xl font-light leading-none text-black">^</span>
            </div>
        </div>

        <ApiEndpointOperation
            v-for="endpoint in module.endpoints"
            :key="endpoint.path"
            :endpoint="endpoint"
            :auth-state="authState"
            :request-bodies="requestBodies"
            :execute-results="executeResults"
            :executing="executing"
            @ensure-request-body="ensureRequestBody"
            @reset-request-body="resetRequestBody"
            @execute="executeEndpoint"
        />

        <ApiModels v-if="module.models?.length" :models="module.models" />
    </div>
</template>
