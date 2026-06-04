<script setup>
import { ref } from 'vue'
import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue'
import SettingsSidebar from '../components/SettingsSidebar.vue'
import GeneralSection from '../components/GeneralSection.vue'

const activeTab = ref('general')
</script>

<template>
    <DashboardLayout>
        <div class="p-8">
            <div class="mb-6">
                <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
                <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Manage your account, security and API preferences.
                </p>
            </div>

            <div class="flex gap-8 items-start">
                <SettingsSidebar
                    :active="activeTab"
                    @change="activeTab = $event"
                />

                <div class="flex-1 min-w-0">
                    <GeneralSection v-if="activeTab === 'general'" />

                    <div
                        v-else
                        class="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900"
                    >
                        <p class="text-slate-400 text-sm capitalize">
                            {{ activeTab }} section coming soon.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </DashboardLayout>
</template>