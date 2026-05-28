<script setup>
import { computed, reactive } from 'vue'
import DashboardLayout from '@/Layouts/DashboardLayout.vue'
import { authEndpoints } from '@/data/dashboard'

const props = defineProps({
    page: {
        type: String,
        default: 'overview',
    },
})

const title = computed(() => {
    return props.page
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
})

const isAuthPage = computed(() => props.page === 'auth')
const expanded = reactive({})
const modelExpanded = reactive({})
const tryOut = reactive({})
const requestBodies = reactive({})
const executeResults = reactive({})
const executing = reactive({})
const activeExampleTabs = reactive({})
const activeResponseTabs = reactive({})
const authState = reactive({
    token: typeof localStorage !== 'undefined' ? localStorage.getItem('nexora_api_token') ?? '' : '',
})

const modelSchemas = [
    {
        name: 'AuthTokenResponse',
        fields: [
            { name: 'token_type', type: 'string', open: true },
            { name: 'access_token', type: 'string', open: true },
            { name: 'user', type: '[...]', open: false },
        ],
    },
    {
        name: 'User',
        fields: [
            { name: 'id', type: 'integer($int64)', open: true },
            { name: 'name', type: 'string', open: true },
            { name: 'email', type: 'string', open: true },
            { name: 'email_verified_at', type: '[...]', open: false },
            { name: 'created_at', type: 'string($date-time)', open: true },
        ],
    },
    {
        name: 'ValidationError',
        fields: [
            { name: 'message', type: 'string', open: true },
            { name: 'errors', type: '[...]', open: false },
        ],
    },
]

const formatJson = (value) => JSON.stringify(value ?? {}, null, 2)
const exampleTab = (path) => activeExampleTabs[path] ?? 'example'
const responseTab = (key) => activeResponseTabs[key] ?? 'example'

const methodTheme = (method) => {
    const themes = {
        GET: {
            border: 'border-sky-500',
            row: 'bg-[#ebf5ff]',
            details: 'bg-sky-50/80',
            badge: 'bg-sky-500',
            code: 'text-sky-700',
        },
        POST: {
            border: 'border-emerald-500',
            row: 'bg-[#e7f6f0]',
            details: 'bg-emerald-50/80',
            badge: 'bg-emerald-500',
            code: 'text-emerald-700',
        },
        PUT: {
            border: 'border-orange-500',
            row: 'bg-[#fff4e8]',
            details: 'bg-orange-50/80',
            badge: 'bg-orange-500',
            code: 'text-orange-700',
        },
        DELETE: {
            border: 'border-red-500',
            row: 'bg-[#fff0f0]',
            details: 'bg-red-50/80',
            badge: 'bg-red-500',
            code: 'text-red-700',
        },
    }

    return themes[method] ?? themes.POST
}

const toggleExpanded = (path) => {
    expanded[path] = !expanded[path]
}

const toggleModel = (name) => {
    modelExpanded[name] = !modelExpanded[name]
}

const toggleTryOut = (endpoint) => {
    if (!requestBodies[endpoint.path]) {
        requestBodies[endpoint.path] = endpoint.requestExample ? formatJson(endpoint.requestExample) : ''
    }

    tryOut[endpoint.path] = !tryOut[endpoint.path]
}

const executeEndpoint = async (endpoint) => {
    executing[endpoint.path] = true
    executeResults[endpoint.path] = null

    try {
        const data = endpoint.requestExample ? JSON.parse(requestBodies[endpoint.path] || '{}') : undefined
        const response = await window.axios.request({
            method: endpoint.method.toLowerCase(),
            url: endpoint.path,
            data,
            headers: {
                Accept: 'application/json',
                ...(endpoint.auth && authState.token ? { Authorization: `Bearer ${authState.token}` } : {}),
            },
        })

        if (response.data?.access_token) {
            authState.token = response.data.access_token
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('nexora_api_token', response.data.access_token)
            }
        }

        executeResults[endpoint.path] = {
            ok: true,
            status: response.status,
            statusText: response.statusText,
            data: response.data,
            headers: response.headers,
        }
    } catch (error) {
        executeResults[endpoint.path] = {
            ok: false,
            status: error.response?.status ?? 'Error',
            statusText: error.response?.statusText ?? error.message,
            data: error.response?.data ?? { message: error.message },
            headers: error.response?.headers ?? {},
        }
    } finally {
        executing[endpoint.path] = false
    }
}
</script>

<template>
    <DashboardLayout>
        <div class="p-6">
            <div class="mb-6">
                <h1 class="text-3xl font-bold text-slate-900">{{ title }}</h1>
                <p class="mt-1.5 text-sm text-slate-500">
                    {{ isAuthPage ? 'Operations about authentication.' : 'This page is intentionally blank for now.' }}
                </p>
            </div>

            <div v-if="isAuthPage" class="space-y-3">
                <div class="flex items-center justify-between border-b border-slate-300 pb-4">
                    <div class="flex items-center gap-3">
                        <h2 class="text-2xl font-bold leading-none text-slate-800">auth</h2>
                        <span class="text-base text-slate-700">Operations about authentication</span>
                    </div>
                    <div class="flex items-center gap-5">
                        <a href="#" class="text-base text-blue-700">Find out more about Nexora API</a>
                        <span class="text-2xl font-light leading-none text-black">^</span>
                    </div>
                </div>

                <div
                    v-for="endpoint in authEndpoints"
                    :key="endpoint.path"
                    :class="['overflow-hidden rounded border shadow-sm', methodTheme(endpoint.method).border]"
                >
                    <button
                        type="button"
                        :class="[
                            'flex min-h-[44px] w-full flex-col gap-3 px-2 py-1.5 text-left md:flex-row md:items-center md:justify-between',
                            methodTheme(endpoint.method).row,
                            expanded[endpoint.path] ? 'ring-2 ring-inset ring-slate-700' : ''
                        ]"
                        @click="toggleExpanded(endpoint.path)"
                    >
                        <div class="flex min-w-0 items-center gap-3">
                            <span :class="['inline-flex h-8 w-20 shrink-0 items-center justify-center rounded text-sm font-bold uppercase tracking-wide text-white', methodTheme(endpoint.method).badge]">
                                {{ endpoint.method }}
                            </span>
                            <div class="min-w-0 leading-tight">
                                <code class="font-mono text-lg font-bold leading-none text-slate-800">{{ endpoint.path }}</code>
                                <span class="ml-3 text-sm text-slate-700">{{ endpoint.description }}</span>
                            </div>
                        </div>
                        <span class="px-2 text-2xl font-light leading-none text-black">{{ expanded[endpoint.path] ? '^' : 'v' }}</span>
                    </button>

                    <div v-show="expanded[endpoint.path]" class="bg-white">
                        <section :class="['px-4 py-5 text-sm text-slate-700', methodTheme(endpoint.method).details]">
                            {{ endpoint.auth ? 'This operation requires a bearer token.' : endpoint.description }}
                        </section>

                        <section class="flex items-center justify-between border-y border-slate-200 bg-white px-4 py-2.5">
                            <h2 class="text-sm font-bold text-slate-800">Parameters</h2>
                            <button
                                type="button"
                                class="h-8 min-w-24 rounded border-2 border-slate-500 bg-white px-4 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
                                @click="toggleTryOut(endpoint)"
                            >
                                {{ tryOut[endpoint.path] ? 'Cancel' : 'Try it out' }}
                            </button>
                        </section>

                        <section :class="['px-4 py-5', methodTheme(endpoint.method).details]">
                            <div class="grid grid-cols-[90px_minmax(0,1fr)] gap-5 border-b border-slate-400 pb-2.5 text-xs font-bold text-slate-800">
                                <div>Name</div>
                                <div>Description</div>
                            </div>

                            <div v-if="endpoint.requestExample" class="grid grid-cols-[90px_minmax(0,1fr)] gap-5 py-3">
                                <div>
                                    <p class="text-sm font-bold text-slate-800">body <span class="text-[10px] font-bold text-red-500">* required</span></p>
                                    <p class="mt-1 font-mono text-xs font-bold text-slate-800">object</p>
                                    <p class="mt-1 text-xs italic text-slate-600">(body)</p>
                                </div>
                                <div class="min-w-0">
                                    <p class="text-sm text-slate-800">{{ endpoint.name }} request object</p>
                                    <div class="mt-3 flex items-center gap-2 text-xs">
                                        <button
                                            type="button"
                                            :class="exampleTab(endpoint.path) === 'example' ? 'font-bold text-slate-800' : 'font-medium text-slate-500'"
                                            @click="activeExampleTabs[endpoint.path] = 'example'"
                                        >
                                            Example Value
                                        </button>
                                        <span class="h-5 w-px bg-slate-300"></span>
                                        <button
                                            type="button"
                                            :class="exampleTab(endpoint.path) === 'schema' ? 'font-bold text-slate-800' : 'font-medium text-slate-500'"
                                            @click="activeExampleTabs[endpoint.path] = 'schema'"
                                        >
                                            Model
                                        </button>
                                    </div>
                                    <textarea
                                        v-if="tryOut[endpoint.path]"
                                        v-model="requestBodies[endpoint.path]"
                                        class="mt-3 min-h-32 w-full rounded bg-[#303030] p-3 font-mono text-[11px] font-bold leading-5 text-emerald-200 outline-none"
                                    ></textarea>
                                    <pre
                                        v-else
                                        class="mt-3 max-h-[260px] overflow-auto rounded bg-[#303030] p-3 font-mono text-[11px] font-bold leading-5 text-white"
                                    >{{ formatJson(exampleTab(endpoint.path) === 'example' ? endpoint.requestExample : endpoint.schemaExample) }}</pre>
                                    <label class="mt-2.5 block text-xs font-semibold text-slate-700">Parameter content type</label>
                                    <select class="mt-1 h-9 w-full max-w-[210px] rounded border border-slate-500 bg-white px-3 text-sm font-bold leading-normal text-slate-700 shadow-sm">
                                        <option>application/json</option>
                                    </select>
                                </div>
                            </div>

                            <div v-else class="py-3 text-sm text-slate-700">
                                No parameters
                            </div>

                            <div v-if="tryOut[endpoint.path]" class="mt-3 flex flex-col gap-2 sm:flex-row">
                                <input
                                    v-if="endpoint.auth"
                                    v-model="authState.token"
                                    type="text"
                                    class="h-8 min-w-0 flex-1 rounded border border-slate-400 bg-white px-3 text-xs text-slate-700"
                                    placeholder="Bearer token"
                                />
                                <button
                                    type="button"
                                    class="h-8 rounded bg-sky-600 px-6 text-xs font-bold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                                    :disabled="executing[endpoint.path]"
                                    @click="executeEndpoint(endpoint)"
                                >
                                    {{ executing[endpoint.path] ? 'Executing...' : 'Execute' }}
                                </button>
                                <button
                                    type="button"
                                    class="h-8 rounded border border-slate-400 bg-white px-6 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                                    @click="requestBodies[endpoint.path] = endpoint.requestExample ? formatJson(endpoint.requestExample) : ''"
                                >
                                    Reset
                                </button>
                            </div>

                            <div v-if="executeResults[endpoint.path]" class="mt-4">
                                <div class="grid grid-cols-[70px_minmax(0,1fr)] gap-5 border-b border-slate-400 pb-2 text-xs font-bold text-slate-800">
                                    <div>Code</div>
                                    <div>Server response</div>
                                </div>
                                <div class="grid grid-cols-[70px_minmax(0,1fr)] gap-5 py-3">
                                    <div :class="['font-bold', executeResults[endpoint.path].ok ? 'text-emerald-700' : 'text-red-700']">
                                        {{ executeResults[endpoint.path].status }}
                                    </div>
                                    <pre class="max-h-[220px] overflow-auto rounded bg-[#303030] p-3 font-mono text-[11px] font-bold leading-5 text-white">{{ formatJson(executeResults[endpoint.path].data) }}</pre>
                                </div>
                            </div>
                        </section>

                        <section class="flex items-center justify-between border-y border-slate-200 bg-white px-4 py-2.5">
                            <h2 class="text-sm font-bold text-slate-800">Responses</h2>
                            <div class="flex items-center gap-2">
                                <span class="text-xs font-bold text-slate-800">Response content type</span>
                                <select class="h-9 w-[210px] rounded border-2 border-slate-600 bg-white px-3 text-sm font-bold leading-normal text-slate-700 shadow-sm">
                                    <option>application/json</option>
                                </select>
                            </div>
                        </section>

                        <section :class="['px-4 py-5', methodTheme(endpoint.method).details]">
                            <div class="grid grid-cols-[60px_minmax(0,1fr)] gap-4 border-b border-slate-400 pb-2.5 text-xs font-bold text-slate-800">
                                <div>Code</div>
                                <div>Description</div>
                            </div>

                            <div
                                v-for="response in endpoint.responses"
                                :key="`${endpoint.path}-${response.code}`"
                                class="grid grid-cols-[60px_minmax(0,1fr)] gap-4 py-2.5"
                            >
                                <div class="text-xs text-slate-800">{{ response.code }}</div>
                                <div class="min-w-0">
                                    <p class="text-sm text-slate-800">{{ response.description }}</p>
                                    <div class="mt-3 flex items-center gap-2 text-xs">
                                        <button
                                            type="button"
                                            :class="responseTab(`${endpoint.path}-${response.code}`) === 'example' ? 'font-bold text-slate-800' : 'font-medium text-slate-500'"
                                            @click="activeResponseTabs[`${endpoint.path}-${response.code}`] = 'example'"
                                        >
                                            Example Value
                                        </button>
                                        <span class="h-6 w-px bg-slate-300"></span>
                                        <button
                                            type="button"
                                            :class="responseTab(`${endpoint.path}-${response.code}`) === 'schema' ? 'font-bold text-slate-800' : 'font-medium text-slate-500'"
                                            @click="activeResponseTabs[`${endpoint.path}-${response.code}`] = 'schema'"
                                        >
                                            Model
                                        </button>
                                    </div>
                                    <pre class="mt-3 max-h-[260px] overflow-auto rounded bg-[#303030] p-3 font-mono text-[11px] font-bold leading-5 text-white">{{ formatJson(response.example) }}</pre>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <div class="overflow-hidden rounded border border-slate-300 bg-white">
                    <button type="button" class="flex w-full items-center justify-between px-4 py-3 text-left">
                        <h2 class="text-xl font-bold text-slate-700">Models</h2>
                        <span class="text-2xl font-light leading-none text-black">^</span>
                    </button>
                    <div class="space-y-3 border-t border-slate-300 p-5">
                        <div
                            v-for="model in modelSchemas"
                            :key="model.name"
                            class="overflow-hidden rounded bg-[#f0f0f0]"
                        >
                            <button
                                type="button"
                                class="flex w-full items-center gap-4 px-5 py-5 text-left"
                                @click="toggleModel(model.name)"
                            >
                                <span class="text-lg font-bold text-slate-700">{{ model.name }}</span>
                                <span class="text-2xl font-bold leading-none text-black">{{ modelExpanded[model.name] ? 'v' : '>' }}</span>
                            </button>

                            <div v-show="modelExpanded[model.name]" class="px-5 pb-5">
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
            </div>

            <div v-else class="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
                <div class="mx-auto max-w-xl">
                    <p class="text-lg font-semibold text-slate-900">
                        Placeholder content
                    </p>
                    <p class="mt-4 text-slate-600">
                        Build the interface for the <strong>{{ title }}</strong> page here later.
                    </p>
                </div>
            </div>
        </div>
    </DashboardLayout>
</template>
