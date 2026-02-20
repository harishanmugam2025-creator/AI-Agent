'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useDispatch } from 'react-redux'
import { setAuth, clearAuth, setLoading } from '@/store/slices/authSlice'
import { useRouter, usePathname } from 'next/navigation'

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch()
    const router = useRouter()
    const pathname = usePathname()

    const [isChecking, setIsChecking] = useState(true)

    useEffect(() => {
        dispatch(setLoading(true))

        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            const isProtectedRoute = pathname.startsWith('/dashboard') ||
                pathname.startsWith('/tools') ||
                pathname.startsWith('/settings') ||
                pathname.startsWith('/profile') ||
                pathname.startsWith('/history') ||
                pathname.startsWith('/help') ||
                pathname.startsWith('/pricing')

            if (session) {
                dispatch(setAuth({ user: session.user, session }))
                if (pathname === '/login' || pathname === '/register') {
                    router.push('/dashboard')
                }
            } else {
                dispatch(clearAuth())
                if (isProtectedRoute) {
                    router.push('/login')
                }
            }
            setIsChecking(false)
        }

        checkAuth()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                const isProtectedRoute = pathname.startsWith('/dashboard') ||
                    pathname.startsWith('/tools') ||
                    pathname.startsWith('/settings') ||
                    pathname.startsWith('/profile') ||
                    pathname.startsWith('/history') ||
                    pathname.startsWith('/help') ||
                    pathname.startsWith('/pricing')

                if (session) {
                    dispatch(setAuth({ user: session.user, session }))
                    if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
                        if (pathname === '/login' || pathname === '/register') {
                            router.push('/dashboard')
                        }
                    }
                } else {
                    dispatch(clearAuth())
                    if (isProtectedRoute || event === 'SIGNED_OUT') {
                        router.push('/login')
                    }
                }
            }
        )

        return () => subscription.unsubscribe()
    }, [dispatch, pathname, router])

    const isProtectedRoute = pathname.startsWith('/dashboard') ||
        pathname.startsWith('/tools') ||
        pathname.startsWith('/settings') ||
        pathname.startsWith('/profile') ||
        pathname.startsWith('/history') ||
        pathname.startsWith('/help')

    // Don't render protected content while checking auth
    if (isProtectedRoute && isChecking) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="animate-pulse flex flex-col items-center"><div className="h-10 w-10 bg-primary/20 rounded-full mb-4"></div><div className="text-slate-500 font-medium">Verifying access...</div></div></div>
    }

    return <>{children}</>
}
