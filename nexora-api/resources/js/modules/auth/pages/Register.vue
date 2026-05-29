<script setup>
import LoginInput from '../components/LoginInput.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import { Head, Link, useForm } from '@inertiajs/vue3';
import {
    ArrowRight,
    Eye,
    EyeOff,
    Lock,
    Mail,
    Moon,
    Phone,
    Shield,
    Sun,
    User,
} from 'lucide-vue-next';
import { onMounted, ref } from 'vue';

const showPassword = ref(false);
const showConfirmPassword = ref(false);
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
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
    terms: false,
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <AuthLayout>
        <Head title="Register" />

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
                    <span class="text-sm font-bold tracking-normal text-white">NEXORA</span>
                </div>

                <div class="relative z-10 mt-6 max-w-[250px]">
                    <h1 class="text-xl font-bold leading-tight tracking-normal">Create Your Account</h1>
                    <p class="mt-2 text-xs leading-5 text-indigo-50">
                        Join Nexora and start managing your business more efficiently.
                    </p>
                </div>

                <div class="relative z-10 my-auto flex min-h-[185px] items-center justify-center py-2.5">
                    <img
                        src="/images/bg_img_login.png"
                        alt="Nexora dashboard illustration"
                        class="h-64 w-64 object-contain"
                    />
                </div>

                <div class="relative z-10 flex max-w-[250px] items-start gap-2">
                    <div class="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/20">
                        <Shield class="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
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

                <div class="mx-auto flex w-full max-w-[400px] flex-1 flex-col justify-center py-1.5">
                    <div>
                        <h2 class="text-xl font-bold tracking-normal text-slate-950 dark:text-white">Create Account</h2>
                    </div>

                    <form class="mt-3 space-y-2" @submit.prevent="submit">
                        <div class="grid gap-2 sm:grid-cols-2">
                            <LoginInput
                                id="name"
                                v-model="form.name"
                                label="Full Name"
                                placeholder="Enter your full name"
                                autocomplete="name"
                                :error="form.errors.name"
                                autofocus
                            >
                                <template #icon>
                                    <User class="h-4 w-4" aria-hidden="true" />
                                </template>
                            </LoginInput>

                            <LoginInput
                                id="email"
                                v-model="form.email"
                                label="Email Address"
                                type="email"
                                placeholder="Enter your email address"
                                autocomplete="username"
                                :error="form.errors.email"
                            >
                                <template #icon>
                                    <Mail class="h-4 w-4" aria-hidden="true" />
                                </template>
                            </LoginInput>
                        </div>

                        <LoginInput
                            id="password"
                            v-model="form.password"
                            label="Password"
                            :type="showPassword ? 'text' : 'password'"
                            placeholder="Create a password"
                            autocomplete="new-password"
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

                        <LoginInput
                            id="password_confirmation"
                            v-model="form.password_confirmation"
                            label="Confirm Password"
                            :type="showConfirmPassword ? 'text' : 'password'"
                            placeholder="Confirm your password"
                            autocomplete="new-password"
                            :error="form.errors.password_confirmation"
                        >
                            <template #icon>
                                <Lock class="h-4 w-4" aria-hidden="true" />
                            </template>
                            <template #action>
                                <button
                                    type="button"
                                    class="rounded-md p-0.5 transition duration-200 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-400 dark:hover:bg-slate-800"
                                    :aria-label="showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'"
                                    @click="showConfirmPassword = !showConfirmPassword"
                                >
                                    <EyeOff v-if="showConfirmPassword" class="h-4 w-4" aria-hidden="true" />
                                    <Eye v-else class="h-4 w-4" aria-hidden="true" />
                                </button>
                            </template>
                        </LoginInput>

                        <LoginInput
                            id="phone"
                            v-model="form.phone"
                            label="Phone Number (Optional)"
                            type="tel"
                            placeholder="Enter your phone number"
                            autocomplete="tel"
                            :required="false"
                        >
                            <template #icon>
                                <Phone class="h-4 w-4" aria-hidden="true" />
                            </template>
                        </LoginInput>

                        <label class="flex items-start gap-2 text-[11px] font-medium leading-4 text-slate-700 dark:text-slate-400">
                            <input
                                v-model="form.terms"
                                type="checkbox"
                                required
                                class="mt-0.5 rounded border-slate-300 text-violet-600 shadow-sm focus:ring-violet-500 dark:border-slate-600 dark:bg-slate-900 dark:focus:ring-violet-400"
                            />
                            <span>
                                I agree to the
                                <a href="#" class="font-bold text-violet-600 hover:underline dark:text-violet-400">Terms of Service</a>
                                and
                                <a href="#" class="font-bold text-violet-600 hover:underline dark:text-violet-400">Privacy Policy</a>
                            </span>
                        </label>

                        <button
                            type="submit"
                            class="flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-700 px-4 text-xs font-bold text-white shadow-lg shadow-violet-500/25 transition duration-200 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-violet-200 disabled:cursor-not-allowed disabled:opacity-60"
                            :disabled="form.processing"
                        >
                            <span>{{ form.processing ? 'Creating...' : 'Create Account' }}</span>
                            <ArrowRight class="h-4 w-4" aria-hidden="true" />
                        </button>
                    </form>

                    <p class="mt-2.5 text-center text-xs font-medium text-slate-600 dark:text-slate-400">
                        Already have an account?
                        <Link :href="route('login')" class="font-bold text-violet-600 transition duration-200 hover:text-violet-800 hover:underline dark:text-violet-400 dark:hover:text-violet-300">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </section>

        <p class="mt-3 shrink-0 text-center text-[10px] text-slate-500 dark:text-slate-600">
            © 2024 Nexora. All rights reserved.
        </p>
    </AuthLayout>
</template>
