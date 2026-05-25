<script setup>
import { ref } from 'vue'
import { Menu } from 'lucide-vue-next'

import Sidebar from '@/Components/Dashboard/Sidebar.vue'

const sidebarOpen = ref(true)

const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
}
</script>

<template>
    <div class="min-h-screen bg-slate-100">

        <!-- SIDEBAR -->
        <Sidebar :open="sidebarOpen" />

        <!-- MAIN -->
        <main
            class="min-h-screen transition-all duration-300"
            :class="sidebarOpen ? 'ml-[260px]' : 'ml-0'"
        >

            <!-- TOPBAR -->
            <header
                class="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8"
            >
                <!-- LEFT -->
                <div class="flex items-center gap-4">

                    <!-- HAMBURGER -->
                    <button
                        @click="toggleSidebar"
                        class="flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100"
                    >
                        <Menu class="h-5 w-5" />
                    </button>

                    <div>
                        <h1 class="text-xl font-bold text-slate-900">
                            Dashboard
                        </h1>

                        <p class="text-sm text-slate-500">
                            Welcome back 👋
                        </p>
                    </div>
                </div>

                <!-- RIGHT -->
                <div class="flex items-center gap-4">
                    <div
                        class="flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white"
                    >
                        A
                    </div>
                </div>
            </header>

            <!-- PAGE CONTENT -->
            <div class="p-8">
                <slot />
            </div>
        </main>
    </div>
</template>