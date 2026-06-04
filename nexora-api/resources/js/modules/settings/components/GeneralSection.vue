<script setup>
import { ref } from 'vue'
import { usePage } from '@inertiajs/vue3'

const page = usePage()
const user = page.props.auth.user

const name     = ref(user.name  ?? '')
const email    = ref(user.email ?? '')
const company  = ref('Golden Multi Indotama')
const timezone = ref('Asia/Jakarta (UTC+07:00)')
const language = ref('English')
const theme    = ref('dark')

const timezones = [
    'Asia/Jakarta (UTC+07:00)',
    'Asia/Singapore (UTC+08:00)',
    'Asia/Tokyo (UTC+09:00)',
    'UTC',
]

const languages = ['English', 'Bahasa Indonesia']

const notifications = ref([
    { key: 'security',   label: 'Security Alerts',      sub: 'Important security events',    enabled: true  },
    { key: 'api',        label: 'API Failure Alerts',    sub: 'When your API requests fail',  enabled: true  },
    { key: 'report',     label: 'Monthly Usage Report',  sub: 'Receive monthly usage summary', enabled: true  },
    { key: 'marketing',  label: 'Marketing Updates',     sub: 'Product updates and news',     enabled: false },
])

const initials = (user.name ?? 'U').charAt(0).toUpperCase()
</script>

<template>
    <div class="space-y-6">

        <!-- Account Information -->
        <div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div class="flex items-start justify-between mb-6">
                <div>
                    <h2 class="text-base font-bold text-slate-900 dark:text-white">Account Information</h2>
                    <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Update your account details and preferences.</p>
                </div>
                <div class="flex items-center gap-3">
                    <div class="h-12 w-12 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold text-lg select-none">
                        {{ initials }}
                    </div>
                    <button
                        type="button"
                        class="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        Change Avatar
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Full Name</label>
                    <input
                        v-model="name"
                        type="text"
                        class="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-violet-500/20"
                    />
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Email Address</label>
                    <input
                        v-model="email"
                        type="email"
                        class="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-violet-500/20"
                    />
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                        Company Name
                        <span class="font-normal opacity-50">(Optional)</span>
                    </label>
                    <input
                        v-model="company"
                        type="text"
                        class="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-violet-500/20"
                    />
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Timezone</label>
                    <select
                        v-model="timezone"
                        class="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-violet-500/20"
                    >
                        <option v-for="tz in timezones" :key="tz" :value="tz">{{ tz }}</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Language</label>
                    <select
                        v-model="language"
                        class="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-violet-500/20"
                    >
                        <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
                    </select>
                </div>
            </div>

            <div class="mt-6 flex justify-end">
                <button
                    type="button"
                    class="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700 transition"
                >
                    Save Changes
                </button>
            </div>
        </div>

        <!-- Appearance + Notifications -->
        <div class="grid grid-cols-1 gap-6">

            <!-- Notifications -->
            <div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <h2 class="text-base font-bold text-slate-900 dark:text-white">Notifications</h2>
                <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-5">Manage how you receive notifications.</p>
                <div class="space-y-4">
                    <div
                        v-for="notif in notifications"
                        :key="notif.key"
                        class="flex items-center justify-between"
                    >
                        <div>
                            <p class="text-sm font-semibold text-slate-800 dark:text-slate-100">{{ notif.label }}</p>
                            <p class="text-xs text-slate-500 dark:text-slate-400">{{ notif.sub }}</p>
                        </div>
                        <button
                            type="button"
                            class="relative h-6 w-11 rounded-full transition-colors duration-200 focus:outline-none"
                            :class="notif.enabled ? 'bg-violet-600' : 'bg-slate-200 dark:bg-slate-700'"
                            @click="notif.enabled = !notif.enabled"
                        >
                            <span
                                class="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200"
                                :class="notif.enabled ? 'translate-x-5' : 'translate-x-0.5'"
                            />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>