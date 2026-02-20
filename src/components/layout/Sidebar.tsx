'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    History,
    Settings,
    HelpCircle,
    Menu,
    ChevronLeft,
    Rocket,
    Brain
} from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { UserDropdown } from './UserDropdown'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

const sidebarItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'History', icon: History, href: '/dashboard/history' },
    { name: 'Pricing', icon: Rocket, href: '/pricing' },
    { name: 'Settings', icon: Settings, href: '/settings' },
    { name: 'Help', icon: HelpCircle, href: '/help' },
]

export function Sidebar() {
    const pathname = usePathname()
    const [isCollapsed, setIsCollapsed] = useState(false)
    const { user } = useSelector((state: RootState) => state.auth)

    return (
        <aside
            className={cn(
                "hidden md:flex flex-col border-r bg-white dark:bg-slate-950 transition-all duration-300 shadow-sm",
                isCollapsed ? "w-[72px]" : "w-64"
            )}
        >
            <div className="flex flex-col flex-1 py-6 h-full">
                <div className="px-6 mb-8 flex items-center justify-between">
                    <div className={cn(
                        "flex items-center transition-all duration-300",
                        isCollapsed ? "justify-center w-full" : "gap-3"
                    )}>
                        <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20 flex-shrink-0">
                            <Brain className="h-6 w-6 text-white" />
                        </div>
                        {!isCollapsed && (
                            <div className="flex flex-col">
                                <span className="font-black text-xl tracking-tighter text-slate-900 dark:text-slate-100 uppercase">
                                    NeuroBox
                                </span>
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] -mt-1 opacity-80">
                                    AI Agent
                                </span>
                            </div>
                        )}
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={cn(
                            "h-8 w-8 p-0 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-300",
                            isCollapsed ? "hidden" : "flex"
                        )}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                </div>

                {isCollapsed && (
                    <div className="flex justify-center mb-8">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="h-8 w-8 p-0 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                        >
                            <Menu className="h-4 w-4" />
                        </Button>
                    </div>
                )}

                <nav className="flex-1 space-y-1 px-3">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 group relative",
                                    isActive
                                        ? "bg-primary/10 dark:bg-primary/20 text-primary"
                                        : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100"
                                )}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="active-bar"
                                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-7 bg-primary rounded-r-full"
                                        initial={{ opacity: 0, scaleY: 0 }}
                                        animate={{ opacity: 1, scaleY: 1 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <item.icon className={cn(
                                    "h-[18px] w-[18px] transition-all duration-200 flex-shrink-0",
                                    isActive
                                        ? "text-primary"
                                        : "text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200"
                                )} />
                                {!isCollapsed && <span>{item.name}</span>}
                            </Link>
                        )
                    })}
                </nav>

                {/* Profile Section at Bottom */}
                <div className={cn(
                    "mt-auto border-t border-slate-100 dark:border-slate-800 p-4 flex items-center transition-all duration-300 bg-slate-50/50 dark:bg-slate-900/50",
                    isCollapsed ? "justify-center" : "gap-3"
                )}>
                    <UserDropdown />
                    {!isCollapsed && user && (
                        <div className="flex flex-col min-w-0 overflow-hidden">
                            <span className="text-[13px] font-bold text-slate-900 dark:text-slate-100 truncate">
                                {user.email?.split('@')[0]}
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium truncate">
                                {user.email}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    )
}
