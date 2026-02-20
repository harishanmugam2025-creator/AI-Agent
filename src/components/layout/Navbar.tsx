'use client'

import { Search } from 'lucide-react'
import { UserDropdown } from './UserDropdown'
import { ThemeToggle } from './ThemeToggle'
import { Input } from '@/components/ui/input'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

import { Suspense } from 'react'

function SearchInput() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [query, setQuery] = useState(searchParams.get('q') || '')

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setQuery(value)

        // Only filter when on dashboard
        if (pathname === '/dashboard' || pathname.startsWith('/dashboard')) {
            if (value.trim()) {
                router.push(`/dashboard?q=${encodeURIComponent(value.trim())}`, { scroll: false })
            } else {
                router.push('/dashboard', { scroll: false })
            }
        }
    }, [pathname, router])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && query.trim()) {
            router.push(`/dashboard?q=${encodeURIComponent(query.trim())}`)
        }
    }

    return (
        <div className="relative flex items-center w-full max-w-sm">
            <Search className="absolute left-2.5 h-4 w-4 text-slate-400 pointer-events-none" />
            <Input
                type="search"
                value={query}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
                placeholder="Search tools..."
                className="pl-9 h-9 w-[300px] lg:w-[400px] bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-800 transition-all font-medium text-sm"
            />
        </div>
    )
}

export function Navbar() {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-white dark:bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60 transition-colors">
            <div className="w-full max-w-[1600px] mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-4 lg:gap-8 flex-1">
                    <Suspense fallback={<div className="h-9 w-[300px] lg:w-[400px] bg-slate-100 dark:bg-slate-800 animate-pulse rounded-md" />}>
                        <SearchInput />
                    </Suspense>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <UserDropdown />
                </div>
            </div>
        </header>
    )
}
