export const formatJson = (value) => JSON.stringify(value ?? {}, null, 2)

export const methodTheme = (method) => {
    const themes = {
        GET: {
            border: 'border-sky-500',
            row: 'bg-[#ebf5ff]',
            details: 'bg-sky-50/80',
            badge: 'bg-sky-500',
            code: 'text-sky-700',
        },
        POST: {
            border: 'border-emerald-500',
            row: 'bg-[#e7f6f0]',
            details: 'bg-emerald-50/80',
            badge: 'bg-emerald-500',
            code: 'text-emerald-700',
        },
        PUT: {
            border: 'border-orange-500',
            row: 'bg-[#fff4e8]',
            details: 'bg-orange-50/80',
            badge: 'bg-orange-500',
            code: 'text-orange-700',
        },
        DELETE: {
            border: 'border-red-500',
            row: 'bg-[#fff0f0]',
            details: 'bg-red-50/80',
            badge: 'bg-red-500',
            code: 'text-red-700',
        },
    }

    return themes[method] ?? themes.POST
}
