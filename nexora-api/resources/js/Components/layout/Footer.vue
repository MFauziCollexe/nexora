<script setup>
defineProps({
    showYear: {
        type: Boolean,
        default: true,
    },
    text: {
        type: String,
        default: 'All rights reserved.',
    },
})
</script>

<template>
    <footer class="border-t border-sky-100 py-6 text-center text-xs text-slate-400">
        <p>
            &copy;
            <span v-if="showYear">{{ new Date().getFullYear() }}</span>
            &nbsp;{{ $page.props.appName || 'Nexora' }}. {{ text }}
            &nbsp;&middot;&nbsp;
            <span class="text-slate-400">Powered by Mukhammad Fauzi</span>
        </p>
    </footer>
</template>
