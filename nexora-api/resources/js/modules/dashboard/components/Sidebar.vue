<script setup>
import { Link, usePage } from '@inertiajs/vue3'
import { ref, computed, onMounted, watch } from 'vue'
import { dashboardNavigation } from '@/modules/api-docs/registry/navigation'

defineProps({
    open: {
        type: Boolean,
        default: true,
    },
})

const page = usePage()

const currentPath = computed(() => page.url.split('?')[0])
const currentPage = computed(() => {
    const match = currentPath.value.match(/^\/docs\/([^/]+)/)

    return match ? decodeURIComponent(match[1]) : null
})

const openedSections = ref({})

const syncOpenedSections = () => {
    dashboardNavigation.forEach((section) => {
        openedSections.value[section.key] = Boolean(section.defaultOpen) ||
            (section.items ?? []).some((item) => item?.page === currentPage.value)
    })
}

onMounted(syncOpenedSections)

watch(currentPage, syncOpenedSections)

const toggleSection = (key) => {
     openedSections.value[key] = !openedSections.value[key]
 }

 const itemHref = (item) => {
     if (item.routeName === 'dashboard') {
         return '/dashboard'
     }

     if (item.routeName === 'docs.page' && item.page) {
         return `/docs/${encodeURIComponent(item.page)}`
     }

     return '#'
 }

const isActiveItem = (item) => {
     if (!item.page) {
         return item.routeName === 'dashboard' && currentPath.value === '/dashboard'
     }

     return currentPage.value === item.page
 }

const itemClass = (item) => {
    return [
        'block rounded-2xl px-3 py-2 text-[13px] transition',
        isActiveItem(item)
            ? 'bg-violet-600 font-semibold text-white'
            : 'text-slate-300 hover:bg-white/5',
    ]
}
</script>

<template>
    <aside
        v-if="open"
        class="fixed left-0 top-0 z-50 flex h-screen w-[260px] flex-col bg-[#081028] text-white"
    >
        <div class="flex h-20 items-center border-b border-white/10 px-4">
            <div class="flex items-center gap-2">
                <img
                    src="/images/logo_nexora.png"
                    alt="Nexora Logo"
                    class="h-8 w-8 object-contain"
                />
                <div>
                    <h1 class="text-lg font-semibold">Nexora API</h1>
                </div>
            </div>
        </div>

        <div class="sidebar-scroll flex-1 overflow-y-auto px-3 py-3">
            <div class="space-y-3">
                <div
                    v-for="section in dashboardNavigation"
                    :key="section.key"
                    class="space-y-2"
                >
                    <button
                        type="button"
                        class="flex w-full items-center justify-between px-3"
                        @click="toggleSection(section.key)"
                    >
                        <p class="text-[11px] uppercase tracking-[0.22em] text-slate-500">{{ section.label }}</p>
                        <svg
                            :class="openedSections[section.key] ? 'transform rotate-90' : ''"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="text-slate-400"
                        >
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>

                    <div v-show="openedSections[section.key]" class="space-y-1">
                        <Link
                            v-for="item in section.items"
                            :key="`${section.key}-${item.label}`"
                            :href="itemHref(item)"
                            :class="itemClass(item)"
                        >
                            {{ item.label }}
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        <div class="border-t border-white/10 px-4 py-3">
            <p class="text-[13px] font-semibold text-white">
                Nexora API Version 1.0
            </p>

            <div class="mt-1 flex items-center gap-1.5">
                <span class="h-2 w-2 rounded-full bg-emerald-400"></span>

                <p class="text-[10px] text-slate-400">
                    Online
                </p>
            </div>
        </div>
    </aside>
</template>

<style scoped>
.sidebar-scroll {
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.18) transparent;
}

.sidebar-scroll::-webkit-scrollbar {
    width: 4px;
}

.sidebar-scroll::-webkit-scrollbar-track {
    background: transparent;
}

.sidebar-scroll::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.18);
    border-radius: 999px;
}

.sidebar-scroll::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
}
</style>
