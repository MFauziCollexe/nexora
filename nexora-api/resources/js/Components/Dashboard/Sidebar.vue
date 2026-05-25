<script setup>
import { Link } from '@inertiajs/vue3'
import { ref } from 'vue'

const props = defineProps({
    open: {
        type: Boolean,
        default: true,
    },
})

const openMain = ref(false)
const openApi = ref(false)
const openDocs = ref(false)
const openSys = ref(false)
</script>

<template>
    <aside
        class="fixed left-0 top-0 z-50 h-screen w-[260px] bg-[#081028] text-white flex flex-col transition-transform duration-300"
        :class="props.open ? 'left-0' : '-left-[260px]'"
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

        <div class="flex-1 overflow-y-auto px-3 py-3">
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
                        <Link :href="route('dashboard.page', { page: 'endpoints' })" class="block rounded-2xl px-3 py-2 text-[13px] font-semibold" :class="route().current('dashboard.page') && route().params?.page === 'endpoints' ? 'bg-violet-600 text-white' : 'text-slate-300 hover:bg-white/5'">Endpoints</Link>
                        <Link :href="route('dashboard.page', { page: 'authentication' })" class="block rounded-2xl px-3 py-2 text-[13px] font-semibold" :class="route().current('dashboard.page') && route().params?.page === 'authentication' ? 'bg-violet-600 text-white' : 'text-slate-300 hover:bg-white/5'">Authentication</Link>
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
                        <Link :href="route('dashboard.page', { page: 'auth' })" class="block rounded-2xl px-3 py-2 text-[13px] text-slate-300 transition hover:bg-white/5">Auth</Link>
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
                    <button type="button" @click="openDocs = !openDocs" class="flex w-full items-center justify-between px-3">
                        <p class="text-[11px] uppercase tracking-[0.22em] text-slate-500">Documentation</p>
                        <svg :class="openDocs ? 'transform rotate-90' : ''" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>

                    <div v-show="openDocs" class="space-y-1">
                        <Link :href="route('dashboard.page', { page: 'swagger-docs' })" class="block rounded-2xl px-3 py-2 text-[13px] text-slate-300 transition hover:bg-white/5">Swagger Docs</Link>
                        <Link :href="route('dashboard.page', { page: 'api-reference' })" class="block rounded-2xl px-3 py-2 text-[13px] text-slate-300 transition hover:bg-white/5">API Reference</Link>
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
            <div class="rounded-3xl bg-white/5 p-3">
                <p class="text-[13px] font-semibold text-white">Nexora API</p>
                <p class="mt-1 text-[10px] text-slate-400">Online</p>
            </div>
        </div>
    </aside>
</template>
