'use client'

import { Sidebar } from '@/components/layout/Sidebar'
import { Navbar } from '@/components/layout/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { HelpCircle, ChevronDown, BookOpen, MessageSquare, CreditCard, Shield } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const helpContent = [
    {
        category: 'Getting Started',
        icon: BookOpen,
        items: [
            { question: 'How do I use AI Agents?', answer: 'Navigate to the Dashboard, select a tool, fill in the required inputs, and click "Generate Results". The AI will process your request and provide a professional output.' },
            { question: 'What are specialized agents?', answer: 'Specialized agents are AI tools fine-tuned for specific tasks like writing emails, planning meals, or generating creative business names.' },
        ]
    },
    {
        category: 'Account & Billing',
        icon: CreditCard,
        items: [
            { question: 'How do I upgrade my plan?', answer: 'Visit the Pricing page and click "Upgrade to Pro". You will be redirected to our secure checkout process.' },
            { question: 'Can I cancel my subscription?', answer: 'Yes, you can manage and cancel your subscription anytime from the Settings > Subscription section.' },
        ]
    },
    {
        category: 'Security & Privacy',
        icon: Shield,
        items: [
            { question: 'Is my data secure?', answer: 'We take privacy seriously. Your generations are stored securely with Supabase and are only accessible by you.' },
            { question: 'How do I reset my password?', answer: 'Go to Settings > Password & Security to change your password while logged in, or use the "Forgot Password" link on the login page.' },
        ]
    }
]

export default function HelpPage() {
    const [openIndex, setOpenIndex] = useState<string | null>(null)

    const toggleAccordion = (id: string) => {
        setOpenIndex(openIndex === id ? null : id)
    }

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-slate-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-[1400px] mx-auto space-y-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
                            <div className="space-y-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                                    <HelpCircle className="h-3 w-3" /> Support Center
                                </div>
                                <h1 className="text-3xl font-black tracking-tight uppercase">Help & Support</h1>
                                <p className="text-sm text-slate-500 font-medium">Find answers and get the most out of NeuroBox AI.</p>
                            </div>
                            <Button className="font-bold gap-2 h-12 px-8 rounded-2xl shadow-xl shadow-primary/20">
                                <MessageSquare className="h-4 w-4" /> Contact Support
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {helpContent.map((section, sIdx) => (
                                <div key={section.category} className="space-y-4">
                                    <div className="flex items-center gap-3 text-slate-400 group">
                                        <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm group-hover:text-primary transition-colors">
                                            <section.icon className="h-4 w-4" />
                                        </div>
                                        <h2 className="text-xs font-black uppercase tracking-[0.15em]">{section.category}</h2>
                                    </div>
                                    <div className="space-y-2.5">
                                        {section.items.map((item, iIdx) => {
                                            const id = `${sIdx}-${iIdx}`
                                            const isOpen = openIndex === id
                                            return (
                                                <div
                                                    key={id}
                                                    className={cn(
                                                        "group overflow-hidden border rounded-3xl transition-all duration-300",
                                                        isOpen
                                                            ? "border-primary bg-white dark:bg-slate-900 shadow-lg shadow-primary/5"
                                                            : "border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700"
                                                    )}
                                                >
                                                    <button
                                                        onClick={() => toggleAccordion(id)}
                                                        className="w-full text-left p-4 md:p-5 flex items-center justify-between gap-4"
                                                    >
                                                        <span className={cn("text-sm font-bold transition-colors", isOpen ? "text-primary" : "text-slate-700 dark:text-slate-300")}>
                                                            {item.question}
                                                        </span>
                                                        <div className={cn(
                                                            "h-8 w-8 rounded-xl flex items-center justify-center transition-all",
                                                            isOpen ? "bg-primary text-white rotate-180" : "bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-slate-200"
                                                        )}>
                                                            <ChevronDown className="h-4 w-4" />
                                                        </div>
                                                    </button>
                                                    <div className={cn(
                                                        "grid transition-all duration-300 ease-in-out",
                                                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                                    )}>
                                                        <div className="overflow-hidden">
                                                            <div className="p-5 pt-0 text-sm text-slate-500 font-medium leading-relaxed">
                                                                <div className="h-px w-full bg-slate-100 dark:bg-slate-800 mb-5" />
                                                                {item.answer}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-slate-900 rounded-[40px] p-8 md:p-12 text-white overflow-hidden relative border border-white/10">
                            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/20 to-transparent pointer-events-none" />
                            <div className="relative z-10 max-w-2xl space-y-6">
                                <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                    <HelpCircle className="h-6 w-6 text-primary" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-black tracking-tight">Still have questions?</h3>
                                    <p className="text-slate-400 text-lg font-medium leading-relaxed">
                                        Our world-class support team is here to help you scaling your business with NeuroBox AI.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Live Support Active</span>
                                    </div>
                                    <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                                        <MessageSquare className="h-4 w-4 text-primary" />
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-300">avg. response: 5 mins</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
