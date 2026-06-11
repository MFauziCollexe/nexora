"use client";

import { useAuth } from "@/lib/AuthContext";
import { SearchIcon, BellIcon, CartIcon, ChevronDownIcon } from "@/components/ui/Icons";

type HeaderProps = {
  title: string;
  subtitle: string;
  onLogout: () => void;
};

export function Header({ title, subtitle, onLogout }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-4 py-2.5 gap-3">
      <div>
        <h1 className="text-[15px] font-bold text-slate-800 dark:text-slate-100 leading-tight">{title}</h1>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">{subtitle}</p>
      </div>

      <div className="ml-auto flex items-center gap-2.5">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-44 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg pl-7 pr-3 py-1.5 text-[11px] text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
          />
          <SearchIcon className="w-3 h-3 text-slate-400 dark:text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-1">
            Ctrl+K
          </span>
        </div>

        <button className="relative p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
          <BellIcon />
          <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
            5
          </span>
        </button>

        <button className="relative p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
          <CartIcon />
          <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-orange-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 pl-2 pr-2.5 py-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold">
            {(user?.name || "A").charAt(0).toUpperCase()}
          </div>
          <div className="text-left">
            <div className="text-[11px] font-semibold text-slate-800 dark:text-slate-100">{user?.name || "Admin"}</div>
            <div className="text-[9px] text-slate-400 dark:text-slate-500">System Administrator</div>
          </div>
          <ChevronDownIcon className="w-3 h-3 text-slate-400 dark:text-slate-500" />
        </button>
      </div>
    </header>
  );
}
