<script setup>
import { Head, Link } from '@inertiajs/vue3'

defineProps({
    api: { type: Object, required: true },
    baseUrl: { type: String, required: true },
})

const endpoints = [
    {
        method: 'GET',
        endpoint: '/api/inventory/items',
        desc: 'Get all inventory items',
    },
    {
        method: 'POST',
        endpoint: '/api/auth/login',
        desc: 'Authentication login endpoint',
    },
    {
        method: 'GET',
        endpoint: '/api/finance/reports',
        desc: 'Retrieve finance reports',
    },
    {
        method: 'POST',
        endpoint: '/api/procurement/request',
        desc: 'Create procurement request',
    },
]

const stats = [
    { label: 'Endpoints', value: '120+' },
    { label: 'Modules', value: '77' },
    { label: 'Uptime', value: '99.9%' },
]
const year = new Date().getFullYear()
</script>

<template>
    <Head :title="api.name + ' — API Documentation'" />

    <main
        class="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-100 text-slate-800 overflow-hidden"
    >
        <!-- Background -->
        <div class="absolute top-0 left-0 w-[35rem] h-[35rem] bg-sky-100 blur-3xl rounded-full" />
        <div
            class="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-blue-500/20 blur-3xl rounded-full"
        />

        <!-- ── Navbar ── -->
        <header class="relative z-10 border-b border-sky-100 backdrop-blur-xl bg-white/60">
            <div
                class="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between"
            >
                <div>
                    <h1 class="text-4xl font-black tracking-tight">
                        <span class="text-sky-500">Nexora</span
                        ><span class="text-sky-500">-API</span>
                    </h1>
                    <p class="text-slate-500 mt-2 text-sm tracking-wide">
                        Next Generation Operations Platform
                    </p>
                </div>

                <div class="flex items-center gap-4">
                    <div
                        class="px-5 py-3 rounded-2xl bg-emerald-100 border border-emerald-400/20 text-emerald-600 text-sm font-medium"
                    >
                        API Status : Online
                    </div>

                    <Link
                        :href="route('login')"
                        class="rounded-2xl bg-sky-500 hover:bg-sky-400 transition font-semibold shadow-lg shadow-sky-200 text-white px-6 py-3"
                    >
                        API Docs
                    </Link>
                </div>
            </div>
        </header>

        <!-- ── Hero ── -->
        <section
            class="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 grid lg:grid-cols-2 gap-16 items-center"
        >
            <!-- Left -->
            <div>
                <div
                    class="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border border-sky-200 bg-sky-100 mb-8 text-sky-600 text-sm font-medium"
                >
                    <!-- Server icon -->
                    <svg
                        class="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m4.196 0l1.209-5.04a1.125 1.125 0 00-.094-1.164l-1.75-3.507a1.125 1.125 0 00-1.144-.05h-2.303a1.125 1.125 0 00-1.144.05L7.002 12.07l-1.209 5.04m10.984 0h3.433"
                        />
                    </svg>
                    Enterprise Backend Infrastructure
                </div>

                <h2 class="text-6xl lg:text-7xl font-black leading-tight mb-8">
                    Powerful API
                    <span class="block text-sky-500">
                        For Enterprise Operations
                    </span>
                </h2>

                <p
                    class="text-slate-600 text-xl leading-relaxed mb-10 max-w-2xl"
                >
                    Nexora API powers inventory, finance, procurement, HR, and
                    operational systems through secure, scalable, and realtime
                    backend services.
                </p>

                <div class="flex flex-wrap gap-5">
                    <Link
                        :href="route('login')"
                        class="inline-block px-8 py-5 rounded-2xl bg-sky-500 hover:bg-sky-400 transition font-bold shadow-2xl shadow-sky-200 text-white no-underline"
                    >
                        Open Documentation
                    </Link>

                    <button
                        class="px-8 py-5 rounded-2xl border border-sky-100 bg-white hover:bg-sky-100 transition font-semibold"
                    >
                        API Reference
                    </button>
                </div>

                <!-- Stats -->
                <div class="grid grid-cols-3 gap-5 mt-14">
                    <div
                        v-for="stat in stats"
                        :key="stat.label"
                        class="rounded-3xl border border-sky-100 bg-white backdrop-blur-xl p-6"
                    >
                        <h3 class="text-4xl font-black text-sky-500">
                            {{ stat.value }}
                        </h3>
                        <p class="text-slate-500 mt-2 text-sm">{{ stat.label }}</p>
                    </div>
                </div>
            </div>

            <!-- Right – Terminal card -->
            <div class="relative">
                <div class="absolute inset-0 bg-sky-100 blur-3xl rounded-full" />

                <div
                    class="relative rounded-[2rem] border border-sky-100 bg-white backdrop-blur-2xl overflow-hidden shadow-2xl"
                >
                    <!-- Terminal header -->
                    <div
                        class="px-6 py-4 border-b border-sky-100 flex items-center justify-between bg-sky-50"
                    >
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 rounded-full bg-red-400" />
                            <div class="w-3 h-3 rounded-full bg-yellow-400" />
                            <div class="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                        <div class="text-sm text-slate-500">api.nexora.local</div>
                    </div>

                    <!-- Endpoint cards -->
                    <div class="p-6 space-y-5">
                        <div
                            v-for="ep in endpoints"
                            :key="ep.endpoint"
                            class="rounded-2xl border border-sky-100 bg-sky-50 p-5 hover:border-sky-400/30 transition"
                        >
                            <div class="flex items-center gap-4 mb-3">
                                <span
                                    :class="[
                                        ep.method === 'GET'
                                            ? 'bg-emerald-500/20 text-emerald-600'
                                            : 'bg-sky-100 text-sky-600',
                                        'px-3 py-1 rounded-lg text-xs font-bold',
                                    ]"
                                >
                                    {{ ep.method }}
                                </span>
                                <code class="text-sky-600 text-sm">
                                    {{ ep.endpoint }}
                                </code>
                            </div>
                            <p class="text-slate-500 text-sm">{{ ep.desc }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ── Features ── -->
        <section class="relative z-10 max-w-7xl mx-auto px-6 pb-28">
            <div class="text-center mb-16">
                <p class="text-sky-500 uppercase tracking-[0.3em] text-sm mb-4">
                    Backend Services
                </p>
                <h2 class="text-5xl font-black mb-6">
                    Enterprise Grade Infrastructure
                </h2>
                <p class="text-slate-500 text-lg max-w-3xl mx-auto">
                    Secure, scalable, and optimized backend architecture built
                    for modern enterprise operations.
                </p>
            </div>

            <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                <!-- ShieldCheck -->
                <div
                    class="rounded-3xl border border-sky-100 bg-white backdrop-blur-xl p-7 hover:-translate-y-2 transition duration-300"
                >
                    <div
                        class="w-16 h-16 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center mb-6"
                    >
                        <svg
                            class="w-8 h-8 text-sky-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.309-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                            />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-4">
                        Secure Authentication
                    </h3>
                    <p class="text-slate-500 leading-relaxed">
                        JWT &amp; Sanctum authentication with enterprise
                        security.
                    </p>
                </div>

                <!-- Database -->
                <div
                    class="rounded-3xl border border-sky-100 bg-white backdrop-blur-xl p-7 hover:-translate-y-2 transition duration-300"
                >
                    <div
                        class="w-16 h-16 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center mb-6"
                    >
                        <svg
                            class="w-8 h-8 text-sky-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                            />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-4">Database Engine</h3>
                    <p class="text-slate-500 leading-relaxed">
                        Optimized PostgreSQL &amp; MySQL backend architecture.
                    </p>
                </div>

                <!-- Activity -->
                <div
                    class="rounded-3xl border border-sky-100 bg-white backdrop-blur-xl p-7 hover:-translate-y-2 transition duration-300"
                >
                    <div
                        class="w-16 h-16 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center mb-6"
                    >
                        <svg
                            class="w-8 h-8 text-sky-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                            />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-4">Realtime Services</h3>
                    <p class="text-slate-500 leading-relaxed">
                        Realtime monitoring and operational analytics.
                    </p>
                </div>

                <!-- Layers3 -->
                <div
                    class="rounded-3xl border border-sky-100 bg-white backdrop-blur-xl p-7 hover:-translate-y-2 transition duration-300"
                >
                    <div
                        class="w-16 h-16 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center mb-6"
                    >
                        <svg
                            class="w-8 h-8 text-sky-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 15.75l4.179-2.25m11.142 0-5.571 3-5.571-3"
                            />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-4">
                        Modular Architecture
                    </h3>
                    <p class="text-sky-500 leading-relaxed">
                        Scalable module-based enterprise API structure.
                    </p>
                </div>
            </div>
        </section>
    </main>
</template>
