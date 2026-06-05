<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import { Mic, MicOff, Volume2, X, Loader2, RotateCcw } from 'lucide-vue-next'

const WAKE_WORD = 'nexora'
const STOP_WORDS = [
    'terima kasih nexora',
    'bye',
    'bye nexora',
    'goodbye',
    'good bye',
    'dadah',
    'sampai jumpa',
    'akhiri',
    'selesai',
]
const STOP_WORD_ALIASES = ['bai', 'bay']

const isOpen = ref(false)
const status = ref('standby')
const transcript = ref('')
const messages = ref([])
const errorMsg = ref('')

let isProcessing = false
let isStartingMain = false
let isMainActive = false
let isWakeActive = false
let shouldRestartWake = true
let continueTimer = null
let wakeTimer = null

const SpeechRecognition = typeof window !== 'undefined'
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null

const wakeRecognition = SpeechRecognition ? new SpeechRecognition() : null
const mainRecognition = SpeechRecognition ? new SpeechRecognition() : null

const clearTimers = () => {
    if (continueTimer) {
        clearTimeout(continueTimer)
        continueTimer = null
    }

    if (wakeTimer) {
        clearTimeout(wakeTimer)
        wakeTimer = null
    }
}

const stopWake = () => {
    shouldRestartWake = false

    try {
        wakeRecognition?.abort()
    } catch {}

    isWakeActive = false
}

const scheduleWake = (delay = 500) => {
    if (!wakeRecognition || status.value !== 'standby') return

    shouldRestartWake = true
    if (wakeTimer) clearTimeout(wakeTimer)

    wakeTimer = setTimeout(() => {
        if (!shouldRestartWake || status.value !== 'standby' || isWakeActive) return

        try {
            wakeRecognition.start()
            isWakeActive = true
        } catch (error) {
            isWakeActive = false
            scheduleWake(1000)
        }
    }, delay)
}

const stopMain = () => {
    try {
        mainRecognition?.abort()
    } catch {}

    isMainActive = false
    isStartingMain = false
}

const startMain = () => {
    if (!mainRecognition || status.value !== 'listening' || isProcessing || isStartingMain || isMainActive) {
        return
    }

    isStartingMain = true

    try {
        mainRecognition.start()
        isMainActive = true
    } catch (error) {
        isMainActive = false
        if (status.value === 'listening' && !isProcessing) {
            continueTimer = setTimeout(startMain, 700)
        }
    } finally {
        setTimeout(() => {
            isStartingMain = false
        }, 500)
    }
}

const continueListening = (delay = 700) => {
    if (!mainRecognition) return

    clearTimers()
    status.value = 'listening'
    transcript.value = ''
    isProcessing = false
    isStartingMain = false

    continueTimer = setTimeout(startMain, delay)
}

const backToStandby = () => {
    clearTimers()
    window.speechSynthesis?.cancel()
    stopMain()

    status.value = 'standby'
    transcript.value = ''
    isProcessing = false
    isOpen.value = false

    scheduleWake(500)
}

const speak = (text) => {
    if (!window.speechSynthesis || !text) {
        continueListening()
        return
    }

    window.speechSynthesis.cancel()
    status.value = 'speaking'

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'id-ID'
    utterance.rate = 1.15
    utterance.pitch = 0.85
    utterance.onend = () => continueListening()
    utterance.onerror = () => continueListening()

    window.speechSynthesis.speak(utterance)
}

const askAI = async (userText) => {
    errorMsg.value = ''
    messages.value.push({ role: 'user', content: userText })

    try {
        const { data } = await axios.post('/system/ai-chat', {
            messages: messages.value,
        })

        const reply = data.reply || 'Maaf, saya belum mendapat jawaban.'
        messages.value.push({ role: 'assistant', content: reply })
        speak(reply)
    } catch (error) {
        errorMsg.value = 'Terjadi error, coba lagi.'
        continueListening(1000)
    }
}

const normalizeSpeechText = (text) => text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const isStopCommand = (text) => {
    const normalizedText = normalizeSpeechText(text)
    const words = normalizedText.split(' ')

    return STOP_WORDS.some((word) => normalizedText.includes(word))
        || STOP_WORD_ALIASES.some((word) => words.includes(word))
}

const handleRecognizedText = async (text) => {
    const cleanText = text.trim()
    if (!cleanText || isProcessing) return

    isProcessing = true
    transcript.value = cleanText

    if (isStopCommand(cleanText)) {
        status.value = 'speaking'

        const utterance = new SpeechSynthesisUtterance('Baik, sampai jumpa lagi.')
        utterance.lang = 'id-ID'
        utterance.onend = backToStandby
        utterance.onerror = backToStandby
        window.speechSynthesis?.speak(utterance)
        return
    }

    status.value = 'thinking'
    await askAI(cleanText)
}

if (wakeRecognition) {
    wakeRecognition.lang = 'id-ID'
    wakeRecognition.continuous = true
    wakeRecognition.interimResults = true

    wakeRecognition.onstart = () => {
        isWakeActive = true
    }

    wakeRecognition.onresult = (event) => {
        let said = ''

        for (let i = event.resultIndex; i < event.results.length; i += 1) {
            said += event.results[i][0].transcript.toLowerCase()
        }

        if (!said.includes(WAKE_WORD)) return

        stopWake()
        isOpen.value = true
        status.value = 'listening'
        transcript.value = ''
        errorMsg.value = ''
        isProcessing = false

        continueListening(600)
    }

    wakeRecognition.onend = () => {
        isWakeActive = false
        if (shouldRestartWake && status.value === 'standby') {
            scheduleWake(500)
        }
    }

    wakeRecognition.onerror = (event) => {
        isWakeActive = false

        if (event.error === 'not-allowed') {
            errorMsg.value = 'Izin mikrofon ditolak.'
            shouldRestartWake = false
            return
        }

        if (shouldRestartWake && status.value === 'standby') {
            scheduleWake(event.error === 'no-speech' ? 300 : 1000)
        }
    }
}

if (mainRecognition) {
    mainRecognition.lang = 'id-ID'
    mainRecognition.continuous = false
    mainRecognition.interimResults = false

    mainRecognition.onstart = () => {
        isMainActive = true
    }

    mainRecognition.onresult = async (event) => {
        const result = event.results[event.results.length - 1]
        if (!result?.isFinal) return

        await handleRecognizedText(result[0].transcript)
    }

    mainRecognition.onend = () => {
        isMainActive = false

        if (status.value === 'listening' && !isProcessing) {
            continueListening(500)
        }
    }

    mainRecognition.onerror = (event) => {
        isMainActive = false

        if (event.error === 'not-allowed') {
            errorMsg.value = 'Izin mikrofon ditolak.'
            backToStandby()
            return
        }

        if (event.error === 'aborted') return

        if (status.value === 'listening' && !isProcessing) {
            continueListening(event.error === 'no-speech' ? 400 : 800)
        }
    }
}

const startListening = () => {
    if (!mainRecognition) {
        errorMsg.value = 'Browser tidak support. Gunakan Chrome.'
        return
    }

    clearTimers()
    stopWake()
    window.speechSynthesis?.cancel()

    isOpen.value = true
    status.value = 'listening'
    transcript.value = ''
    errorMsg.value = ''
    isProcessing = false

    continueListening(200)
}

const stopSpeaking = () => {
    window.speechSynthesis?.cancel()
    continueListening(300)
}

const closePanel = () => {
    backToStandby()
}

const reset = () => {
    messages.value = []
    transcript.value = ''
    errorMsg.value = ''
}

onMounted(() => {
    if (!SpeechRecognition) {
        errorMsg.value = 'Browser tidak support SpeechRecognition. Gunakan Chrome.'
        return
    }

    scheduleWake(1000)
})

onUnmounted(() => {
    clearTimers()
    shouldRestartWake = false
    stopWake()
    stopMain()
    window.speechSynthesis?.cancel()
})

const statusLabel = {
    standby: `Ucapkan "${WAKE_WORD}" untuk memulai`,
    listening: 'Mendengarkan...',
    thinking: 'AI sedang berpikir...',
    speaking: 'AI sedang berbicara...',
}
</script>

<template>
    <button
        v-if="!isOpen"
        class="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all hover:scale-105"
        :class="status === 'standby'
            ? 'bg-slate-700 hover:bg-slate-600'
            : 'bg-violet-600 hover:bg-violet-700'"
        :title="`Ucapkan '${WAKE_WORD}' atau klik untuk bicara`"
        @click="startListening"
    >
        <span
            v-if="status === 'standby'"
            class="absolute inset-0 animate-ping rounded-full bg-slate-500 opacity-40"
        />
        <Mic class="relative h-6 w-6 text-white" />
    </button>

    <div
        v-else
        class="fixed bottom-6 right-6 z-50 w-80 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
    >
        <div class="flex items-center justify-between bg-violet-600 px-5 py-4">
            <div class="flex items-center gap-2">
                <Volume2 class="h-5 w-5 text-white" />
                <span class="text-sm font-bold text-white">Nexora AI</span>
                <span class="flex items-center gap-1 rounded-full bg-violet-500 px-2 py-0.5 text-[10px] text-violet-100">
                    <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                    {{ status === 'standby' ? 'Standby' : 'Active' }}
                </span>
            </div>
            <div class="flex items-center gap-2">
                <button
                    class="rounded-lg p-1 text-violet-200 transition hover:bg-violet-500 hover:text-white"
                    title="Reset percakapan"
                    @click="reset"
                >
                    <RotateCcw class="h-4 w-4" />
                </button>
                <button
                    class="rounded-lg p-1 text-violet-200 transition hover:bg-violet-500 hover:text-white"
                    title="Tutup"
                    @click="closePanel"
                >
                    <X class="h-4 w-4" />
                </button>
            </div>
        </div>

        <div class="flex flex-col items-center gap-6 px-6 py-8">
            <div
                class="relative flex h-28 w-28 items-center justify-center rounded-full transition-all duration-300"
                :class="{
                    'bg-slate-100 dark:bg-slate-800': status === 'standby',
                    'bg-red-100 ring-4 ring-red-300 dark:bg-red-500/20': status === 'listening',
                    'bg-violet-100 dark:bg-violet-500/20': status === 'thinking',
                    'bg-emerald-100 ring-4 ring-emerald-300 dark:bg-emerald-500/20': status === 'speaking',
                }"
            >
                <span v-if="status === 'listening'" class="absolute inset-0 animate-ping rounded-full bg-red-300 opacity-40" />
                <span v-if="status === 'speaking'" class="absolute inset-0 animate-ping rounded-full bg-emerald-300 opacity-30" />

                <Loader2 v-if="status === 'thinking'" class="h-12 w-12 animate-spin text-violet-500" />
                <Mic v-else-if="status === 'listening'" class="h-12 w-12 text-red-500" />
                <Volume2 v-else-if="status === 'speaking'" class="h-12 w-12 text-emerald-500" />
                <Mic v-else class="h-12 w-12 text-slate-300" />
            </div>

            <p class="text-center text-sm text-slate-500 dark:text-slate-400">
                {{ statusLabel[status] }}
            </p>

            <div
                v-if="transcript"
                class="w-full rounded-2xl bg-slate-50 px-4 py-3 text-center text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
                <span class="mb-1 block text-xs font-semibold text-slate-400">Kamu bilang:</span>
                "{{ transcript }}"
            </div>

            <p v-if="errorMsg" class="text-center text-xs text-red-500">
                {{ errorMsg }}
            </p>

            <div class="flex gap-3">
                <button
                    v-if="status === 'standby'"
                    class="flex items-center gap-2 rounded-2xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                    @click="startListening"
                >
                    <Mic class="h-4 w-4" />
                    Bicara Sekarang
                </button>

                <button
                    v-if="status === 'speaking'"
                    class="flex items-center gap-2 rounded-2xl bg-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200"
                    @click="stopSpeaking"
                >
                    <MicOff class="h-4 w-4" />
                    Stop
                </button>

                <button
                    v-if="status === 'listening' || status === 'thinking'"
                    class="flex items-center gap-2 rounded-2xl bg-red-100 px-6 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-200 dark:bg-red-500/20 dark:text-red-400"
                    @click="backToStandby"
                >
                    <X class="h-4 w-4" />
                    Akhiri
                </button>
            </div>
        </div>
    </div>
</template>
