<script setup>
import { reactive } from 'vue'

defineProps({
    models: {
        type: Array,
        default: () => [],
    },
})

const expanded = reactive({})

const toggleModel = (name) => {
    expanded[name] = !expanded[name]
}
</script>

<template>
    <div class="overflow-hidden rounded border border-slate-300 bg-white">
        <button type="button" class="flex w-full items-center justify-between px-4 py-3 text-left">
            <h2 class="text-xl font-bold text-slate-700">Models</h2>
            <span class="text-2xl font-light leading-none text-black">^</span>
        </button>
        <div class="space-y-3 border-t border-slate-300 p-5">
            <div
                v-for="model in models"
                :key="model.name"
                class="overflow-hidden rounded bg-[#f0f0f0]"
            >
                <button
                    type="button"
                    class="flex w-full items-center gap-4 px-5 py-5 text-left"
                    @click="toggleModel(model.name)"
                >
                    <span class="text-lg font-bold text-slate-700">{{ model.name }}</span>
                    <span class="text-2xl font-bold leading-none text-black">{{ expanded[model.name] ? 'v' : '>' }}</span>
                </button>

                <div v-show="expanded[model.name]" class="px-5 pb-5">
                    <div class="rounded bg-[#eeeeee] p-5 font-mono text-sm font-bold leading-7 text-slate-800">
                        <div class="flex items-center gap-2">
                            <span class="font-sans text-lg font-bold">{{ model.name }}</span>
                            <span>v</span>
                            <span>{</span>
                        </div>
                        <div
                            v-for="field in model.fields"
                            :key="`${model.name}-${field.name}`"
                            class="grid grid-cols-[200px_24px_minmax(0,1fr)] items-center pl-7"
                        >
                            <span>{{ field.name }}</span>
                            <span class="text-xl leading-none text-black">{{ field.open ? 'v' : '>' }}</span>
                            <span class="text-indigo-700">{{ field.type }}</span>
                        </div>
                        <div>}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
