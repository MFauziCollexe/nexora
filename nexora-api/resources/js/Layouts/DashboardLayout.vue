<script setup>
import { ref, onMounted } from 'vue'
import { router } from '@inertiajs/vue3'

import Sidebar from '@/Components/Dashboard/Sidebar.vue'
import Topbar from '@/Components/Dashboard/Topbar.vue'
import GlobalLoading from '@/Components/GlobalLoading.vue'

const sidebarOpen = ref(true)
const loading = ref(false)

let timeout = null

const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
}

onMounted(() => {
    router.on('start', () => {
        timeout = setTimeout(() => {
            loading.value = true
        }, 120)
    })

    router.on('finish', () => {
        clearTimeout(timeout)

        setTimeout(() => {
            loading.value = false
        }, 300)
    })
})

</script>

<template>
    <div
        class="min-h-screen bg-[#f5f7fb] transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100"
    >
        <GlobalLoading :loading="loading" />

        <Sidebar :open="sidebarOpen" />

        <div
            :class="sidebarOpen ? 'ml-[260px]' : 'ml-0'"
            class="transition-all duration-300"
        >
            <Topbar @toggle-sidebar="toggleSidebar" />

            <main class="p-2">
                <slot />
            </main>
        </div>
    </div>
</template>
