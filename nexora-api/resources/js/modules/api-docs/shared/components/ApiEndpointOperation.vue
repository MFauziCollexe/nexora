<script setup>
import { reactive } from 'vue'
import { formatJson, methodTheme } from '../utils/apiDocsTheme'

const props = defineProps({
    endpoint: {
        type: Object,
        required: true,
    },
    authState: {
        type: Object,
        default: null,
    },
    requestBodies: {
        type: Object,
        required: true,
    },
    executeResults: {
        type: Object,
        required: true,
    },
    executing: {
        type: Object,
        required: true,
    },
})

const emit = defineEmits(['ensure-request-body', 'reset-request-body', 'execute'])

const expanded = reactive({})
const tryOut = reactive({})
const activeExampleTabs = reactive({})
const activeResponseTabs = reactive({})

const exampleTab = (path) => activeExampleTabs[path] ?? 'example'
const responseTab = (key) => activeResponseTabs[key] ?? 'example'

const toggleExpanded = () => {
    expanded[props.endpoint.path] = !expanded[props.endpoint.path]
}

const toggleTryOut = () => {
    emit('ensure-request-body', props.endpoint)
    tryOut[props.endpoint.path] = !tryOut[props.endpoint.path]
}
</script>

<template>
    <div :class="['overflow-hidden rounded border shadow-sm', methodTheme(endpoint.method).border]">
        <button
            type="button"
            :class="[
                'flex min-h-[44px] w-full flex-col gap-3 px-2 py-1.5 text-left md:flex-row md:items-center md:justify-between',
                methodTheme(endpoint.method).row,
                expanded[endpoint.path] ? 'ring-2 ring-inset ring-slate-700' : ''
            ]"
            @click="toggleExpanded"
        >
            <div class="flex min-w-0 items-center gap-3">
                <span :class="['inline-flex h-8 w-20 shrink-0 items-center justify-center rounded text-sm font-bold uppercase tracking-wide text-white', methodTheme(endpoint.method).badge]">
                    {{ endpoint.method }}
                </span>
                <div class="min-w-0 leading-tight">
                    <code class="font-mono text-lg font-bold leading-none text-slate-800 dark:text-white">{{ endpoint.path }}</code>
                    <span class="ml-3 text-sm text-slate-700 dark:text-slate-300">{{ endpoint.description }}</span>
                </div>
            </div>
            <span class="px-2 text-2xl font-light leading-none text-black dark:text-white">{{ expanded[endpoint.path] ? '-' : '+' }}</span>
        </button>

        <div v-show="expanded[endpoint.path]" class="bg-white dark:bg-slate-950">
            <section :class="['px-4 py-5 text-sm text-slate-700 dark:text-slate-200', methodTheme(endpoint.method).details]">
                {{ endpoint.auth ? 'This operation uses your current login session.' : endpoint.description }}
            </section>

            <section class="flex items-center justify-between border-y border-slate-200 bg-white px-4 py-2.5 dark:border-slate-700 dark:bg-slate-900">
                <h2 class="text-sm font-bold text-slate-800 dark:text-white">Parameters</h2>
                <button
                    type="button"
                    class="h-8 min-w-24 rounded border-2 border-slate-500 bg-white px-4 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-500 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-800"
                    @click="toggleTryOut"
                >
                    {{ tryOut[endpoint.path] ? 'Cancel' : 'Try it out' }}
                </button>
            </section>

            <section :class="['px-4 py-5', methodTheme(endpoint.method).details]">
                <div class="grid grid-cols-[90px_minmax(0,1fr)] gap-5 border-b border-slate-400 pb-2.5 text-xs font-bold text-slate-800 dark:border-slate-600 dark:text-white">
                    <div>Name</div>
                    <div>Description</div>
                </div>

                <div v-if="endpoint.requestExample" class="grid grid-cols-[90px_minmax(0,1fr)] gap-5 py-3">
                    <div>
                        <p class="text-sm font-bold text-slate-800 dark:text-white">body <span class="text-[10px] font-bold text-red-500 dark:text-red-400">* required</span></p>
                        <p class="mt-1 font-mono text-xs font-bold text-slate-800 dark:text-slate-200">object</p>
                        <p class="mt-1 text-xs italic text-slate-600 dark:text-slate-400">(body)</p>
                    </div>
                    <div class="min-w-0">
                        <p class="text-sm text-slate-800 dark:text-slate-200">{{ endpoint.name }} request object</p>
                        <div class="mt-3 flex items-center gap-2 text-xs">
                            <button
                                type="button"
                                :class="exampleTab(endpoint.path) === 'example' ? 'font-bold text-slate-800 dark:text-white' : 'font-medium text-slate-500 dark:text-slate-400'"
                                @click="activeExampleTabs[endpoint.path] = 'example'"
                            >
                                Example Value
                            </button>
                            <span class="h-5 w-px bg-slate-300"></span>
                            <button
                                type="button"
                                :class="exampleTab(endpoint.path) === 'schema' ? 'font-bold text-slate-800 dark:text-white' : 'font-medium text-slate-500 dark:text-slate-400'"
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
                        <label class="mt-2.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">Parameter content type</label>
                        <select class="mt-1 h-9 w-full max-w-[210px] rounded border border-slate-500 bg-white px-3 text-sm font-bold leading-normal text-slate-700 shadow-sm dark:bg-slate-900 dark:text-white">
                            <option>application/json</option>
                        </select>
                    </div>
                </div>

                <div v-else class="py-3 text-sm text-slate-700 dark:text-slate-300">
                    No parameters
                </div>

                <div v-if="tryOut[endpoint.path]" class="mt-3 flex flex-col gap-2 sm:flex-row">
                    <button
                        type="button"
                        class="h-8 rounded bg-sky-600 px-6 text-xs font-bold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
                        :disabled="executing[endpoint.path]"
                        @click="$emit('execute', endpoint)"
                    >
                        {{ executing[endpoint.path] ? 'Executing...' : 'Execute' }}
                    </button>
                    <button
                        type="button"
                        class="h-8 rounded border border-slate-400 bg-white px-6 text-xs font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                        @click="$emit('reset-request-body', endpoint)"
                    >
                        Reset
                    </button>
                </div>

                <div v-if="executeResults[endpoint.path]" class="mt-4">
                    <div class="grid grid-cols-[70px_minmax(0,1fr)] gap-5 border-b border-slate-400 pb-2 text-xs font-bold text-slate-800 dark:border-slate-600 dark:text-white">
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

            <section class="flex items-center justify-between border-y border-slate-200 bg-white px-4 py-2.5 dark:border-slate-700 dark:bg-slate-900">
                <h2 class="text-sm font-bold text-slate-800 dark:text-white">Responses</h2>
                <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-slate-800 dark:text-slate-200">Response content type</span>
                    <select class="h-9 w-[210px] rounded border-2 border-slate-600 bg-white px-3 text-sm font-bold leading-normal text-slate-700 shadow-sm dark:bg-slate-900 dark:text-white">
                        <option>application/json</option>
                    </select>
                </div>
            </section>

            <section :class="['px-4 py-5', methodTheme(endpoint.method).details]">
                <div class="grid grid-cols-[60px_minmax(0,1fr)] gap-4 border-b border-slate-400 pb-2.5 text-xs font-bold text-slate-800 dark:border-slate-600 dark:text-white">
                    <div>Code</div>
                    <div>Description</div>
                </div>

                <div
                    v-for="response in endpoint.responses"
                    :key="`${endpoint.path}-${response.code}`"
                    class="grid grid-cols-[60px_minmax(0,1fr)] gap-4 py-2.5"
                >
                    <div class="text-xs text-slate-800 dark:text-slate-200">{{ response.code }}</div>
                    <div class="min-w-0">
                        <p class="text-sm text-slate-800 dark:text-slate-200">{{ response.description }}</p>
                        <div class="mt-3 flex items-center gap-2 text-xs">
                            <button
                                type="button"
                                :class="responseTab(`${endpoint.path}-${response.code}`) === 'example' ? 'font-bold text-slate-800 dark:text-white' : 'font-medium text-slate-500 dark:text-slate-400'"
                                @click="activeResponseTabs[`${endpoint.path}-${response.code}`] = 'example'"
                            >
                                Example Value
                            </button>
                            <span class="h-6 w-px bg-slate-300"></span>
                            <button
                                type="button"
                                :class="responseTab(`${endpoint.path}-${response.code}`) === 'schema' ? 'font-bold text-slate-800 dark:text-white' : 'font-medium text-slate-500 dark:text-slate-400'"
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
</template>
