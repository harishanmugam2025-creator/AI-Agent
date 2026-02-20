'use client'

import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useDispatch } from 'react-redux'
import { setAuth, clearAuth } from '@/store/slices/authSlice'

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch()

    useEffect(() => {
        // Check active sessions and sets the user
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                dispatch(setAuth({ user: session.user, session }))
            } else {
                dispatch(clearAuth())
            }
        })

        // Listen for changes on auth state (logged in, signed out, etc.)
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
