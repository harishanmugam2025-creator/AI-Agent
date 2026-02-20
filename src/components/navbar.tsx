'use client'

import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Brain } from 'lucide-react'
import Link from 'next/link'

export function Navbar() {
    const router = useRouter()
    const { user } = useSelector((state: RootState) => state.auth)

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/login')
    }

    return (
        <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link href="/dashboard" className="flex items-center space-x-2">
                        <div className="bg-primary p-1.5 rounded-lg">
                            <Brain className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                            NeuroBox AI
                        </span>
                    </Link>

                    <div className="flex items-center space-x-4">
                        {user && (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-slate-600 hidden md:inline-block">
                                    {user.email}
                                </span>
                                <Button variant="outline" size="sm" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
