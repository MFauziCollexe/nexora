export const formatJson = (value) => JSON.stringify(value ?? {}, null, 2)

export const methodTheme = (method) => {
    const themes = {
        GET: {
            border: 'border-sky-500 dark:border-sky-400',
            row: 'bg-[#ebf5ff] dark:bg-slate-950',
            details: 'bg-sky-50/80 dark:bg-slate-950',
            badge: 'bg-sky-500',
            code: 'text-sky-700',
        },
        POST: {
            border: 'border-emerald-500 dark:border-emerald-400',
            row: 'bg-[#e7f6f0] dark:bg-slate-950',
            details: 'bg-emerald-50/80 dark:bg-slate-950',
            badge: 'bg-emerald-500',
            code: 'text-emerald-700',
        },
        PUT: {
            border: 'border-orange-500 dark:border-orange-400',
            row: 'bg-[#fff4e8] dark:bg-slate-950',
            details: 'bg-orange-50/80 dark:bg-slate-950',
            badge: 'bg-orange-500',
            code: 'text-orange-700',
        },
        DELETE: {
            border: 'border-red-500 dark:border-red-400',
            row: 'bg-[#fff0f0] dark:bg-slate-950',
            details: 'bg-red-50/80 dark:bg-slate-950',
            badge: 'bg-red-500',
            code: 'text-red-700',
        },
    }

    return themes[method] ?? themes.POST
}
