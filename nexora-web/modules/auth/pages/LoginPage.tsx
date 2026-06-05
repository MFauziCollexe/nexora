"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import { login } from "../services/authService";

type LoginState = {
  email: string;
  password: string;
  remember: boolean;
};

const REMEMBER_EMAIL_KEY = "nexora-login-email";
const REMEMBER_PASSWORD_KEY = "nexora-login-password";
const REMEMBER_ENABLED_KEY = "nexora-login-remember";
const THEME_KEY = "nexora-theme";

const initialState: LoginState = {
  email: "",
  password: "",
  remember: true,
};

type IconProps = {
  className?: string;
};

const MailIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
    <rect height="16" rx="2" width="20" x="2" y="4" />
  </svg>
);

const LockIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <rect height="11" rx="2" ry="2" width="18" x="3" y="11" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="m15 18-.722-3.25" />
    <path d="M2 8a10.645 10.645 0 0 0 20 0" />
    <path d="m20 15-1.726-2.05" />
    <path d="m4 15 1.726-2.05" />
    <path d="m9 18 .722-3.25" />
  </svg>
);

const ArrowRightIcon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const ShieldIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  </svg>
);

const SunIcon = ({ className = "h-3.5 w-3.5" }: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const MoonIcon = ({ className = "h-3.5 w-3.5" }: IconProps) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M20.985 12.486A9 9 0 1 1 11.514 3.015 7 7 0 0 0 20.985 12.486" />
  </svg>
);

type LoginInputProps = {
  id: keyof Pick<LoginState, "email" | "password">;
  label: string;
  type: string;
  value: string;
  placeholder: string;
  autoComplete: string;
  error?: string;
  autoFocus?: boolean;
  icon: ReactNode;
  action?: ReactNode;
  onChange: (value: string) => void;
};

function LoginInput({
  id,
  label,
  type,
  value,
  placeholder,
  autoComplete,
  error,
  autoFocus,
  icon,
  action,
  onChange,
}: LoginInputProps) {
  return (
    <div>
      <label
        className="block text-[11px] font-semibold text-slate-950 dark:text-slate-100"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative mt-1.5">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-500">
          {icon}
        </div>
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          required
          onChange={(event) => onChange(event.target.value)}
          className={`h-9 w-full rounded-lg border bg-white pl-9 pr-9 text-xs text-slate-900 shadow-sm transition duration-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 ${
            error
              ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100 dark:border-rose-500 dark:focus:border-rose-400 dark:focus:ring-rose-500/20"
              : "border-slate-300 focus:border-violet-500 focus:ring-violet-100 dark:border-slate-700 dark:focus:border-violet-400 dark:focus:ring-violet-500/20"
          }`}
        />
        {action ? (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 dark:text-slate-400">
            {action}
          </div>
        ) : null}
      </div>
      {error ? (
        <p className="mt-1 text-[11px] text-rose-600 dark:text-rose-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function LoginPage() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = savedTheme ? savedTheme === "dark" : prefersDark;
    const rememberEnabled = localStorage.getItem(REMEMBER_ENABLED_KEY);

    setIsDarkMode(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme);

    if (rememberEnabled !== null) {
      const remembered = rememberEnabled === "true";

      setForm((current) => ({
        ...current,
        remember: remembered,
        email: remembered ? localStorage.getItem(REMEMBER_EMAIL_KEY) || "" : "",
        password: remembered
          ? localStorage.getItem(REMEMBER_PASSWORD_KEY) || ""
          : "",
      }));
    }
  }, []);

  const updateField = <K extends keyof LoginState>(
    field: K,
    value: LoginState[K],
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const toggleDarkMode = () => {
    setIsDarkMode((current) => {
      const nextTheme = !current;
      document.documentElement.classList.toggle("dark", nextTheme);
      localStorage.setItem(THEME_KEY, nextTheme ? "dark" : "light");
      return nextTheme;
    });
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
    } catch {
      setError("Email atau password tidak sesuai.");
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
              <img
                alt="Nexora Logo"
                className="h-8 w-8 object-contain"
                src="/images/logo_nexora.png"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-bold text-white">NEXORA</span>
              </div>
            </div>

            <div className="relative z-10 mt-6 max-w-[250px]">
              <h1 className="text-xl font-bold leading-tight tracking-normal">
                Welcome Back
              </h1>
              <p className="mt-2 text-xs leading-5 text-indigo-50">
                Login to your Nexora account and continue managing your
                business.
              </p>
            </div>

            <div className="relative z-10 my-auto flex min-h-[185px] items-center justify-center py-2.5">
              <img
                alt="Nexora illustration"
                className="h-64 w-64 object-contain"
                src="/images/bg_img_login.png"
              />
            </div>

            <div className="relative z-10 flex max-w-[250px] items-start gap-2">
              <ShieldIcon className="mt-0.5 h-5 w-5 flex-none text-white" />
              <div>
                <p className="text-xs font-bold">Secure &amp; Trusted</p>
                <p className="w-62.5 mt-0.5 text-[10px] leading-4 text-indigo-100">
                  Your data is asdasd with enterprise grade security.
                </p>
              </div>
            </div>
          </aside>

          <div className="flex min-h-0 flex-col px-4 py-3 sm:px-6 lg:px-9 lg:py-5">
            <div className="flex justify-end">
              <button
                aria-label={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
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
                <h2 className="text-xl font-bold tracking-normal text-slate-950 dark:text-white">
                  Login to Nexora
                </h2>
                <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400">
                  Enter your credentials to access your account
                </p>
              </div>

              {error ? (
                <div className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-[11px] font-medium text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
                  {error}
                </div>
              ) : null}

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
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="rounded-md p-0.5 transition duration-200 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-400 dark:hover:bg-slate-800"
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
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
                      onChange={(event) =>
                        updateField("remember", event.target.checked)
                      }
                    />
                    <span>Remember me</span>
                  </label>

                  <a
                    className="text-[11px] font-bold text-violet-600 transition duration-200 hover:text-violet-800 hover:underline focus:outline-none focus:ring-2 focus:ring-violet-100 dark:text-violet-400 dark:hover:text-violet-300 dark:focus:ring-violet-500/20"
                    href="#"
                  >
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
                <a
                  className="font-bold text-violet-600 transition duration-200 hover:text-violet-800 hover:underline dark:text-violet-400 dark:hover:text-violet-300"
                  href="/register"
                >
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
