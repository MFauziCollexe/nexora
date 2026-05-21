<script setup>
defineProps({
    showCta: {
        type: Boolean,
        default: true,
    },
    ctaLabel: {
        type: String,
        default: 'API Docs',
    },
    ctaHref: {
        type: String,
        default: '',
    },
})
</script>

<template>
    <nav class="sticky top-0 z-40 border-b border-sky-100 backdrop-blur-xl bg-white/60">
        <div class="max-w-7xl mx-auto px-[50px] py-5 flex items-center justify-between">
            <!-- Logo -->
            <div>
                <h1 class="text-4xl font-black tracking-tight">
                    <span class="text-sky-500">Nexora</span
                    ><span class="text-sky-500">-API</span>
                </h1>
                <p class="text-slate-500 mt-2 text-sm tracking-wide">
                    Next Generation Operations Platform
                </p>
            </div>

            <!-- Right -->
            <div v-if="showCta" class="flex items-center gap-4">
                <span
                    class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200"
                >
                    <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Status: Online
                </span>
                <a
                    :href="ctaHref || route('login')"
                    class="rounded-md bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition"
                >
                    {{ ctaLabel }}
                </a>
            </div>
        </div>
    </nav>
</template>
