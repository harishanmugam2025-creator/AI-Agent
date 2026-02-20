'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { Navbar } from '@/components/layout/Navbar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { User, Mail, Shield, Smartphone, Globe, Bell } from 'lucide-react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export default function ProfilePage() {
    const { user } = useSelector((state: RootState) => state.auth)

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-slate-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
                            <p className="text-slate-500 mt-1 font-medium">Manage your personal information and preferences.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-8">
                            {/* Profile Card */}
                            <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
                                <div className="h-32 bg-gradient-to-r from-indigo-500 to-sky-500" />
                                <CardHeader className="relative pb-0">
                                    <div className="absolute -top-12 left-6">
                                        <div className="h-24 w-24 rounded-3xl border-4 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-xl">
                                            <User className="h-12 w-12 text-slate-400" />
                                        </div>
                                    </div>
                                    <div className="pt-12 flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-2xl font-bold">User Account</CardTitle>
                                            <CardDescription>{user?.email}</CardDescription>
                                        </div>
                                        <Button variant="outline" size="sm">Edit Profile</Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-8 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-500 flex items-center gap-2">
                                                <Mail className="h-4 w-4" /> Email Address
                                            </label>
                                            <Input disabled value={user?.email || ''} className="bg-slate-50 dark:bg-slate-950 font-medium" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-500 flex items-center gap-2">
                                                <Shield className="h-4 w-4" /> Security Status
                                            </label>
                                            <div className="h-10 flex items-center px-3 rounded-lg border bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/30 text-green-600 dark:text-green-400 text-sm font-bold">
                                                Verified Account
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="space-y-4">
                                        <h3 className="font-bold">Preferences</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                                                <div className="flex items-center gap-3">
                                                    <Bell className="h-5 w-5 text-slate-400" />
                                                    <span className="text-sm font-semibold">Email Notifications</span>
                                                </div>
                                                <div className="h-6 w-11 bg-indigo-600 rounded-full cursor-pointer p-1">
                                                    <div className="h-4 w-4 bg-white rounded-full ml-auto" />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                                                <div className="flex items-center gap-3">
                                                    <Globe className="h-5 w-5 text-slate-400" />
                                                    <span className="text-sm font-semibold">Public Profile</span>
                                                </div>
                                                <div className="h-6 w-11 bg-slate-200 dark:bg-slate-700 rounded-full cursor-pointer p-1">
                                                    <div className="h-4 w-4 bg-white rounded-full" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
