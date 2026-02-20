import { Brain, Search } from 'lucide-react'
import { UserDropdown } from './UserDropdown'
import { ThemeToggle } from './ThemeToggle'
import Link from 'next/link'
import { Input } from '@/components/ui/input'

export function Navbar() {
    return (
        <header className="sticky top-0 z-40 w-full border-b bg-white dark:bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60 transition-colors">
            <div className="container flex h-16 items-center justify-between px-4 md:px-8">
                <div className="flex items-center gap-4 lg:gap-8">
                    <Link href="/dashboard" className="flex items-center space-x-2">
                        <div className="bg-primary p-1.5 rounded-lg shadow-sm">
                            <Brain className="h-6 w-6 text-white" />
                        </div>
                        <span className="hidden font-bold lg:inline-block text-xl tracking-tight text-slate-900 dark:text-slate-100">
                            NeuroBox AI
                        </span>
                    </Link>
                    <div className="relative hidden md:flex items-center w-full max-w-sm">
                        <Search className="absolute left-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            type="search"
                            placeholder="Search tools..."
                            className="pl-9 h-9 w-[300px] lg:w-[400px] bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-800 focus:ring-primary/20"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <UserDropdown />
                </div>
            </div>
        </header>
    )
}
