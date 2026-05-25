<script setup>
import {
    Menu,
    Moon,
    Bell,
    ChevronDown,
    Calendar,
} from 'lucide-vue-next'
</script>

<template>
    <header
        class="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8"
    >
        <!-- LEFT -->
        <div class="flex items-center gap-5">
            <!-- MENU BUTTON -->
            <button
                class="flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100"
            >
                <Menu class="h-5 w-5" />
            </button>
        </div>

        <!-- RIGHT -->
        <div class="flex items-center gap-5">
            <!-- DARK MODE -->
            <button
                class="flex h-11 w-11 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100"
            >
                <Moon class="h-5 w-5" />
            </button>

            <!-- NOTIFICATION -->
            <button
                class="relative flex h-11 w-11 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100"
            >
                <Bell class="h-5 w-5" />

                <!-- BADGE -->
                <span
                    class="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500"
                ></span>
            </button>

            <!-- USER -->
            <div
                class="flex cursor-pointer items-center gap-3 rounded-2xl px-2 py-1 transition hover:bg-slate-100"
            >
                <!-- AVATAR -->
                <div
                    class="flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white"
                >
                    A
                </div>

                <!-- INFO -->
                <div class="hidden text-right md:block">
                    <p class="text-sm font-semibold text-slate-900">
                        Administrator
                    </p>

                    <p class="text-xs text-slate-500">
                        admin@nexora.com
                    </p>
                </div>

                <ChevronDown class="h-4 w-4 text-slate-400" />
            </div>

            <!-- DATE -->
            <button
                class="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 shadow-sm xl:flex"
            >
                <span>12 May 2024 - 19 May 2024</span>

                <Calendar class="h-4 w-4" />
            </button>
        </div>
    </header>
</template>