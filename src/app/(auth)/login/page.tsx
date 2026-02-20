'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { setAuth } from '@/store/slices/authSlice'
import { Brain, Sparkles, Zap, Shield } from 'lucide-react'

const formSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters.',
    }),
})

export default function LoginPage() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
            })

            if (error) {
                toast.error(error.message)
                return
            }

            if (data.user) {
                dispatch(setAuth({ user: data.user, session: data.session }))
                toast.success('Login successful!')
                router.push('/dashboard')
            }
        } catch (error) {
            toast.error('An error occurred during login.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen bg-white">
            {/* Left side - Branded Visual */}
            <div className="hidden lg:flex w-1/2 relative bg-slate-950 flex-col justify-between p-12 overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#4f46e5_0%,transparent_40%),radial-gradient(circle_at_bottom_right,#2563eb_0%,transparent_40%)] opacity-30"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]"></div>

                <div className="relative z-10 flex items-center gap-3">
                    <div className="bg-gradient-to-br from-primary to-blue-600 p-2 rounded-xl shadow-lg shadow-primary/20">
                        <Brain className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-2xl font-extrabold tracking-tight text-white">
                        NeuroBox <span className="text-primary font-black">AI</span>
                    </span>
                </div>

                <div className="relative z-10 space-y-8 mt-12 max-w-lg">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                        Log in to your smart workspace.
                    </h1>
                    <p className="text-lg text-slate-300 font-medium leading-relaxed">
                        Welcome back! Continue generating, planning, and creating faster with your specialized AI agents.
                    </p>

                    <div className="space-y-6 pt-6">
                        <div className="flex items-center gap-4 text-slate-300">
                            <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-slate-800/50 border border-slate-700/50 shadow-sm">
                                <Zap className="h-5 w-5 text-blue-400" />
                            </div>
                            <span className="font-medium text-base">Lightning fast GPT-4o-mini generations</span>
                        </div>
                        <div className="flex items-center gap-4 text-slate-300">
                            <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-slate-800/50 border border-slate-700/50 shadow-sm">
                                <Sparkles className="h-5 w-5 text-emerald-400" />
                            </div>
                            <span className="font-medium text-base">8+ pre-tuned expert tools</span>
                        </div>
                        <div className="flex items-center gap-4 text-slate-300">
                            <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-xl bg-slate-800/50 border border-slate-700/50 shadow-sm">
                                <Shield className="h-5 w-5 text-purple-400" />
                            </div>
                            <span className="font-medium text-base">End-to-end encrypted generation history</span>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-slate-400 text-sm font-medium mt-12 flex items-center gap-6">
                    <span>© 2026 NeuroBox AI Inc.</span>
                    <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-slate-50 relative">
                {/* Mobile Header (Hidden on Desktop) */}
                <div className="absolute top-8 left-8 flex lg:hidden items-center gap-2">
                    <div className="bg-gradient-to-br from-primary to-blue-600 p-1.5 rounded-lg shadow-sm">
                        <Brain className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg font-extrabold tracking-tight text-slate-900">
                        NeuroBox AI
                    </span>
                </div>

                <div className="w-full max-w-md space-y-10">
                    <div className="space-y-3 text-center lg:text-left">
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">Welcome back</h2>
                        <p className="text-slate-500 font-medium text-base">Enter your credentials to access your account</p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold text-slate-700 w-full text-left inline-block">Email address</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="h-12 bg-white border-slate-200 focus:border-primary focus:ring-primary shadow-sm rounded-xl px-4 font-medium transition-all"
                                                placeholder="name@example.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between">
                                            <FormLabel className="font-bold text-slate-700">Password</FormLabel>
                                            <Link href="#" className="text-sm font-bold text-primary hover:underline transition-all">
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <FormControl>
                                            <Input
                                                className="h-12 bg-white border-slate-200 focus:border-primary focus:ring-primary shadow-sm rounded-xl px-4 font-medium transition-all"
                                                type="password"
                                                placeholder="••••••••"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full h-12 text-base font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-[0.98] active:translate-y-0"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Logging in...' : 'Sign in to NeuroBox'}
                            </Button>
                        </form>
                    </Form>

                    <div className="text-center pt-4">
                        <p className="text-sm font-medium text-slate-600">
                            Don't have an account?{' '}
                            <Link href="/register" className="text-primary font-bold hover:underline transition-all">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
