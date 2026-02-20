'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { Navbar } from '@/components/layout/Navbar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
    Settings,
    User,
    Lock,
    Bell,
    Palette,
    ShieldCheck,
    Database,
    Cloud,
    ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const settingsGroups = [
    {
        title: 'Account',
        items: [
            { name: 'Profile Information', icon: User, desc: 'Manage your name, email, and avatar' },
            { name: 'Password & Security', icon: Lock, desc: 'Change your password and enable 2FA' },
            { name: 'Subscription Plan', icon: ShieldCheck, desc: 'View and manage your current billing plan', badge: 'Pro' },
        ]
    },
    {
        title: 'Application',
        items: [
            { name: 'Notifications', icon: Bell, desc: 'Control which alerts you receive' },
            { name: 'Appearance', icon: Palette, desc: 'Switch between light, dark, and system themes' },
            { name: 'Data Management', icon: Database, desc: 'Export or delete your generation history' },
        ]
    },
    {
        title: 'Integration',
        items: [
            { name: 'Connected Accounts', icon: Cloud, desc: 'Manage links to GitHub, Google, etc.' },
        ]
    }
]

export default function SettingsPage() {
    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-slate-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="max-w-[1600px] mx-auto space-y-6">
                        <div>
                            <h1 className="text-xl font-bold tracking-tight">Settings</h1>
                            <p className="text-sm text-slate-500 mt-1 font-medium">Fine-tune your NeuroBox experience.</p>
                        </div>

                        <div className="space-y-6">
                            {settingsGroups.map((group) => (
                                <div key={group.title} className="space-y-3">
                                    <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">{group.title}</h2>
                                    <div className="grid grid-cols-1 gap-3">
                                        {group.items.map((item) => (
                                            <Card key={item.name} className="group cursor-pointer hover:border-primary/30 transition-all bg-white dark:bg-slate-900 shadow-sm hover:shadow-md">
                                                <CardContent className="p-4 flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                            <item.icon className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-bold text-slate-900 dark:text-slate-100">{item.name}</span>
                                                                {item.badge && <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">{item.badge}</Badge>}
                                                            </div>
                                                            <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-primary transition-colors" />
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 text-center text-xs text-slate-400 font-medium pb-6">
                            Version 1.0.4 (Enterprise) • Built with ❤️ for AI productivity
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
