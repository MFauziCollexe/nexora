<script setup>
import Badge from '@/Components/ui/Badge.vue'

defineProps({
    method: {
        type: String,
        required: true,
    },
    endpoint: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
})
</script>

<template>
    <div class="rounded-2xl border border-sky-100 bg-sky-50 p-5 hover:border-sky-400/30 transition">
        <div class="flex items-center gap-4 mb-3">
            <Badge
                :color="method === 'GET' ? 'emerald' : method === 'POST' ? 'sky' : method === 'PUT' ? 'indigo' : method === 'DELETE' ? 'rose' : 'slate'"
                size="md"
            >
                {{ method }}
            </Badge>
            <code class="text-sky-600 text-sm">{{ endpoint }}</code>
        </div>
        <p v-if="description" class="text-slate-500 text-sm">{{ description }}</p>
    </div>
</template>
