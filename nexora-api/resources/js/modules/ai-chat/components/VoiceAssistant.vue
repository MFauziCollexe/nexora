<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import { MicOff, X, RotateCcw } from 'lucide-vue-next'

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
    <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <div
            v-if="isOpen || transcript || errorMsg"
            class="max-w-64 rounded-2xl border border-slate-200 bg-white/95 px-3 py-2 text-right shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-900/95"
        >
            <p class="text-xs font-bold text-slate-700 dark:text-slate-200">
                {{ statusLabel[status] }}
            </p>
            <p v-if="transcript" class="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                "{{ transcript }}"
            </p>
            <p v-if="errorMsg" class="mt-1 text-xs text-red-500">
                {{ errorMsg }}
            </p>
        </div>

        <div v-if="isOpen" class="flex items-center gap-1.5">
            <button
                class="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-600 shadow-md ring-1 ring-slate-200 transition hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700"
                title="Reset percakapan"
                @click="reset"
            >
                <RotateCcw class="h-4 w-4" />
            </button>
            <button
                v-if="status === 'speaking'"
                class="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-600 shadow-md ring-1 ring-slate-200 transition hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-200 dark:ring-slate-700"
                title="Stop berbicara"
                @click="stopSpeaking"
            >
                <MicOff class="h-4 w-4" />
            </button>
            <button
                class="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition hover:bg-red-600"
                title="Akhiri percakapan"
                @click="backToStandby"
            >
                <X class="h-4 w-4" />
            </button>
        </div>

        <button
            class="transition-all hover:scale-105 active:scale-95"
            style="width: 72px; height: 72px; background: none; border: none; cursor: pointer;"
            :title="`Ucapkan '${WAKE_WORD}' atau klik untuk bicara`"
            @click="status === 'standby' ? startListening() : null"
        >
            <svg :data-status="status" width="72" height="72" viewBox="0 0 160 180" style="overflow: visible;">
                <g class="r-float">
                    <line x1="80" y1="10" x2="80" y2="28" stroke="#534AB7" stroke-width="2.5" stroke-linecap="round"/>
                    <circle cx="80" cy="7" r="4" fill="#7F77DD" class="r-ant"/>
                    <rect x="32" y="28" width="96" height="72" rx="16" fill="#3C3489"/>
                    <rect x="40" y="34" width="80" height="20" rx="8" fill="#534AB7" opacity="0.5"/>
                    <rect class="r-ear-l" x="20" y="46" width="14" height="22" rx="5" fill="#534AB7" opacity="0.5"/>
                    <rect class="r-ear-r" x="126" y="46" width="14" height="22" rx="5" fill="#534AB7" opacity="0.5"/>
                    <rect x="44" y="46" width="28" height="22" rx="8" fill="#26215C"/>
                    <rect x="88" y="46" width="28" height="22" rx="8" fill="#26215C"/>
                    <g class="r-blink">
                        <ellipse cx="58" cy="57" rx="9" ry="9" class="r-eye-fill"/>
                        <ellipse cx="58" cy="57" rx="5" ry="5" fill="#EEEDFE"/>
                        <circle cx="61" cy="54" r="2" fill="#fff"/>
                    </g>
                    <g class="r-blink-r">
                        <ellipse cx="102" cy="57" rx="9" ry="9" class="r-eye-fill"/>
                        <ellipse cx="102" cy="57" rx="5" ry="5" fill="#EEEDFE"/>
                        <circle cx="105" cy="54" r="2" fill="#fff"/>
                    </g>
                    <rect x="52" y="80" width="56" height="12" rx="6" fill="#26215C"/>
                    <g class="r-m-idle">
                        <path d="M 60 86 Q 80 94 100 86" stroke="#7F77DD" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                    </g>
                    <g class="r-m-listen">
                        <ellipse cx="80" cy="86" rx="8" ry="5" fill="#534AB7"/>
                    </g>
                    <g class="r-m-think">
                        <circle class="r-td1" cx="68" cy="86" r="3" fill="#7F77DD"/>
                        <circle class="r-td2" cx="80" cy="86" r="3" fill="#7F77DD"/>
                        <circle class="r-td3" cx="92" cy="86" r="3" fill="#7F77DD"/>
                    </g>
                    <g class="r-m-speak">
                        <rect class="r-b1" x="62" y="82" width="5" height="8" rx="2" fill="#7F77DD"/>
                        <rect class="r-b2" x="69" y="82" width="5" height="8" rx="2" fill="#AFA9EC"/>
                        <rect class="r-b3" x="76" y="82" width="5" height="8" rx="2" fill="#EEEDFE"/>
                        <rect class="r-b4" x="83" y="82" width="5" height="8" rx="2" fill="#AFA9EC"/>
                        <rect class="r-b5" x="90" y="82" width="5" height="8" rx="2" fill="#7F77DD"/>
                    </g>
                    <rect x="68" y="100" width="24" height="10" rx="4" fill="#3C3489"/>
                    <rect x="28" y="110" width="104" height="62" rx="14" fill="#3C3489"/>
                    <rect x="42" y="122" width="76" height="38" rx="8" fill="#26215C"/>
                    <circle cx="58" cy="134" r="5" fill="#534AB7" opacity="0.8"/>
                    <circle cx="80" cy="134" r="5" fill="#7F77DD" opacity="0.8" class="r-ant"/>
                    <circle cx="102" cy="134" r="5" fill="#534AB7" opacity="0.8"/>
                    <rect x="52" y="148" width="56" height="5" rx="2.5" fill="#534AB7" opacity="0.5"/>
                    <rect x="38" y="168" width="30" height="10" rx="5" fill="#3C3489"/>
                    <rect x="92" y="168" width="30" height="10" rx="5" fill="#3C3489"/>
                </g>
            </svg>
        </button>
    </div>
</template>

<style scoped>
/* ── Robot animations ── */
.r-float { animation: r-float 3s ease-in-out infinite; transform-origin: 80px 90px; }
@keyframes r-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }

.r-blink   { animation: r-blink 4s ease-in-out infinite; transform-origin: 58px 57px; }
.r-blink-r { animation: r-blink 4s ease-in-out infinite 0.3s; transform-origin: 102px 57px; }
@keyframes r-blink { 0%,90%,100%{transform:scaleY(1)} 95%{transform:scaleY(0.1)} }

.r-ant { animation: r-ant 1.5s ease-in-out infinite; }
@keyframes r-ant { 0%,100%{opacity:1} 50%{opacity:0.3} }

@keyframes r-ear { 0%,100%{opacity:0.3} 50%{opacity:1} }
[data-status="listening"] .r-ear-l { animation: r-ear 0.8s ease-in-out infinite; }
[data-status="listening"] .r-ear-r { animation: r-ear 0.8s ease-in-out infinite 0.4s; }

.r-m-idle   { display: block; }
.r-m-listen { display: none; }
.r-m-think  { display: none; }
.r-m-speak  { display: none; }
[data-status="listening"] .r-m-idle   { display: none; }
[data-status="listening"] .r-m-listen { display: block; }
[data-status="thinking"]  .r-m-idle   { display: none; }
[data-status="thinking"]  .r-m-think  { display: block; }
[data-status="speaking"]  .r-m-idle   { display: none; }
[data-status="speaking"]  .r-m-speak  { display: block; }

.r-td1, .r-td2, .r-td3 { opacity: 0.2; }
[data-status="thinking"] .r-td1 { animation: r-dot 1s ease-in-out infinite; }
[data-status="thinking"] .r-td2 { animation: r-dot 1s ease-in-out infinite 0.33s; }
[data-status="thinking"] .r-td3 { animation: r-dot 1s ease-in-out infinite 0.66s; }
@keyframes r-dot { 0%,100%{opacity:0.2} 50%{opacity:1} }

.r-b1,.r-b2,.r-b3,.r-b4,.r-b5 { transform-origin: center bottom; }
[data-status="speaking"] .r-b1 { animation: rb1 0.4s ease-in-out infinite; }
[data-status="speaking"] .r-b2 { animation: rb2 0.4s ease-in-out infinite 0.08s; }
[data-status="speaking"] .r-b3 { animation: rb3 0.4s ease-in-out infinite 0.16s; }
[data-status="speaking"] .r-b4 { animation: rb4 0.4s ease-in-out infinite 0.24s; }
[data-status="speaking"] .r-b5 { animation: rb5 0.4s ease-in-out infinite 0.32s; }
@keyframes rb1 { 0%,100%{transform:scaleY(0.3)} 50%{transform:scaleY(1)}   }
@keyframes rb2 { 0%,100%{transform:scaleY(0.6)} 50%{transform:scaleY(0.2)} }
@keyframes rb3 { 0%,100%{transform:scaleY(1)}   50%{transform:scaleY(0.4)} }
@keyframes rb4 { 0%,100%{transform:scaleY(0.4)} 50%{transform:scaleY(0.9)} }
@keyframes rb5 { 0%,100%{transform:scaleY(0.7)} 50%{transform:scaleY(0.3)} }

[data-status="standby"]   .r-eye-fill { fill: #7F77DD; }
[data-status="listening"] .r-eye-fill { fill: #ef4444; }
[data-status="thinking"]  .r-eye-fill { fill: #818cf8; }
[data-status="speaking"]  .r-eye-fill { fill: #4ade80; }
</style>
