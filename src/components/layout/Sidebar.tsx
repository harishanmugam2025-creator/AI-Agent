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
    Rocket
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

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

    return (
        <aside
            className={cn(
                "hidden md:flex flex-col border-r bg-white transition-all duration-300",
                isCollapsed ? "w-[72px]" : "w-64"
            )}
        >
            <div className="flex flex-col flex-1 gap-4 py-4 h-full">
                <div className="flex items-center justify-between px-4 mb-2">
                    {!isCollapsed && <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Main Menu</span>}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="h-8 w-8 p-0"
                    >
                        {isCollapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </Button>
                </div>

                <nav className="flex-1 space-y-1 px-2">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all group",
                                    isActive
                                        ? "bg-primary text-white shadow-sm"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                <item.icon className={cn(
                                    "h-5 w-5 transition-colors",
                                    isActive ? "text-white" : "text-slate-400 group-hover:text-slate-900"
                                )} />
                                {!isCollapsed && <span>{item.name}</span>}
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </aside>
    )
}
