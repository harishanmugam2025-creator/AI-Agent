'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { Navbar } from '@/components/layout/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HelpCircle } from 'lucide-react'

export default function HelpPage() {
    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="max-w-[1600px] mx-auto space-y-6">
                        <h1 className="text-xl font-bold">Help & Support</h1>
                        <Card>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="p-2 bg-slate-100 rounded-lg">
                                    <HelpCircle className="h-6 w-6 text-slate-600" />
                                </div>
                                <div>
                                    <CardTitle>How can we help?</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <p className="text-slate-600">
                                        Welcome to NeuroBox AI! Here are some common topics to help you get started:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2 text-sm text-slate-500">
                                        <li>How to use AI Agents</li>
                                        <li>Managing your generation history</li>
                                        <li>Configuring your account</li>
                                        <li>Understanding token usage</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    )
}
