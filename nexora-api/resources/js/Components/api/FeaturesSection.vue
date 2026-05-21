<script setup>
import { computed } from 'vue'
import { getFeatures } from '@/data/features'
import FeatureCard from '@/Components/api/FeatureCard.vue'

const features = computed(() => getFeatures())
</script>

<template>
    <slot name="header" />

    <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-6 px-[50px]">
        <FeatureCard
            v-for="feature in features"
            :key="feature.title"
            :icon="feature.icon"
            :title="feature.title"
            :description="feature.description"
        />
    </div>
</template>
