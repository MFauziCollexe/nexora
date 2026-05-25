<script setup>
import Sidebar from '@/Components/Dashboard/Sidebar.vue'
import Topbar from '@/Components/Dashboard/Topbar.vue'
</script>

<template>
    <div class="min-h-screen bg-[#f5f7fb]">
        <Sidebar />

        <div class="ml-[260px]">
            <Topbar />

            <main class="p-2">
                <slot />
            </main>
        </div>
    </div>
</template>