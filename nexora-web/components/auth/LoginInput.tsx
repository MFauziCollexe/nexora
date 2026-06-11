"use client";

import { ReactNode } from "react";

type LoginInputProps = {
  id: string;
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

export function LoginInput({
  id, label, type, value, placeholder, autoComplete,
  error, autoFocus, icon, action, onChange,
}: LoginInputProps) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-slate-950 dark:text-slate-100" htmlFor={id}>
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
          onChange={(e) => onChange(e.target.value)}
          className={`h-9 w-full rounded-lg border bg-white pl-9 pr-9 text-xs text-slate-900 shadow-sm transition duration-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 ${
            error
              ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100 dark:border-rose-500 dark:focus:border-rose-400 dark:focus:ring-rose-500/20"
              : "border-slate-300 focus:border-violet-500 focus:ring-violet-100 dark:border-slate-700 dark:focus:border-violet-400 dark:focus:ring-violet-500/20"
          }`}
        />
        {action && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 dark:text-slate-400">
            {action}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-[11px] text-rose-600 dark:text-rose-400">{error}</p>
      )}
    </div>
  );
}
