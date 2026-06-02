<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import {
    ChevronDown,
    Download,
    Eye,
    Filter,
    RefreshCcw,
    Search,
    X,
} from 'lucide-vue-next'

const logs = ref([])
const methods = ref([])
const statuses = ref([])
const users = ref([])
const loading = ref(false)
const selectedLog = ref(null)
const detailLoading = ref(false)

const filters = reactive({
    from: '',
    to: '',
    method: '',
    status: '',
    user: '',
    search: '',
})

const methodClasses = {
    GET: 'bg-blue-50 text-blue-700 ring-blue-100',
    POST: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    PUT: 'bg-amber-50 text-amber-700 ring-amber-100',
    PATCH: 'bg-orange-50 text-orange-700 ring-orange-100',
    DELETE: 'bg-red-50 text-red-700 ring-red-100',
}

const statusClass = (status) => {
    if (status >= 500) return 'bg-red-50 text-red-700 ring-red-100'
    if (status >= 400) return 'bg-rose-50 text-rose-700 ring-rose-100'
    if (status >= 300) return 'bg-amber-50 text-amber-700 ring-amber-100'

    return 'bg-emerald-50 text-emerald-700 ring-emerald-100'
}

const hasFilters = computed(() =>
    Object.values(filters).some((value) => value !== ''),
)

const queryString = () => {
    const query = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
        if (value !== '') {
            query.append(key, value)
        }
    })

    return query.toString()
}

const fetchLogs = async () => {
    loading.value = true

    try {
        const query = queryString()
        const response = await window.axios.get(`/system/api-activity-logs${query ? `?${query}` : ''}`)

        logs.value = response.data.data ?? []
        methods.value = response.data.filters?.methods ?? []
        statuses.value = response.data.filters?.statuses ?? []
        users.value = response.data.filters?.users ?? []
    } finally {
        loading.value = false
    }
}

const resetFilters = () => {
    Object.keys(filters).forEach((key) => {
        filters[key] = ''
    })

    fetchLogs()
}

const exportLogs = () => {
    const query = queryString()
    window.location.href = `/system/api-activity-logs/export${query ? `?${query}` : ''}`
}

const viewLog = async (log) => {
    selectedLog.value = log
    detailLoading.value = true

    try {
        const response = await window.axios.get(`/system/api-activity-logs/${log.id}`)
        selectedLog.value = response.data.data
    } finally {
        detailLoading.value = false
    }
}

const closeDetail = () => {
    selectedLog.value = null
}

const truncate = (value, length = 28) => {
    if (!value) return '-'

    return value.length > length ? `${value.slice(0, length)} ...` : value
}

const formatJson = (value) => JSON.stringify(value ?? {}, null, 2)

onMounted(fetchLogs)
</script>

<template>
    <div class="space-y-6">
        <div>
            <h1 class="text-2xl font-bold text-slate-950 dark:text-white">Logs</h1>
            <p class="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">Retrieve API activity logs.</p>
        </div>

        <section class="rounded border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div class="grid gap-3 xl:grid-cols-[minmax(0,1fr)_auto]">
                <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-[170px_170px_130px_130px_150px_minmax(180px,1fr)]">
                    <input
                        v-model="filters.from"
                        type="date"
                        class="h-10 rounded border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                    <input
                        v-model="filters.to"
                        type="date"
                        class="h-10 rounded border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                    <div class="relative">
                        <select
                            v-model="filters.method"
                            class="h-10 w-full appearance-none rounded border border-slate-200 bg-white px-3 pr-8 text-sm font-medium text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                        >
                            <option value="">All Methods</option>
                            <option v-for="method in methods" :key="method" :value="method">{{ method }}</option>
                        </select>
                        <ChevronDown class="pointer-events-none absolute right-3 top-3 h-4 w-4 text-slate-400" />
                    </div>
                    <div class="relative">
                        <select
                            v-model="filters.status"
                            class="h-10 w-full appearance-none rounded border border-slate-200 bg-white px-3 pr-8 text-sm font-medium text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                        >
                            <option value="">All Status</option>
                            <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
                        </select>
                        <ChevronDown class="pointer-events-none absolute right-3 top-3 h-4 w-4 text-slate-400" />
                    </div>
                    <div class="relative">
                        <select
                            v-model="filters.user"
                            class="h-10 w-full appearance-none rounded border border-slate-200 bg-white px-3 pr-8 text-sm font-medium text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                        >
                            <option value="">All Users</option>
                            <option v-for="user in users" :key="user" :value="user">{{ user }}</option>
                        </select>
                        <ChevronDown class="pointer-events-none absolute right-3 top-3 h-4 w-4 text-slate-400" />
                    </div>
                    <div class="relative">
                        <input
                            v-model="filters.search"
                            type="search"
                            placeholder="Search endpoint, IP, user..."
                            class="h-10 w-full rounded border border-slate-200 bg-white px-3 pr-10 text-sm text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                            @keydown.enter="fetchLogs"
                        />
                        <Search class="absolute right-3 top-3 h-4 w-4 text-slate-400" />
                    </div>
                </div>

                <div class="flex flex-col gap-3 sm:flex-row xl:border-l xl:border-slate-200 xl:pl-4 dark:xl:border-slate-800">
                    <button
                        type="button"
                        class="inline-flex h-10 items-center justify-center gap-2 rounded border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                        :disabled="loading || !hasFilters"
                        @click="resetFilters"
                    >
                        <RefreshCcw class="h-4 w-4" />
                        Reset
                    </button>
                    <button
                        type="button"
                        class="inline-flex h-10 items-center justify-center gap-2 rounded bg-violet-600 px-4 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60"
                        :disabled="loading"
                        @click="fetchLogs"
                    >
                        <Filter class="h-4 w-4" />
                        Apply Filter
                    </button>
                </div>
            </div>
        </section>

        <section class="overflow-hidden rounded border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div class="flex items-center justify-end border-b border-slate-200 px-4 py-3 dark:border-slate-800">
                <button
                    type="button"
                    class="inline-flex h-9 items-center gap-2 rounded border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                    @click="exportLogs"
                >
                    <Download class="h-4 w-4" />
                    Export
                    <ChevronDown class="h-4 w-4 text-slate-400" />
                </button>
            </div>

            <div class="overflow-x-auto">
                <table class="min-w-[980px] w-full text-left text-sm">
                    <thead class="border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                        <tr>
                            <th class="px-4 py-3">Time</th>
                            <th class="px-4 py-3">User</th>
                            <th class="px-4 py-3">Method</th>
                            <th class="px-4 py-3">Endpoint</th>
                            <th class="px-4 py-3">Status</th>
                            <th class="px-4 py-3">IP Address</th>
                            <th class="px-4 py-3">Response Time</th>
                            <th class="px-4 py-3">User Agent</th>
                            <th class="px-4 py-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 text-slate-700 dark:divide-slate-800 dark:text-slate-200">
                        <tr v-if="loading">
                            <td colspan="9" class="px-4 py-10 text-center text-slate-500">Loading logs...</td>
                        </tr>
                        <tr v-else-if="logs.length === 0">
                            <td colspan="9" class="px-4 py-10 text-center text-slate-500">No API activity logs found.</td>
                        </tr>
                        <tr v-for="log in logs" v-else :key="log.id" class="transition hover:bg-slate-50 dark:hover:bg-slate-900">
                            <td class="whitespace-nowrap px-4 py-3 font-medium text-slate-900 dark:text-white">{{ log.time }}</td>
                            <td class="px-4 py-3">{{ log.user }}</td>
                            <td class="px-4 py-3">
                                <span :class="['inline-flex h-6 items-center rounded px-2 text-xs font-bold ring-1', methodClasses[log.method] ?? 'bg-slate-50 text-slate-700 ring-slate-100']">
                                    {{ log.method }}
                                </span>
                            </td>
                            <td class="px-4 py-3 font-mono text-xs text-slate-800 dark:text-slate-200">{{ log.endpoint }}</td>
                            <td class="px-4 py-3">
                                <span :class="['inline-flex h-6 items-center rounded px-2 text-xs font-bold ring-1', statusClass(log.status)]">
                                    {{ log.status }}
                                </span>
                            </td>
                            <td class="px-4 py-3">{{ log.ip_address ?? '-' }}</td>
                            <td class="px-4 py-3">{{ log.response_time }} ms</td>
                            <td class="px-4 py-3">{{ truncate(log.user_agent) }}</td>
                            <td class="px-4 py-3 text-right">
                                <button
                                    type="button"
                                    class="inline-flex h-8 items-center gap-1.5 rounded border border-slate-200 px-3 text-xs font-bold text-violet-700 transition hover:bg-violet-50 dark:border-slate-700 dark:text-violet-300 dark:hover:bg-violet-500/10"
                                    @click="viewLog(log)"
                                >
                                    <Eye class="h-3.5 w-3.5" />
                                    View
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <div
            v-if="selectedLog"
            class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
            @click.self="closeDetail"
        >
            <section class="max-h-[86vh] w-full max-w-3xl overflow-hidden rounded border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950">
                <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
                    <div>
                        <h2 class="text-lg font-bold text-slate-950 dark:text-white">Log Detail</h2>
                        <p class="mt-1 text-xs text-slate-500">{{ selectedLog.endpoint }}</p>
                    </div>
                    <button
                        type="button"
                        class="flex h-9 w-9 items-center justify-center rounded text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                        @click="closeDetail"
                    >
                        <X class="h-5 w-5" />
                    </button>
                </div>

                <div class="max-h-[70vh] overflow-y-auto p-5">
                    <div v-if="detailLoading" class="py-10 text-center text-sm text-slate-500">Loading detail...</div>
                    <div v-else class="space-y-5">
                        <div class="grid gap-3 sm:grid-cols-2">
                            <div class="rounded bg-slate-50 p-3 dark:bg-slate-900">
                                <p class="text-xs font-bold uppercase text-slate-500">User</p>
                                <p class="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{{ selectedLog.user }}</p>
                            </div>
                            <div class="rounded bg-slate-50 p-3 dark:bg-slate-900">
                                <p class="text-xs font-bold uppercase text-slate-500">Route</p>
                                <p class="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{{ selectedLog.route_name ?? '-' }}</p>
                            </div>
                        </div>

                        <div>
                            <p class="mb-2 text-xs font-bold uppercase text-slate-500">Request Payload</p>
                            <pre class="max-h-56 overflow-auto rounded bg-[#303030] p-3 font-mono text-xs font-bold leading-5 text-white">{{ formatJson(selectedLog.request_payload) }}</pre>
                        </div>

                        <div>
                            <p class="mb-2 text-xs font-bold uppercase text-slate-500">Response Payload</p>
                            <pre class="max-h-56 overflow-auto rounded bg-[#303030] p-3 font-mono text-xs font-bold leading-5 text-white">{{ formatJson(selectedLog.response_payload) }}</pre>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
