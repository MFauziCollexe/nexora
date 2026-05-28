<template>
    <transition name="loader-fade">
        <div
            v-if="loading"
            class="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-slate-950/80 backdrop-blur-md"
        >
            <!-- BACKGROUND GLOW -->
            <div class="absolute h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-3xl"></div>
            <div class="absolute h-[300px] w-[300px] rounded-full bg-indigo-500/20 blur-3xl"></div>

            <!-- CARD -->
            <div
                class="relative flex flex-col items-center rounded-[32px] border border-white/10 bg-white/5 px-10 py-10 shadow-2xl shadow-black/40 backdrop-blur-xl"
            >
                <!-- LOGO -->
                <div class="relative flex items-center justify-center">
                    <!-- OUTER RING -->
                    <div
                        class="absolute h-24 w-24 animate-spin rounded-full border-[3px] border-violet-500/20 border-t-violet-500"
                    ></div>

                    <!-- LOGO -->
                    <div
                        class="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-700 shadow-lg shadow-violet-500/30"
                    >
                        <img
                            src="/images/logo_nexora.png"
                            alt="Nexora"
                            class="h-8 w-8 object-contain"
                        />
                    </div>
                </div>

                <!-- TEXT -->
                <div class="mt-8 text-center">
                    <h2 class="text-sm font-semibold tracking-wide text-white">
                        Loading Nexora
                    </h2>

                    <p class="mt-1 text-xs text-slate-400">
                        Please wait a moment...
                    </p>
                </div>

                <!-- DOTS -->
                <div class="mt-5 flex items-center gap-1">
                    <span class="loading-dot animation-delay-0"></span>
                    <span class="loading-dot animation-delay-200"></span>
                    <span class="loading-dot animation-delay-400"></span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
defineProps({
    loading: {
        type: Boolean,
        required: true,
    },
});
</script>

<style scoped>
.loader-fade-enter-active,
.loader-fade-leave-active {
    transition: all 0.25s ease;
}

.loader-fade-enter-from,
.loader-fade-leave-to {
    opacity: 0;
    transform: scale(1.02);
}

.loading-dot {
    width: 6px;
    height: 6px;
    border-radius: 9999px;
    background: white;
    opacity: 0.3;
    animation: dotPulse 1.2s infinite ease-in-out;
}

.animation-delay-0 {
    animation-delay: 0s;
}

.animation-delay-200 {
    animation-delay: 0.2s;
}

.animation-delay-400 {
    animation-delay: 0.4s;
}

@keyframes dotPulse {
    0%, 100% {
        transform: translateY(0);
        opacity: 0.3;
    }

    50% {
        transform: translateY(-4px);
        opacity: 1;
    }
}
</style>