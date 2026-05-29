<script setup>
import DashboardLayout from '@/modules/dashboard/layouts/DashboardLayout.vue';
import DeleteUserForm from '../components/DeleteUserForm.vue';
import UpdatePasswordForm from '../components/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from '../components/UpdateProfileInformationForm.vue';
import { Head } from '@inertiajs/vue3';

defineProps({
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});
</script>

<template>
    <Head title="Profile" />

    <DashboardLayout>
        <div class="py-8">
            <div class="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                <div>
                    <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100">
                        Profile
                    </h1>
                    <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Manage your account information and security settings.
                    </p>
                </div>

                <div
                    class="bg-white p-4 shadow sm:rounded-lg sm:p-8"
                >
                    <UpdateProfileInformationForm
                        :must-verify-email="mustVerifyEmail"
                        :status="status"
                        class="max-w-xl"
                    />
                </div>

                <div
                    class="bg-white p-4 shadow sm:rounded-lg sm:p-8"
                >
                    <UpdatePasswordForm class="max-w-xl" />
                </div>

                <div
                    class="bg-white p-4 shadow sm:rounded-lg sm:p-8"
                >
                    <DeleteUserForm class="max-w-xl" />
                </div>
            </div>
        </div>
    </DashboardLayout>
</template>
