<script setup>
import DashboardLayout from '@/Layouts/DashboardLayout.vue'
import StatsCard from '@/Components/Dashboard/StatsCard.vue'

import {
    stats,
    topEndpoints,
    recentRequests,
} from '@/data/dashboard'
</script>

<template>
    <DashboardLayout>
        <div class="p-8 transition-colors duration-200 dark:text-slate-100">
            <div class="mb-8 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                <div>
                    <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100">Dashboard</h1>
                    <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">Welcome back! Here's what's happening with your API.</p>
                </div>
            </div>

            <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5">
                <StatsCard
                    v-for="item in stats"
                    :key="item.title"
                    :title="item.title"
                    :value="item.value"
                    :change="item.change"
                    :positive="item.positive"
                    :icon="item.icon"
                    :color="item.color"
                />
            </div>

            <div class="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
                <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2 dark:border-slate-800 dark:bg-slate-900">
                    <div class="flex items-center justify-between gap-4">
                        <div>
                            <h2 class="text-xl font-bold text-slate-900">Requests Overview</h2>
                            <p class="mt-1 text-sm text-slate-500">A quick view of traffic trends and error distribution.</p>
                        </div>
                        <button class="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700">
                            Last 7 Days
                        </button>
                    </div>
                    <div class="mt-6 h-[360px] rounded-[32px] bg-slate-100 p-6 dark:bg-slate-800">
                        <div class="flex h-full items-center justify-center text-slate-400 dark:text-slate-300">
                            <span class="text-lg font-medium">Chart placeholder</span>
                        </div>
                    </div>
                </div>

                <div class="space-y-6">
                    <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div class="flex items-center justify-between">
                            <div>
                                <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">Top Endpoints</h2>
                                <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Most requested API routes this week.</p>
                            </div>
                            <button class="text-sm font-semibold text-violet-600">View All</button>
                        </div>
                        <div class="mt-6 space-y-5">
                            <div v-for="item in topEndpoints" :key="item.endpoint">
                                <div class="flex items-center justify-between">
                                    <p class="font-medium text-slate-700 dark:text-slate-100">{{ item.endpoint }}</p>
                                    <p class="text-sm text-slate-500 dark:text-slate-400">{{ item.requests }}</p>
                                </div>
                                <div class="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                                    <div :class="['h-full rounded-full', item.percentageClass]" :style="{ width: item.percentage }"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <div class="flex items-center justify-between">
                            <div>
                                <h2 class="text-xl font-bold text-slate-900 dark:text-slate-100">Response Status Distribution</h2>
                                <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">Success, client, and server response share.</p>
                            </div>
                            <span class="rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-100">88.0%</span>
                        </div>
                        <div class="mt-6 flex flex-col gap-6">
                            <div class="flex h-44 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
                                Donut chart placeholder
                            </div>
                            <div class="space-y-3 text-sm text-slate-600">
                                <div class="flex items-center justify-between">
                                    <span>2xx Success</span>
                                    <span>88.0% (21,240)</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span>4xx Client Error</span>
                                    <span>9.3% (2,240)</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <span>5xx Server Error</span>
                                    <span>2.7% (677)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 class="text-xl font-bold text-slate-900">Recent Requests</h2>
                        <p class="mt-1 text-sm text-slate-500">Latest API calls across the system.</p>
                    </div>
                    <button class="rounded-2xl border border-violet-600 bg-violet-600 px-4 py-2 text-sm font-semibold text-white">
                        View All
                    </button>
                </div>
                <div class="mt-6 overflow-x-auto">
                    <table class="min-w-full text-sm">
                        <thead>
                            <tr class="border-b border-slate-200 text-left text-slate-500">
                                <th class="px-4 py-3">Method</th>
                                <th class="px-4 py-3">Endpoint</th>
                                <th class="px-4 py-3">Status</th>
                                <th class="px-4 py-3">Response Time</th>
                                <th class="px-4 py-3">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in recentRequests" :key="item.endpoint + item.time" class="border-b border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900">
                                <td class="px-4 py-4">
                                    <span :class="['inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold', item.methodClass]">
                                        {{ item.method }}
                                    </span>
                                </td>
                                <td class="px-4 py-4 font-medium text-slate-700 dark:text-slate-100">{{ item.endpoint }}</td>
                                <td class="px-4 py-4 text-slate-600 dark:text-slate-400">{{ item.status }}</td>
                                <td class="px-4 py-4 text-slate-600 dark:text-slate-400">{{ item.response }}</td>
                                <td class="px-4 py-4 text-slate-600 dark:text-slate-400">{{ item.time }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </DashboardLayout>
</template>
