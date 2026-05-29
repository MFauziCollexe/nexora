<script setup>
import {
    Menu,
    Moon,
    Sun,
    ChevronDown,
    Calendar,
    Settings,
    BellRing,
    LogOut,
} from 'lucide-vue-next'
import { router, usePage } from '@inertiajs/vue3'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const emit = defineEmits(['toggleSidebar', 'logoutStart'])
const page = usePage()

const isDarkMode = ref(false)
const profileOpen = ref(false)
const profileMenu = ref(null)

const applyTheme = (enabled) => {
    document.documentElement.classList.toggle('dark', enabled)
    document.body.classList.toggle('dark', enabled)
}

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    applyTheme(isDarkMode.value)
    localStorage.setItem('nexora-theme', isDarkMode.value ? 'dark' : 'light')
}

const handleClickOutside = (event) => {
    if (profileMenu.value && !profileMenu.value.contains(event.target)) {
        profileOpen.value = false
    }
}

onMounted(() => {
    const savedTheme = localStorage.getItem('nexora-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    isDarkMode.value = savedTheme ? savedTheme === 'dark' : prefersDark
    applyTheme(isDarkMode.value)
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})

const user = page.props.auth?.user || {}
const userInitial = user.name ? user.name.charAt(0).toUpperCase() : 'A'

const logout = () => {
    profileOpen.value = false
    emit('logoutStart')
    router.post('/logout')
}
</script>

<template>
    <header
        class="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-950"
    >
        <!-- LEFT -->
        <div class="flex items-center gap-5">
            <!-- MENU BUTTON -->
            <button
                @click="emit('toggleSidebar')"
                class="flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100"
            >
                <Menu class="h-5 w-5" />
            </button>
        </div>

        <!-- RIGHT -->
        <div class="flex items-center gap-5">
            <!-- DARK MODE -->
            <button
                @click="toggleDarkMode"
                type="button"
                class="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[11px] font-medium text-slate-600 transition duration-200 hover:bg-slate-100 hover:text-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-100 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-violet-300 dark:focus:ring-violet-500/20"
                :aria-pressed="isDarkMode"
                :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
            >
                <Sun v-if="isDarkMode" class="h-3.5 w-3.5" aria-hidden="true" />
                <Moon v-else class="h-3.5 w-3.5" aria-hidden="true" />
                <span>{{ isDarkMode ? 'Light' : 'Dark' }}</span>
            </button>

            <!-- USER -->
            <div
                ref="profileMenu"
                class="relative"
            >
                <button
                    @click.stop="profileOpen = !profileOpen"
                    class="flex h-11 w-full items-center gap-3 rounded-2xl px-2 py-1 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                    type="button"
                >
                    <div
                        class="flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white"
                    >
                        {{ userInitial }}
                    </div>

                    <div class="hidden text-right md:block">
                        <p class="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {{ user.name || 'User' }}
                        </p>

                        <p class="text-xs text-slate-500 dark:text-slate-400">
                            {{ user.email || 'user@nexora.com' }}
                        </p>
                    </div>

                    <ChevronDown class="h-4 w-4 text-slate-400" />
                </button>

                <transition
                    enter-active-class="transition duration-200 ease-out"
                    enter-from-class="opacity-0 scale-95"
                    enter-to-class="opacity-100 scale-100"
                    leave-active-class="transition duration-150 ease-in"
                    leave-from-class="opacity-100 scale-100"
                    leave-to-class="opacity-0 scale-95"
                >
                    <!-- DROPDOWN -->
                    <div
                        v-show="profileOpen"
                        class="absolute right-0 top-12 z-50 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-950"
                    >
                        <!-- HEADER -->
                        <div class="border-b border-slate-200 px-3 py-2 dark:border-slate-800">
                            <h3 class="truncate text-xs font-semibold text-slate-900 dark:text-white">
                                {{ user.name || 'Demo Admin' }}
                            </h3>

                            <p class="truncate text-[11px] text-slate-500 dark:text-slate-400">
                                {{ user.email || 'demo@example.com' }}
                            </p>
                        </div>

                        <!-- MENU -->
                        <div class="py-1">

                            <button
                                class="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                            >
                                <Settings class="h-3.5 w-3.5" />
                                <span>Settings</span>
                            </button>

                            <button
                                class="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                            >
                                <BellRing class="h-3.5 w-3.5" />
                                <span>Notifications</span>
                            </button>

                        </div>

                        <!-- FOOTER -->
                        <div class="border-t border-slate-200 py-1 dark:border-slate-800">

                            <form @submit.prevent="logout">
                                <button
                                    type="submit"
                                    class="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-red-500 transition hover:bg-red-50 dark:hover:bg-red-500/10"
                                >
                                    <LogOut class="h-3.5 w-3.5" />

                                    <span>Logout</span>
                                </button>
                            </form>

                        </div>
                    </div>
                </transition>
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
