<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Download,
    Eye,
    Filter,
    RefreshCcw,
    X,
} from 'lucide-vue-next'

const logs = ref([])
const methods = ref([])
const statuses = ref([])
const users = ref([])
const loading = ref(false)
const selectedLog = ref(null)
const detailLoading = ref(false)
const currentPage = ref(1)
const pagination = ref({
    current_page: 1,
    from: null,
    last_page: 1,
    per_page: 10,
    to: null,
    total: 0,
})

const filters = reactive({
    from: '',
    to: '',
    method: '',
    status: '',
    user: '',
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

const pageNumbers = computed(() => {
    const pages = []
    const lastPage = pagination.value.last_page || 1
    const start = Math.max(1, currentPage.value - 2)
    const end = Math.min(lastPage, currentPage.value + 2)

    for (let page = start; page <= end; page += 1) {
        pages.push(page)
    }

    return pages
})

const queryString = (page = currentPage.value) => {
    const query = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
        if (value !== '') {
            query.append(key, value)
        }
    })

    query.append('page', page)

    return query.toString()
}

const fetchLogs = async (page = currentPage.value) => {
    loading.value = true
    currentPage.value = page

    try {
        const query = queryString(page)
        const response = await window.axios.get(`/system/api-activity-logs${query ? `?${query}` : ''}`)

        logs.value = response.data.data ?? []
        pagination.value = response.data.meta ?? pagination.value
        currentPage.value = pagination.value.current_page ?? page
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

    fetchLogs(1)
}

const applyFilters = () => {
    fetchLogs(1)
}

const goToPage = (page) => {
    if (page < 1 || page > pagination.value.last_page || page === currentPage.value || loading.value) {
        return
    }

    fetchLogs(page)
}

const exportLogs = () => {
    const query = queryString(currentPage.value)
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

        <section class="rounded border border-slate-200 bg-white p-2.5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div class="flex flex-wrap items-center gap-1.5">
                <div class="w-full sm:w-[118px]">
                    <input
                        v-model="filters.from"
                        type="date"
                        class="h-7 w-full rounded border border-slate-200 bg-white px-1.5 text-[11px] text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                </div>
                <div class="w-full sm:w-[118px]">
                    <input
                        v-model="filters.to"
                        type="date"
                        class="h-7 w-full rounded border border-slate-200 bg-white px-1.5 text-[11px] text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    />
                </div>
                <div class="relative w-full sm:w-[116px]">
                    <select
                        v-model="filters.method"
                        class="h-7 w-full appearance-none rounded border border-slate-200 bg-white px-1.5 pr-5 text-[10px] font-medium leading-none text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    >
                        <option value="">All Methods</option>
                        <option v-for="method in methods" :key="method" :value="method">{{ method }}</option>
                    </select>
                    <ChevronDown class="pointer-events-none absolute right-1.5 top-2 h-3 w-3 text-slate-400" />
                </div>
                <div class="relative w-full sm:w-[108px]">
                    <select
                        v-model="filters.status"
                        class="h-7 w-full appearance-none rounded border border-slate-200 bg-white px-1.5 pr-5 text-[10px] font-medium leading-none text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    >
                        <option value="">All Status</option>
                        <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
                    </select>
                    <ChevronDown class="pointer-events-none absolute right-1.5 top-2 h-3 w-3 text-slate-400" />
                </div>
                <div class="relative w-full sm:w-[106px]">
                    <select
                        v-model="filters.user"
                        class="h-7 w-full appearance-none rounded border border-slate-200 bg-white px-1.5 pr-5 text-[10px] font-medium leading-none text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                    >
                        <option value="">All Users</option>
                        <option v-for="user in users" :key="user" :value="user">{{ user }}</option>
                    </select>
                    <ChevronDown class="pointer-events-none absolute right-1.5 top-2 h-3 w-3 text-slate-400" />
                </div>
                <div class="ml-auto flex w-full items-center justify-end gap-1.5 sm:w-auto">
                    <button
                        type="button"
                        class="inline-flex h-7 items-center justify-center gap-1 rounded border border-slate-200 bg-white px-2.5 text-[11px] font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                        :disabled="loading || !hasFilters"
                        @click="resetFilters"
                    >
                        <RefreshCcw class="h-3 w-3" />
                        Reset
                    </button>
                    <button
                        type="button"
                        class="inline-flex h-7 items-center justify-center gap-1 rounded bg-violet-600 px-2.5 text-[11px] font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60"
                        :disabled="loading"
                        @click="applyFilters"
                    >
                        <Filter class="h-3 w-3" />
                        Apply Filter
                    </button>
                </div>
            </div>
        </section>

        <section class="overflow-hidden rounded border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <div class="flex items-center justify-end border-b border-slate-200 px-2.5 py-2 dark:border-slate-800">
                <button
                    type="button"
                    class="inline-flex h-7 items-center gap-1 rounded border border-slate-200 bg-white px-2.5 text-[11px] font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                    @click="exportLogs"
                >
                    <Download class="h-3 w-3" />
                    Export
                    <ChevronDown class="h-3 w-3 text-slate-400" />
                </button>
            </div>

            <div class="overflow-x-auto">
                <table class="min-w-[820px] w-full text-left text-[11px]">
                    <thead class="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                        <tr>
                            <th class="px-2.5 py-2">Time</th>
                            <th class="px-2.5 py-2">User</th>
                            <th class="px-2.5 py-2">Method</th>
                            <th class="px-2.5 py-2">Endpoint</th>
                            <th class="px-2.5 py-2">Status</th>
                            <th class="px-2.5 py-2">IP Address</th>
                            <th class="px-2.5 py-2">Response Time</th>
                            <th class="px-2.5 py-2">User Agent</th>
                            <th class="px-2.5 py-2 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-200 text-slate-700 dark:divide-slate-800 dark:text-slate-200">
                        <tr v-if="loading">
                            <td colspan="9" class="px-2.5 py-8 text-center text-slate-500">Loading logs...</td>
                        </tr>
                        <tr v-else-if="logs.length === 0">
                            <td colspan="9" class="px-2.5 py-8 text-center text-slate-500">No API activity logs found.</td>
                        </tr>
                        <tr v-for="log in logs" v-else :key="log.id" class="transition hover:bg-slate-50 dark:hover:bg-slate-900">
                            <td class="whitespace-nowrap px-2.5 py-2 font-medium text-slate-900 dark:text-white">{{ log.time }}</td>
                            <td class="px-2.5 py-2">{{ log.user }}</td>
                            <td class="px-2.5 py-2">
                                <span :class="['inline-flex h-5 items-center rounded px-1.5 text-[10px] font-bold ring-1', methodClasses[log.method] ?? 'bg-slate-50 text-slate-700 ring-slate-100']">
                                    {{ log.method }}
                                </span>
                            </td>
                            <td class="px-2.5 py-2 font-mono text-[10px] text-slate-800 dark:text-slate-200">{{ log.endpoint }}</td>
                            <td class="px-2.5 py-2">
                                <span :class="['inline-flex h-5 items-center rounded px-1.5 text-[10px] font-bold ring-1', statusClass(log.status)]">
                                    {{ log.status }}
                                </span>
                            </td>
                            <td class="px-2.5 py-2">{{ log.ip_address ?? '-' }}</td>
                            <td class="px-2.5 py-2">{{ log.response_time }} ms</td>
                            <td class="px-2.5 py-2">{{ truncate(log.user_agent) }}</td>
                            <td class="px-2.5 py-2 text-right">
                                <button
                                    type="button"
                                    class="inline-flex h-6 items-center gap-1 rounded border border-slate-200 px-2 text-[10px] font-bold text-violet-700 transition hover:bg-violet-50 dark:border-slate-700 dark:text-violet-300 dark:hover:bg-violet-500/10"
                                    @click="viewLog(log)"
                                >
                                    <Eye class="h-3 w-3" />
                                    View
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex flex-col gap-2 border-t border-slate-200 px-2.5 py-2 text-[11px] font-semibold text-slate-600 dark:border-slate-800 dark:text-slate-300 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    Showing
                    <span class="text-slate-900 dark:text-white">{{ pagination.from ?? 0 }}</span>
                    to
                    <span class="text-slate-900 dark:text-white">{{ pagination.to ?? 0 }}</span>
                    of
                    <span class="text-slate-900 dark:text-white">{{ pagination.total }}</span>
                    logs
                </div>

                <div class="flex items-center gap-1">
                    <button
                        type="button"
                        class="inline-flex h-7 w-7 items-center justify-center rounded border border-slate-200 text-slate-700 transition hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
                        :disabled="loading || currentPage <= 1"
                        @click="goToPage(currentPage - 1)"
                    >
                        <ChevronLeft class="h-3.5 w-3.5" />
                    </button>

                    <button
                        v-for="page in pageNumbers"
                        :key="page"
                        type="button"
                        :class="[
                            'inline-flex h-7 min-w-7 items-center justify-center rounded border px-2 text-[11px] transition disabled:opacity-50',
                            page === currentPage
                                ? 'border-violet-600 bg-violet-600 text-white'
                                : 'border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800',
                        ]"
                        :disabled="loading || page === currentPage"
                        @click="goToPage(page)"
                    >
                        {{ page }}
                    </button>

                    <button
                        type="button"
                        class="inline-flex h-7 w-7 items-center justify-center rounded border border-slate-200 text-slate-700 transition hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
                        :disabled="loading || currentPage >= pagination.last_page"
                        @click="goToPage(currentPage + 1)"
                    >
                        <ChevronRight class="h-3.5 w-3.5" />
                    </button>
                </div>
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
