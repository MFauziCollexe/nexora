<script setup>
import { Link } from '@inertiajs/vue3'
import { ref } from 'vue'

const props = defineProps({
    open: {
        type: Boolean,
        default: true,
    },
})

const openMain = ref(true)
const apiPages = [
    'auth',
    'users',
    'products',
    'orders',
    'categories',
    'dashboard-endpoint',
    'notifications',
    'settings',
]
const systemPages = ['api-keys', 'rate-limits', 'logs', 'webhooks']
const currentPage = route().params?.page
const openApi = ref(apiPages.includes(currentPage))
const openDocs = ref(false)
const openSys = ref(systemPages.includes(currentPage))
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
                <div class="space-y-2">
                    <button type="button" @click="openMain = !openMain" class="flex w-full items-center justify-between px-3">
                        <p class="text-[11px] uppercase tracking-[0.22em] text-slate-500">Main</p>
                        <svg :class="openMain ? 'transform rotate-90' : ''" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>

                    <div v-show="openMain" class="space-y-1">
                        <Link :href="route('dashboard')" class="block rounded-2xl px-3 py-2 text-[13px] font-semibold" :class="route().current('dashboard') ? 'bg-violet-600 text-white' : 'text-slate-300 hover:bg-white/5'">Dashboard</Link>
                        <Link :href="route('dashboard.page', { page: 'overview' })" class="block rounded-2xl px-3 py-2 text-[13px] font-semibold" :class="route().current('dashboard.page') && route().params?.page === 'overview' ? 'bg-violet-600 text-white' : 'text-slate-300 hover:bg-white/5'">Overview</Link>
                        <Link :href="route('dashboard.page', { page: 'analytics' })" class="block rounded-2xl px-3 py-2 text-[13px] font-semibold" :class="route().current('dashboard.page') && route().params?.page === 'analytics' ? 'bg-violet-600 text-white' : 'text-slate-300 hover:bg-white/5'">Analytics</Link>
                    </div>
                </div>

                <div class="space-y-2">
                    <button type="button" @click="openApi = !openApi" class="flex w-full items-center justify-between px-3">
                        <p class="text-[11px] uppercase tracking-[0.22em] text-slate-500">API Endpoints</p>
                        <svg :class="openApi ? 'transform rotate-90' : ''" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>

                    <div v-show="openApi" class="space-y-1">
                        <Link :href="route('dashboard.page', { page: 'auth' })" class="block rounded-2xl px-3 py-2 text-[13px] transition" :class="route().current('dashboard.page') && route().params?.page === 'auth' ? 'bg-violet-600 font-semibold text-white' : 'text-slate-300 hover:bg-white/5'">Auth</Link>
                        <Link :href="route('dashboard.page', { page: 'users' })" class="block rounded-2xl px-3 py-2 text-[13px] text-slate-300 transition hover:bg-white/5">Users</Link>
                        <Link :href="route('dashboard.page', { page: 'products' })" class="block rounded-2xl px-3 py-2 text-[13px] text-slate-300 transition hover:bg-white/5">Products</Link>
                        <Link :href="route('dashboard.page', { page: 'orders' })" class="block rounded-2xl px-3 py-2 text-[13px] text-slate-300 transition hover:bg-white/5">Orders</Link>
                        <Link :href="route('dashboard.page', { page: 'categories' })" class="block rounded-2xl px-3 py-2 text-[13px] text-slate-300 transition hover:bg-white/5">Categories</Link>
                        <Link :href="route('dashboard.page', { page: 'dashboard-endpoint' })" class="block rounded-2xl px-3 py-2 text-[13px] text-slate-300 transition hover:bg-white/5">Dashboard</Link>
                        <Link :href="route('dashboard.page', { page: 'notifications' })" class="block rounded-2xl px-3 py-2 text-[13px] text-slate-300 transition hover:bg-white/5">Notifications</Link>
                        <Link :href="route('dashboard.page', { page: 'settings' })" class="block rounded-2xl px-3 py-2 text-[13px] text-slate-300 transition hover:bg-white/5">Settings</Link>
                    </div>
                </div>

                <div class="space-y-2">
                    <button type="button" @click="openSys = !openSys" class="flex w-full items-center justify-between px-3">
                        <p class="text-[11px] uppercase tracking-[0.22em] text-slate-500">System</p>
                        <svg :class="openSys ? 'transform rotate-90' : ''" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>

                    <div v-show="openSys" class="space-y-1">
                        <Link :href="route('dashboard.page', { page: 'api-keys' })" class="block rounded-2xl px-3 py-2 text-[13px] text-slate-300 transition hover:bg-white/5">API Keys</Link>
                        <Link :href="route('dashboard.page', { page: 'rate-limits' })" class="block rounded-2xl px-3 py-2 text-[13px] text-slate-300 transition hover:bg-white/5">Rate Limits</Link>
                        <Link :href="route('dashboard.page', { page: 'logs' })" class="block rounded-2xl px-3 py-2 text-[13px] text-slate-300 transition hover:bg-white/5">Logs</Link>
                        <Link :href="route('dashboard.page', { page: 'webhooks' })" class="block rounded-2xl px-3 py-2 text-[13px] text-slate-300 transition hover:bg-white/5">Webhooks</Link>
                    </div>
                </div>
            </div>
        </div>

        <div class="px-4 py-3 border-t border-white/10">
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

/* Chrome */
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

/* HILANGKAN BUTTON */
.sidebar-scroll::-webkit-scrollbar-button {
    display: none;
    width: 0;
    height: 0;
}
</style>
