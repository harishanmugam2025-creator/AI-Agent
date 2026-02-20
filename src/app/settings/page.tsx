'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Navbar } from '@/components/layout/Navbar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
    User,
    Lock,
    ShieldCheck,
    Bell,
    Palette,
    Cloud,
    Save,
    Upload,
    Mail,
    Globe,
    ExternalLink,
    Trash2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'billing', name: 'Billing', icon: ShieldCheck },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'integrations', name: 'Integrations', icon: Cloud },
]

export default function SettingsPage() {
    const { user } = useSelector((state: RootState) => state.auth)
    const [activeTab, setActiveTab] = useState('profile')
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    useEffect(() => {
        if (user) {
            setName(user.user_metadata?.full_name || '')
            setEmail(user.email || '')
            setAvatarUrl(user.user_metadata?.avatar_url || '')
        }
    }, [user])

    const handleUpdateProfile = async () => {
        setLoading(true)
        const { error } = await supabase.auth.updateUser({
            data: { full_name: name }
        })

        if (error) {
            toast.error(error.message)
        } else {
            toast.success('Profile updated successfully')
        }
        setLoading(false)
    }

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image file')
            return
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error('File size must be less than 2MB')
            return
        }

        setLoading(true)
        try {
            // Since we don't have Supabase Storage buckets set up, 
            // we'll convert to base64 for a persistent "simulation" in metadata
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = async () => {
                const base64 = reader.result as string
                const { error } = await supabase.auth.updateUser({
                    data: { avatar_url: base64 }
                })

                if (error) throw error
                setAvatarUrl(base64)
                toast.success('Profile photo updated')
            }
        } catch (error: any) {
            toast.error(error.message || 'Failed to upload photo')
        } finally {
            setLoading(false)
        }
    }

    const handleDeletePhoto = async () => {
        setLoading(true)
        const { error } = await supabase.auth.updateUser({
            data: { avatar_url: null }
        })

        if (error) {
            toast.error(error.message)
        } else {
            setAvatarUrl('')
            toast.success('Profile photo removed')
        }
        setLoading(false)
    }

    const handleUpdatePassword = async () => {
        if (!newPassword || !confirmPassword) {
            toast.error('Please fill in both password fields')
            return
        }

        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        if (newPassword.length < 6) {
            toast.error('Password must be at least 6 characters')
            return
        }

        setLoading(true)
        const { error } = await supabase.auth.updateUser({
            password: newPassword
        })

        if (error) {
            toast.error(error.message)
        } else {
            toast.success('Password updated successfully')
            setNewPassword('')
            setConfirmPassword('')
        }
        setLoading(false)
    }

    const billingHistory = [
        { id: 'inv_1', date: 'Feb 1, 2024', amount: '$19.00', status: 'Paid' },
        { id: 'inv_2', date: 'Jan 1, 2024', amount: '$19.00', status: 'Paid' },
        { id: 'inv_3', date: 'Dec 1, 2023', amount: '$19.00', status: 'Paid' },
    ]

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                            <div className="relative group">
                                <div className="h-24 w-24 rounded-[32px] bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold ring-4 ring-white dark:ring-slate-900 shadow-2xl overflow-hidden">
                                    {avatarUrl ? (
                                        <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                                    ) : (
                                        name.charAt(0) || user?.email?.charAt(0).toUpperCase()
                                    )}
                                </div>
                                <div className="absolute -bottom-2 -right-2 flex flex-col gap-2">
                                    <label className="p-2 bg-primary text-white rounded-2xl shadow-lg border-4 border-white dark:border-slate-900 hover:scale-110 transition-all cursor-pointer group-hover:rotate-6">
                                        <Upload className="h-4 w-4" />
                                        <input type="file" className="hidden" onChange={handlePhotoUpload} accept="image/*" />
                                    </label>
                                    {avatarUrl && (
                                        <button
                                            onClick={handleDeletePhoto}
                                            className="p-1.5 bg-rose-500 text-white rounded-xl shadow-lg border-2 border-white dark:border-slate-900 hover:scale-110 transition-all"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-black text-xl tracking-tight">Profile Photo</h3>
                                <p className="text-sm text-slate-500 font-semibold mt-1">Update your identity across NeuroBox.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="bg-slate-50 border-none dark:bg-slate-800"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</Label>
                                <Input
                                    id="email"
                                    value={email}
                                    disabled
                                    className="bg-slate-100 border-none dark:bg-slate-800/50 opacity-60"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button onClick={handleUpdateProfile} disabled={loading} className="gap-2 font-bold px-6">
                                <Save className="h-4 w-4" /> {loading ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </div>
                )
            case 'security':
                return (
                    <div className="space-y-6">
                        <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-100 dark:border-amber-900/30">
                            <h4 className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
                                <Lock className="h-4 w-4" /> Security Recommendations
                            </h4>
                            <p className="text-xs text-amber-600 dark:text-amber-500 mt-1 font-medium">Add a secondary email or phone number to your account to improve security.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">New Password</Label>
                                <Input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="bg-slate-50 border-none dark:bg-slate-800"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Confirm New Password</Label>
                                <Input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="bg-slate-50 border-none dark:bg-slate-800"
                                />
                            </div>
                            <Button onClick={handleUpdatePassword} disabled={loading} className="font-bold">
                                {loading ? 'Updating...' : 'Update Password'}
                            </Button>
                        </div>
                    </div>
                )
            case 'billing':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="bg-indigo-600 text-white border-none shadow-xl overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <ShieldCheck className="h-32 w-32" />
                                </div>
                                <CardContent className="p-6 relative z-10">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-widest opacity-80 decoration-indigo-300 underline underline-offset-4">Current Plan</p>
                                            <h3 className="text-3xl font-black mt-2">NeuroBox Pro</h3>
                                            <p className="text-sm mt-1 opacity-90 font-medium">Billed annually • $19/mo</p>
                                        </div>
                                        <div className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md border border-white/20">
                                            Active
                                        </div>
                                    </div>
                                    <div className="mt-8 flex gap-3">
                                        <Button variant="secondary" className="font-bold text-indigo-700 h-10 px-6">Manage</Button>
                                        <Button variant="ghost" className="text-white hover:bg-white/10 font-bold h-10">Cancel Subscription</Button>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                                <CardHeader className="p-6">
                                    <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                        <Cloud className="h-4 w-4" /> Usage Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 pt-0 space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold">
                                            <span>AI Generations</span>
                                            <span className="text-primary">128 / 1,000</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary w-[12.8%] rounded-full shadow-[0_0_10px_rgba(var(--primary),0.3)]" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold">
                                            <span>Storage</span>
                                            <span className="text-indigo-500">2.4 GB / 10 GB</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-500 w-[24%] rounded-full" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">Billing History</h3>
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                                        <tr>
                                            <th className="px-6 py-4 font-bold text-slate-500">Date</th>
                                            <th className="px-6 py-4 font-bold text-slate-500">Amount</th>
                                            <th className="px-6 py-4 font-bold text-slate-500">Status</th>
                                            <th className="px-6 py-4 font-bold text-slate-500 text-right">Invoice</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {billingHistory.map((inv) => (
                                            <tr key={inv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                                <td className="px-6 py-4 font-medium">{inv.date}</td>
                                                <td className="px-6 py-4 font-bold">{inv.amount}</td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 text-[10px] font-black uppercase tracking-wider">
                                                        <ShieldCheck className="h-3 w-3" /> {inv.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-primary">
                                                        <ExternalLink className="h-4 w-4" />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            case 'appearance':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800">
                                        <Palette className="h-5 w-5 text-slate-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm">Theme Preference</h4>
                                        <p className="text-xs text-slate-500 font-medium">Choose between light or dark interface.</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" className="font-bold text-xs h-8 px-4">Light</Button>
                                    <Button size="sm" className="font-bold text-xs h-8 px-4">Dark</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            default:
                return <div className="p-12 text-center text-slate-400 text-sm font-medium">Section coming soon...</div>
        }
    }

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-slate-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-[1600px] mx-auto">
                        <div className="mb-6">
                            <h1 className="text-xl font-bold tracking-tight">Settings</h1>
                            <p className="text-sm text-slate-500 mt-1 font-medium">Manage your personal preferences and account security.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
                            <div className="space-y-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all",
                                            activeTab === tab.id
                                                ? "bg-primary text-white shadow-lg shadow-primary/20 translate-x-1"
                                                : "text-slate-500 hover:bg-white dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100"
                                        )}
                                    >
                                        <tab.icon className="h-4.5 w-4.5" />
                                        {tab.name}
                                    </button>
                                ))}
                            </div>

                            <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm p-8 min-h-[500px]">
                                <div className="mb-8 flex items-center justify-between">
                                    <h2 className="text-lg font-black tracking-tight flex items-center gap-2 uppercase">
                                        {activeTab} Settings
                                    </h2>
                                    <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800 mx-6" />
                                </div>
                                {renderTabContent()}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
