<script setup>
import {
    Activity,
    CheckCircle,
    AlertTriangle,
    Timer,
    Users,
} from 'lucide-vue-next'

const props = defineProps({
    title: String,
    value: String,
    change: String,
    positive: Boolean,
    icon: String,
    color: String
})

const icons = {
    activity: Activity,
    check: CheckCircle,
    alert: AlertTriangle,
    timer: Timer,
    users: Users,
}

const colors = {
    violet: {
        bg: 'bg-violet-100',
        text: 'text-violet-600',
    },

    emerald: {
        bg: 'bg-emerald-100',
        text: 'text-emerald-600',
    },

    red: {
        bg: 'bg-red-100',
        text: 'text-red-600',
    },

    blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-600',
    },

    purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-600',
    },
}


</script>

<template>
    <div
        class="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-1"
    >
        <div class="flex items-start justify-between gap-3">
            <div>
                <p class="text-xs uppercase tracking-[0.16em] text-slate-500">
                    {{ title }}
                </p>

                <h3 class="mt-1 text-2xl font-bold text-slate-900">
                    {{ value }}
                </h3>

                <p
                    class="mt-1 text-sm font-medium"
                    :class="positive ? 'text-emerald-500' : 'text-red-500'"
                >
                    {{ change }}
                </p>
            </div>

            <div
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
                :class="colors[color].bg"
            >
                <component
                    :is="icons[icon]"
                    :class="[
                        'h-6 w-6',
                        colors[color].text
                    ]"
                    stroke-width="2"
                />
            </div>
        </div>
    </div>
</template>