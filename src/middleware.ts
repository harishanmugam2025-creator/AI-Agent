import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Check for the presence of the supabase auth token in cookies
    // Supabase uses 'sb-access-token' or similar depending on the version/config
    // We can also check for the presence of the session cookie

    const session = request.cookies.get('sb-brgerllbgweddtagdbhj-auth-token') // Replace with your actual project ref prefix if known or use a more generic check

    const { pathname } = request.nextUrl

    // If path is protected, and no session, redirect to login
    const isProtectedRoute = pathname.startsWith('/dashboard') ||
        pathname.startsWith('/tools') ||
        pathname.startsWith('/settings') ||
        pathname.startsWith('/profile') ||
        pathname.startsWith('/help')

    if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // If path is login or register, and session exists, redirect to dashboard
    if ((pathname === '/login' || pathname === '/register') && session) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/tools/:path*', '/settings/:path*', '/profile/:path*', '/help/:path*', '/login', '/register'],
}
