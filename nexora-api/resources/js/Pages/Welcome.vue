<script setup>
import { Head, Link } from '@inertiajs/vue3'
import Navbar from '@/Components/layout/Navbar.vue'
import Footer from '@/Components/layout/Footer.vue'
import HeroSection from '@/Components/api/HeroSection.vue'
import StatsSection from '@/Components/api/StatsSection.vue'
import EndpointCard from '@/Components/api/EndpointCard.vue'
import FeaturesSection from '@/Components/api/FeaturesSection.vue'
import Button from '@/Components/ui/Button.vue'
import { endpoints } from '@/data/endpoints'

defineProps({
    appName: { type: String, default: 'Nexora-API' },
    baseUrl: { type: String, default: 'http://localhost:8000' },
})
</script>

<template>
    <Head :title="appName + ' — API Documentation'" />

    <main class="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-100 text-slate-800 overflow-hidden">
        <!-- Background blobs -->
        <div class="absolute top-0 left-0 w-[35rem] h-[35rem] bg-sky-100 blur-3xl rounded-full" />
        <div class="absolute bottom-0 right-0 w-[35rem] h-[35rem] bg-blue-500/20 blur-3xl rounded-full" />

        <!-- Navbar -->
        <Navbar :ctaHref="route('login')" />

        <!-- Hero + Terminal -->
        <section class="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 grid lg:grid-cols-2 gap-16 items-center px-[50px]">
            <!-- Left -->
            <div>
                <HeroSection :api-name="appName" />

                <h2 class="text-6xl lg:text-7xl font-black leading-tight mb-8">
                    Powerful API
                    <span class="block text-sky-500">For Enterprise Operations</span>
                </h2>

                <p class="text-slate-600 text-xl leading-relaxed mb-10 max-w-2xl">
                    Nexora API powers inventory, finance, procurement, HR, and
                    operational systems through secure, scalable, and realtime
                    backend services.
                </p>

                <div class="flex flex-wrap gap-5">
                    <Link :href="route('login')">
                        <Button size="lg">Open Documentation</Button>
                    </Link>
                    <Button variant="secondary" size="lg">API Reference</Button>
                </div>

                <!-- Stats (shared composable) -->
                <StatsSection />
            </div>

            <!-- Right – Endpoint terminal -->
            <div class="relative">
                <div class="absolute inset-0 bg-sky-100 blur-3xl rounded-full" />

                <div class="relative rounded-[2rem] border border-sky-100 bg-white backdrop-blur-2xl overflow-hidden shadow-2xl">
                    <!-- Terminal header -->
                    <div class="px-6 py-4 border-b border-sky-100 flex items-center justify-between bg-sky-50">
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 rounded-full bg-red-400" />
                            <div class="w-3 h-3 rounded-full bg-yellow-400" />
                            <div class="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                        <div class="text-sm text-slate-500">api.nexora.local</div>
                    </div>

                    <!-- Endpoint list -->
                    <div class="p-6 space-y-5">
                        <EndpointCard
                            v-for="ep in endpoints"
                            :key="ep.path"
                            :method="ep.method"
                            :endpoint="ep.path"
                            :description="ep.description"
                        />
                    </div>
                </div>
            </div>
        </section>

        <!-- Features -->
        <section class="relative z-10 max-w-7xl mx-auto px-6 pb-28">
            <FeaturesSection>
                <template #header>
                    <div class="text-center mb-16">
                        <p class="text-sky-500 uppercase tracking-[0.3em] text-sm mb-4">
                            Backend Services
                        </p>
                        <h2 class="text-5xl font-black mb-6">
                            Enterprise Grade Infrastructure
                        </h2>
                        <p class="text-slate-500 text-lg max-w-3xl mx-auto">
                            Secure, scalable, and optimized backend architecture
                            built for modern enterprise operations.
                        </p>
                    </div>
                </template>
            </FeaturesSection>
        </section>

        <!-- Footer -->
        <Footer />
    </main>
</template>
