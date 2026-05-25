<script setup>
import LoginInput from '@/Components/Auth/LoginInput.vue';
import SocialLogin from '@/Components/Auth/SocialLogin.vue';
import Checkbox from '@/Components/Checkbox.vue';
import AuthLayout from '@/Layouts/AuthLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import {
    ArrowRight,
    Eye,
    EyeOff,
    Lock,
    Mail,
    Moon,
    Shield,
    Sun,
} from 'lucide-vue-next';
import { onMounted, ref } from 'vue';

defineProps({
    canResetPassword: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const showPassword = ref(false);
const isDarkMode = ref(false);

const applyTheme = (enabled) => {
    document.documentElement.classList.toggle('dark', enabled);
};

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    applyTheme(isDarkMode.value);
    localStorage.setItem('nexora-theme', isDarkMode.value ? 'dark' : 'light');
};

onMounted(() => {
    const savedTheme = localStorage.getItem('nexora-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    isDarkMode.value = savedTheme ? savedTheme === 'dark' : prefersDark;
    applyTheme(isDarkMode.value);
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <AuthLayout>
        <Head title="Login" />

        <section class="grid w-full flex-1 overflow-hidden rounded-[18px] bg-white shadow-2xl shadow-violet-950/10 transition-colors duration-200 dark:bg-slate-900 dark:shadow-black/30 lg:max-h-[470px] lg:grid-cols-[0.86fr_1.14fr]">
            <aside class="relative hidden overflow-hidden bg-gradient-to-br from-violet-700 via-indigo-800 to-indigo-950 p-5 text-white lg:flex lg:flex-col">
                <div class="absolute -right-20 top-12 h-72 w-72 rounded-full border border-violet-300/15"></div>
                <div class="absolute right-4 top-24 h-48 w-48 rounded-full bg-violet-400/10 blur-2xl"></div>
                <div class="absolute -bottom-28 left-14 h-80 w-80 rounded-full border border-indigo-200/15"></div>

                <div class="relative z-10 flex items-center gap-3">
                    <img
                        src="/images/logo_nexora.png"
                        alt="Nexora Logo"
                        class="h-8 w-8 object-contain"
                    />

                    <div class="flex flex-col leading-tight">
                        <span class="text-sm font-bold text-white">
                            NEXORA
                        </span>
                    </div>
                </div>

                <div class="relative z-10 mt-6 max-w-[250px]">
                    <h1 class="text-xl font-bold leading-tight tracking-normal">Welcome Back 👋</h1>
                    <p class="mt-2 text-xs leading-5 text-indigo-50">
                        Login to your Nexora account and continue managing your business.
                    </p>
                </div>

                <div class="relative z-10 my-auto flex min-h-[185px] items-center justify-center py-2.5">
                    <img
                        src="/images/bg_img_login.png"
                        alt="Nexora Logo"
                        class="h-64 w-64 object-contain"
                    />
                </div>

                <div class="relative z-10 flex max-w-[250px] items-start gap-2">
                    <Shield class="mt-0.5 h-5 w-5 flex-none text-white" aria-hidden="true" />
                    <div>
                        <p class="text-xs font-bold">Secure &amp; Trusted</p>
                        <p class="mt-0.5 text-[10px] leading-4 text-indigo-100">
                            Your data is protected with enterprise grade security.
                        </p>
                    </div>
                </div>
            </aside>

            <div class="flex min-h-0 flex-col px-4 py-3 sm:px-6 lg:px-9 lg:py-5">
                <div class="flex justify-end">
                    <button
                        type="button"
                        class="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[11px] font-medium text-slate-600 transition duration-200 hover:bg-slate-100 hover:text-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-100 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-violet-300 dark:focus:ring-violet-500/20"
                        :aria-pressed="isDarkMode"
                        :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
                        @click="toggleDarkMode"
                    >
                        <Sun v-if="isDarkMode" class="h-3.5 w-3.5" aria-hidden="true" />
                        <Moon v-else class="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{{ isDarkMode ? 'Light mode' : 'Dark mode' }}</span>
                    </button>
                </div>

                <div class="mx-auto flex w-full max-w-[330px] flex-1 flex-col justify-center py-1.5">
                    <div>
                        <h2 class="text-xl font-bold tracking-normal text-slate-950 dark:text-white">Login to Nexora</h2>
                        <p class="mt-1.5 text-xs text-slate-600 dark:text-slate-400">Enter your credentials to access your account</p>
                    </div>

                    <div v-if="status" class="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] font-medium text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
                        {{ status }}
                    </div>

                    <form class="mt-5 space-y-3" @submit.prevent="submit">
                        <LoginInput
                            id="email"
                            v-model="form.email"
                            label="Email Address"
                            type="email"
                            placeholder="Enter your email address"
                            autocomplete="username"
                            :error="form.errors.email"
                            autofocus
                        >
                            <template #icon>
                                <Mail class="h-4 w-4" aria-hidden="true" />
                            </template>
                        </LoginInput>

                        <LoginInput
                            id="password"
                            v-model="form.password"
                            label="Password"
                            :type="showPassword ? 'text' : 'password'"
                            placeholder="Enter your password"
                            autocomplete="current-password"
                            :error="form.errors.password"
                        >
                            <template #icon>
                                <Lock class="h-4 w-4" aria-hidden="true" />
                            </template>
                            <template #action>
                                <button
                                    type="button"
                                    class="rounded-md p-0.5 transition duration-200 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-400 dark:hover:bg-slate-800"
                                    :aria-label="showPassword ? 'Hide password' : 'Show password'"
                                    @click="showPassword = !showPassword"
                                >
                                    <EyeOff v-if="showPassword" class="h-4 w-4" aria-hidden="true" />
                                    <Eye v-else class="h-4 w-4" aria-hidden="true" />
                                </button>
                            </template>
                        </LoginInput>

                        <div class="flex items-center justify-between gap-2">
                            <label class="flex items-center gap-2 text-[11px] font-medium text-slate-600 dark:text-slate-400">
                                <Checkbox v-model:checked="form.remember" name="remember" />
                                <span>Remember me</span>
                            </label>

                            <Link
                                v-if="canResetPassword"
                                :href="route('password.request')"
                                class="text-[11px] font-bold text-violet-600 transition duration-200 hover:text-violet-800 hover:underline focus:outline-none focus:ring-2 focus:ring-violet-100 dark:text-violet-400 dark:hover:text-violet-300 dark:focus:ring-violet-500/20"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            class="flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-700 px-4 text-xs font-bold text-white shadow-lg shadow-violet-500/25 transition duration-200 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-violet-200 disabled:cursor-not-allowed disabled:opacity-60"
                            :disabled="form.processing"
                        >
                            <span>{{ form.processing ? 'Logging in...' : 'Login' }}</span>
                            <ArrowRight class="h-4 w-4" aria-hidden="true" />
                        </button>
                    </form>

                    <p class="mt-3.5 text-center text-xs font-medium text-slate-600 dark:text-slate-400">
                        Don&apos;t have an account?
                        <Link :href="route('register')" class="font-bold text-violet-600 transition duration-200 hover:text-violet-800 hover:underline dark:text-violet-400 dark:hover:text-violet-300">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </section>

        <p class="mt-10 shrink-0 text-center text-[10px] text-slate-500 dark:text-slate-600">
            © 2024 Nexora. All rights reserved.
        </p>
    </AuthLayout>
</template>
