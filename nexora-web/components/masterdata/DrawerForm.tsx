"use client";

export function DrawerForm({ open, title, onClose, className = "", children }: { open: boolean; title: string; onClose: () => void; className?: string; children: React.ReactNode }) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />}

      <div className={`
        fixed top-0 right-0 h-full bg-white dark:bg-slate-800 shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${open ? "translate-x-0" : "translate-x-full"}
        ${className}
      `}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-700">
          <h2 className="text-[14px] font-bold text-slate-800 dark:text-white">{title}</h2>
          <button onClick={onClose} className="w-7 h-7 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center text-slate-400 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="px-5 py-4 space-y-4">{children}</div>
      </div>
    </>
  );
}

export default DrawerForm;
