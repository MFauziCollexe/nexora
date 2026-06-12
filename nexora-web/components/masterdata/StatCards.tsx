"use client";

type Card = { label: string; value: number | string; sub: string; iconBg: string; iconColor: string; icon: string };

export function StatCards({ cards }: { cards: Card[] }) {
  return (
    <div className="grid grid-cols-5 gap-3">
      {cards.map((s) => (
        <div key={s.label} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm p-3 flex items-center gap-3">
          <div className={`${s.iconBg} ${s.iconColor} w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0`}>
            {/* Minimal icon switch — keep SVGs inline to avoid adding dependencies */}
            {s.icon === "user" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
            {s.icon === "check" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M20 6L9 17l-5-5"/></svg>}
            {s.icon === "pause" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M6 4h12v16H6z"/></svg>}
            {s.icon === "lock" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>}
            {s.icon === "online" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>}
            {s.icon === "shield" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
            {s.icon === "crown" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M2 17l4-11 4 7 4-7 4 11H2z"/></svg>}
            {s.icon === "users" && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>}
          </div>
          <div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">{s.label}</p>
            <p className="text-[20px] font-bold text-slate-800 dark:text-white leading-tight">{s.value}</p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500">{s.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatCards;
