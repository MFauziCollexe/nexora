<script setup>
import {
    UserCircle2,
    ShieldCheck,
    Code2,
    Webhook,
    Bell,
    CreditCard,
    AlertTriangle,
} from 'lucide-vue-next'

defineProps({
    active: { type: String, default: 'general' }
})

defineEmits(['change'])

const navItems = [
    { key: 'general',       label: 'General',       sub: 'Profile and preferences',    icon: UserCircle2 },
    { key: 'security',      label: 'Security',      sub: 'Password and 2FA',           icon: ShieldCheck },
    { key: 'api',           label: 'API',            sub: 'API keys and configuration', icon: Code2 },
    { key: 'webhooks',      label: 'Webhooks',      sub: 'Manage webhook endpoints',   icon: Webhook },
    { key: 'notifications', label: 'Notifications', sub: 'Email and alerts',           icon: Bell },
    { key: 'danger',        label: 'Danger Zone',   sub: 'Irreversible actions',       icon: AlertTriangle, danger: true },
]
</script>

<template>
    <nav class="w-[220px] shrink-0">
        <button
            v-for="item in navItems"
            :key="item.key"
            type="button"
            class="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-colors"
            :class="[
                item.danger
                    ? (active === item.key
                        ? 'bg-red-50 dark:bg-red-500/10'
                        : 'hover:bg-red-50 dark:hover:bg-red-500/10')
                    : (active === item.key
                        ? 'bg-violet-50 dark:bg-violet-500/10'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800')
            ]"
            @click="$emit('change', item.key)"
        >
            <component
                :is="item.icon"
                class="h-5 w-5 shrink-0"
                :class="[
                    item.danger
                        ? 'text-red-500'
                        : (active === item.key
                            ? 'text-violet-600 dark:text-violet-400'
                            : 'text-slate-400')
                ]"
            />
            <div>
                <p
                    class="text-sm font-semibold leading-tight"
                    :class="[
                        item.danger
                            ? 'text-red-500'
                            : (active === item.key
                                ? 'text-violet-600 dark:text-violet-400'
                                : 'text-slate-700 dark:text-slate-300')
                    ]"
                >
                    {{ item.label }}
                </p>
                <p class="text-[11px] mt-0.5 leading-tight text-slate-400 dark:text-slate-500">
                    {{ item.sub }}
                </p>
            </div>
        </button>
    </nav>
</template>