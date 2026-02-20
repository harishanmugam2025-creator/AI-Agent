'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { ToolCard } from '@/components/dashboard/ToolCard'
import {
    Utensils,
    FileText,
    Mail,
    Linkedin,
    Palette,
    Briefcase,
    BookOpen,
    GraduationCap,
    Sparkles
} from 'lucide-react'

const tools = [
    {
        title: 'AI Meal Planner',
        description: 'Custom weekly meal plans based on your diet and goals.',
        icon: Utensils,
        href: '/tools/meal-planner',
    },
    {
        title: 'AI Blog Title',
        description: 'Generate viral, SEO-friendly blog titles in seconds.',
        icon: FileText,
        href: '/tools/blog-title',
    },
    {
        title: 'AI Email Reply',
        description: 'Smart, professional email replies based on context.',
        icon: Mail,
        href: '/tools/email-reply',
    },
    {
        title: 'AI LinkedIn Post',
        description: 'Expert-level LinkedIn content that drives engagement.',
        icon: Linkedin,
        href: '/tools/linkedin-post',
    },
    {
        title: 'AI Logo Idea',
        description: 'Brand-focused logo concepts and visual descriptions.',
        icon: Palette,
        href: '/tools/logo-generator',
    },
    {
        title: 'AI Business Name',
        description: 'Creative and available business name ideas.',
        icon: Briefcase,
        href: '/tools/business-name',
    },
    {
        title: 'AI Story Generator',
        description: 'Captivating short stories and plot points.',
        icon: BookOpen,
        href: '/tools/story-generator',
    },
    {
        title: 'AI Homework Helper',
        description: 'Simplified explanations for complex academic topics.',
        icon: GraduationCap,
        href: '/tools/homework-helper',
    },
]

export default function DashboardPage() {
    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-7xl mx-auto space-y-12">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">
                                    <Sparkles className="h-4 w-4" /> Professional AI Workspace
                                </div>
                                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                                    AI Agents Dashboard
                                </h1>
                                <p className="text-xl text-slate-500 max-w-2xl font-medium">
                                    Select a specialized AI agent below to augment your productivity.
                                    Every tool is optimized with enterprise-grade prompt engineering.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {tools.map((tool) => (
                                <ToolCard key={tool.href} {...tool} />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
