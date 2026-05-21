import { ref, computed } from "vue";

/**
 * useApiStats — composable for API dashboard statistics
 *
 * Usage:
 *   const { stats, totalEndpoints, moduleCount, isLoading } = useApiStats()
 */
export function useApiStats() {
    const isLoading = ref(false);
    const data = ref({
        totalEndpoints: 227,
        moduleCount: 66,
        uptimePercent: 99.9,
    });

    async function load() {
        isLoading.value = true;
        try {
            // Data is static for now; swap in a real fetch() when backend endpoint is ready
            data.value.totalEndpoints = 120;
            data.value.moduleCount = 12;
        } finally {
            isLoading.value = false;
        }
    }

    const stats = computed(() => [
        { label: "Endpoints", value: `${data.value.totalEndpoints}+` },
        { label: "Modules", value: data.value.moduleCount },
        { label: "Uptime", value: `${data.value.uptimePercent}%` },
    ]);

    return {
        stats,
        totalEndpoints: computed(() => data.value.totalEndpoints),
        moduleCount: computed(() => data.value.moduleCount),
        uptimePercent: computed(() => data.value.uptimePercent),
        isLoading,
        load,
    };
}
