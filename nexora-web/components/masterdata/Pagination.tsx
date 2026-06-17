"use client";

import { Dispatch, SetStateAction } from "react";

type PaginationProps = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  filteredLength: number;
  itemsPerPage?: number;
  setItemsPerPage?: Dispatch<SetStateAction<number>>;
};

export default function Pagination({
  currentPage,
  setCurrentPage,
  filteredLength,
  itemsPerPage = 6,
  setItemsPerPage,
}: PaginationProps) {
  const totalPages = Math.ceil(filteredLength / itemsPerPage);
  if (totalPages <= 1) return null;

  const startEntry = (currentPage - 1) * itemsPerPage + 1;
  const endEntry = Math.min(currentPage * itemsPerPage, filteredLength);

  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
    const page = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
    return page <= totalPages ? page : null;
  }).filter(Boolean) as number[];

  return (
    <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between text-[11px] gap-3">
      <span className="text-slate-600 dark:text-slate-400">
        Showing {startEntry} to {endEntry} of {filteredLength} entries
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="w-6 h-6 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-slate-600 dark:text-slate-400"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-6 h-6 rounded text-[10px] font-medium transition-colors ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            {page}
          </button>
        ))}
        {totalPages > 5 && currentPage < totalPages - 2 && (
          <span className="text-slate-400 dark:text-slate-600">...</span>
        )}
        {totalPages > 5 && (
          <button
            onClick={() => setCurrentPage(totalPages)}
            className="w-6 h-6 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 text-[10px] font-medium transition-colors"
          >
            {totalPages}
          </button>
        )}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="w-6 h-6 rounded border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-slate-600 dark:text-slate-400"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-2">
        {setItemsPerPage && (
          <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} className="border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded px-2 py-1 text-[12px]">
            {[10,25,50,100].map(n => <option key={n} value={n}>{n}/page</option>)}
          </select>
        )}
      </div>
    </div>
  );
}
