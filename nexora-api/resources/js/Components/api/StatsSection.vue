<script setup>
import Card from '@/Components/ui/Card.vue'
import { useApiStats } from '@/composables/useApiStats'

const { stats } = useApiStats()
</script>

<template>
    <div class="grid grid-cols-3 gap-5 mt-14">
        <Card v-for="stat in stats" :key="stat.label" padding="md">
            <h3 class="text-4xl font-black text-sky-500">{{ stat.value }}</h3>
            <p class="text-slate-500 mt-2 text-sm">{{ stat.label }}</p>
        </Card>
    </div>
</template>
