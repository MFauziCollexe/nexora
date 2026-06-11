"use client";

import { FormEvent, useState, useEffect } from "react";
import { login } from "@/modules/auth/services/authService";
import { useTheme } from "@/hooks/useTheme";
import {
  MailIcon, LockIcon, EyeIcon, EyeOffIcon,
  ArrowRightIcon, ShieldIcon, SunIcon, MoonIcon,
} from "@/components/ui/Icons";
import { LoginInput } from "@/components/auth/LoginInput";

const REMEMBER_EMAIL_KEY = "nexora-login-email";
const REMEMBER_PASSWORD_KEY = "nexora-login-password";
const REMEMBER_ENABLED_KEY = "nexora-login-remember";

type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

const initialForm: LoginForm = { email: "", password: "", remember: true };

export function LoginPage() {
  const [form, setForm] = useState<LoginForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const rememberEnabled = localStorage.getItem(REMEMBER_ENABLED_KEY);
    if (rememberEnabled !== null) {
      const remembered = rememberEnabled === "true";
      setForm({
        remember: remembered,
        email: remembered ? localStorage.getItem(REMEMBER_EMAIL_KEY) || "" : "",
        password: remembered ? localStorage.getItem(REMEMBER_PASSWORD_KEY) || "" : "",
      });
    }
  }, []);

  const updateField = <K extends keyof LoginForm>(field: K, value: LoginForm[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (form.remember) {
        localStorage.setItem(REMEMBER_ENABLED_KEY, "true");
        localStorage.setItem(REMEMBER_EMAIL_KEY, form.email);
        localStorage.setItem(REMEMBER_PASSWORD_KEY, form.password);
      } else {
        localStorage.removeItem(REMEMBER_ENABLED_KEY);
        localStorage.removeItem(REMEMBER_EMAIL_KEY);
        localStorage.removeItem(REMEMBER_PASSWORD_KEY);
      }
      await login(form);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Email atau password tidak sesuai.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-slate-50 px-4 py-6 text-slate-950 transition-colors duration-200 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center">
        <section className="grid w-full flex-1 overflow-hidden rounded-[18px] bg-white shadow-2xl shadow-violet-950/10 transition-colors duration-200 dark:bg-slate-900 dark:shadow-black/30 lg:max-h-[470px] lg:grid-cols-[0.86fr_1.14fr]">
          <aside className="relative hidden overflow-hidden bg-gradient-to-br from-violet-700 via-indigo-800 to-indigo-950 p-5 text-white lg:flex lg:flex-col">
            <div className="absolute -right-20 top-12 h-72 w-72 rounded-full border border-violet-300/15" />
            <div className="absolute right-4 top-24 h-48 w-48 rounded-full bg-violet-400/10 blur-2xl" />
            <div className="absolute -bottom-28 left-14 h-80 w-80 rounded-full border border-indigo-200/15" />

            <div className="relative z-10 flex items-center gap-3">
              <img alt="Nexora Logo" className="h-8 w-8 object-contain" src="/images/logo_nexora.png" />
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-bold text-white">NEXORA</span>
              </div>
            </div>

            <div className="relative z-10 mt-6 max-w-[250px]">
              <h1 className="text-xl font-bold leading-tight tracking-normal">Welcome Back</h1>
              <p className="mt-2 text-xs leading-5 text-indigo-50">
                Login to your Nexora account and continue managing your business.
              </p>
            </div>

            <div className="relative z-10 my-auto flex min-h-[185px] items-center justify-center py-2.5">
              <img alt="Nexora illustration" className="h-64 w-64 object-contain" src="/images/bg_img_login.png" />
            </div>

            <div className="relative z-10 flex max-w-[250px] items-start gap-2">
              <ShieldIcon className="mt-0.5 h-5 w-5 flex-none text-white" />
              <div>
                <p className="text-xs font-bold">Secure &amp; Trusted</p>
                <p className="w-62.5 mt-0.5 text-[10px] leading-4 text-indigo-100">
                  Your data is protected with enterprise grade security.
                </p>
              </div>
            </div>
          </aside>

          <div className="flex min-h-0 flex-col px-4 py-3 sm:px-6 lg:px-9 lg:py-5">
            <div className="flex justify-end">
              <button
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                aria-pressed={isDarkMode}
                className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[11px] font-medium text-slate-600 transition duration-200 hover:bg-slate-100 hover:text-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-100 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-violet-300 dark:focus:ring-violet-500/20"
                type="button"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? <SunIcon /> : <MoonIcon />}
                <span>{isDarkMode ? "Light mode" : "Dark mode"}</span>
              </button>
            </div>

            <div className="mx-auto flex w-full max-w-[330px] flex-1 flex-col justify-center py-1.5">
              <div>
                <h2 className="text-xl font-bold tracking-normal text-slate-950 dark:text-white">Login to Nexora</h2>
                <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400">
                  Enter your credentials to access your account
                </p>
              </div>

              {error && (
                <div className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-[11px] font-medium text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
                  {error}
                </div>
              )}

              <form className="mt-5 space-y-3" onSubmit={submit}>
                <LoginInput
                  id="email"
                  label="Email Address"
                  type="email"
                  value={form.email}
                  placeholder="Enter your email address"
                  autoComplete="username"
                  autoFocus
                  icon={<MailIcon />}
                  onChange={(value) => updateField("email", value)}
                />

                <LoginInput
                  id="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  icon={<LockIcon />}
                  action={
                    <button
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="rounded-md p-0.5 transition duration-200 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-400 dark:hover:bg-slate-800"
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  }
                  onChange={(value) => updateField("password", value)}
                />

                <div className="flex items-center justify-between gap-2">
                  <label className="flex items-center gap-2 text-[11px] font-medium text-slate-600 dark:text-slate-400">
                    <input
                      checked={form.remember}
                      className="h-4 w-4 rounded border-slate-300 text-violet-600 accent-violet-600"
                      name="remember"
                      type="checkbox"
                      onChange={(e) => updateField("remember", e.target.checked)}
                    />
                    <span>Remember me</span>
                  </label>
                  <a className="text-[11px] font-bold text-violet-600 transition duration-200 hover:text-violet-800 hover:underline focus:outline-none focus:ring-2 focus:ring-violet-100 dark:text-violet-400 dark:hover:text-violet-300 dark:focus:ring-violet-500/20" href="#">
                    Forgot Password?
                  </a>
                </div>

                <button
                  className="flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-700 px-4 text-xs font-bold text-white shadow-lg shadow-violet-500/25 transition duration-200 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-violet-200 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={loading}
                  type="submit"
                >
                  <span>{loading ? "Logging in..." : "Login"}</span>
                  <ArrowRightIcon />
                </button>
              </form>

              <p className="mt-3.5 text-center text-xs font-medium text-slate-600 dark:text-slate-400">
                Don&apos;t have an account?{" "}
                <a className="font-bold text-violet-600 transition duration-200 hover:text-violet-800 hover:underline dark:text-violet-400 dark:hover:text-violet-300" href="/register">
                  Register here
                </a>
              </p>
            </div>
          </div>
        </section>

        <p className="mt-10 shrink-0 text-center text-[10px] text-slate-500 dark:text-slate-600">
          &copy; 2024 Nexora. All rights reserved.
        </p>
      </div>
    </main>
  );
}
