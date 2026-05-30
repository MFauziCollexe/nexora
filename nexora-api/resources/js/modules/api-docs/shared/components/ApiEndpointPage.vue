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
        <ApiEndpointOperation
            v-for="endpoint in module.endpoints"
            :key="endpoint.path"
            :endpoint="endpoint"
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
