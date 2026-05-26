<script setup>
import { ref } from 'vue'
import Sidebar from '@/Components/Dashboard/Sidebar.vue'
import Topbar from '@/Components/Dashboard/Topbar.vue'

const sidebarOpen = ref(true)

const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
}
</script>

<template>
    <div class="min-h-screen bg-[#f5f7fb] transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
        <Sidebar :open="sidebarOpen" />

        <div :class="sidebarOpen ? 'ml-[260px]' : 'ml-0'" class="transition-all duration-300">
            <Topbar @toggle-sidebar="toggleSidebar" />

            <main class="p-2">
                <slot />
            </main>
        </div>
    </div>
</template>
