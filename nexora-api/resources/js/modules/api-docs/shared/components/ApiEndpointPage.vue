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
    requestParameters,
    executeResults,
    executing,
    ensureRequestBody,
    ensureRequestParameters,
    resetRequestBody,
    executeEndpoint,
} = useEndpointExecutor()
</script>

<template>
    <div class="space-y-3">
        <ApiEndpointOperation
            v-for="endpoint in module.endpoints"
            :key="`${endpoint.method}:${endpoint.path}`"
            :endpoint="endpoint"
            :request-bodies="requestBodies"
            :request-parameters="requestParameters"
            :execute-results="executeResults"
            :executing="executing"
            @ensure-request-body="ensureRequestBody"
            @ensure-request-parameters="ensureRequestParameters"
            @reset-request-body="resetRequestBody"
            @execute="executeEndpoint"
        />

        <ApiModels v-if="module.models?.length" :models="module.models" />
    </div>
</template>
