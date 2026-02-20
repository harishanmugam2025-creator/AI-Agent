'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { User, LogOut, Settings, History, Rocket } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

export function UserDropdown() {
    const router = useRouter()
    const { user, loading } = useSelector((state: RootState) => state.auth)

    const handleLogout = async () => {
        // Sign out from Supabase client
        await supabase.auth.signOut()

        // Clear the cookie that middleware relies on
        document.cookie = 'sb-brgerllbgweddtagdbhj-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

        // Force a hard navigation to clear all states and trigger middleware
        window.location.href = '/login'
    }

    // We want the dropdown to be visible even if user is loading, 
    // showing a placeholder until the user state is populated.
    // if (!user) return null

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 p-0 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-center w-full h-full text-xs font-bold text-primary">
                        {user?.email?.[0].toUpperCase() || <User className="h-5 w-5" />}
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Account</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {loading ? 'Loading...' : (user?.email || 'Not logged in')}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/dashboard/history')}>
                    <History className="mr-2 h-4 w-4" />
                    <span>History</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/pricing')}>
                    <Rocket className="mr-2 h-4 w-4" />
                    <span>Billing & Plans</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
