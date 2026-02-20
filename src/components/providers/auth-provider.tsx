'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useDispatch } from 'react-redux'
import { setAuth, clearAuth, setLoading } from '@/store/slices/authSlice'

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch()

    useEffect(() => {
        // Start as loading = true (already initial state)
        dispatch(setLoading(true))

        // Check for an existing active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                dispatch(setAuth({ user: session.user, session }))
            } else {
                dispatch(clearAuth())
            }
        })

        // Listen for auth state changes (login, logout, token refresh)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                if (session) {
                    dispatch(setAuth({ user: session.user, session }))
                } else {
                    dispatch(clearAuth())
                }
            }
        )

        return () => subscription.unsubscribe()
    }, [dispatch])

    return <>{children}</>
}
