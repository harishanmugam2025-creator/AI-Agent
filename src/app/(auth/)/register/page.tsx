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
import { Brain, Sparkles, Zap, Shield } from 'lucide-react'

const formSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters.',
    }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export default function RegisterPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            const { data, error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
            })

            if (error) {
                toast.error(error.message)
                return
            }

            toast.success('Registration successful! Please check your email for verification.')
            router.push('/login')
        } catch (error) {
            toast.error('An error occurred during registration.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen bg-white flex-row-reverse">
            {/* Right side - Branded Visual (mirrored from login) */}
            <div className="hidden lg:flex w-1/2 relative bg-slate-950 flex-col justify-between p-12 overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#4f46e5_0%,transparent_40%),radial-gradient(circle_at_bottom_left,#2563eb_0%,transparent_40%)] opacity-30"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_left,#ffffff0a_1px,transparent_1px),linear-gradient(to_top,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]"></div>

                <div className="relative z-10 flex items-center justify-end gap-3 w-full">
                    <span className="text-2xl font-extrabold tracking-tight text-white">
                        NeuroBox <span className="text-primary font-black">AI</span>
                    </span>
                    <div className="bg-gradient-to-br from-primary to-blue-600 p-2 rounded-xl shadow-lg shadow-primary/20">
                        <Brain className="h-6 w-6 text-white" />
                    </div>
                </div>

                <div className="relative z-10 space-y-8 mt-12 max-w-lg ml-auto text-right">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                        Start building your AI ideas today.
                    </h1>
                    <p className="text-lg text-slate-300 font-medium leading-relaxed">
                        Join thousands of creators using NeuroBox AI to automate their workflows and scale their productivity.
                    </p>
                </div>

                <div className="relative z-10 text-slate-400 text-sm font-medium mt-12 flex justify-end gap-6 w-full">
                    <span>© 2026 NeuroBox AI Inc.</span>
                </div>
            </div>

            {/* Left side - Form */}
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
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">Create an account</h2>
                        <p className="text-slate-500 font-medium text-base">Enter your details to register for NeuroBox AI</p>
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
                                        <FormLabel className="font-bold text-slate-700 w-full text-left inline-block">Password</FormLabel>
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
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold text-slate-700 w-full text-left inline-block">Confirm Password</FormLabel>
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
                                {isLoading ? 'Creating account...' : 'Create Account'}
                            </Button>
                        </form>
                    </Form>

                    <div className="text-center pt-4">
                        <p className="text-sm font-medium text-slate-600">
                            Already have an account?{' '}
                            <Link href="/login" className="text-primary font-bold hover:underline transition-all">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
