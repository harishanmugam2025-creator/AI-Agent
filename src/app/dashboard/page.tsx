'use client'

import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { ToolCard } from '@/components/dashboard/ToolCard'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import {
    Utensils,
    FileText,
    Mail,
    Linkedin,
    Palette,
    Briefcase,
    BookOpen,
    GraduationCap,
    Sparkles,
    SearchX
} from 'lucide-react'

const tools = [
    {
        title: 'AI Meal Planner',
        description: 'Custom weekly meal plans based on your diet and goals.',
        icon: Utensils,
        href: '/tools/meal-planner',
        color: 'emerald' as const,
    },
    {
        title: 'AI Blog Title',
        description: 'Generate viral, SEO-friendly blog titles in seconds.',
        icon: FileText,
        href: '/tools/blog-title',
        color: 'blue' as const,
    },
    {
        title: 'AI Email Reply',
        description: 'Smart, professional email replies based on context.',
        icon: Mail,
        href: '/tools/email-reply',
        color: 'purple' as const,
    },
    {
        title: 'AI LinkedIn Post',
        description: 'Expert-level LinkedIn content that drives engagement.',
        icon: Linkedin,
        href: '/tools/linkedin-post',
        color: 'indigo' as const,
    },
    {
        title: 'AI Logo Idea',
        description: 'Brand-focused logo concepts and visual descriptions.',
        icon: Palette,
        href: '/tools/logo-generator',
        color: 'rose' as const,
    },
    {
        title: 'AI Business Name',
        description: 'Creative and available business name ideas.',
        icon: Briefcase,
        href: '/tools/business-name',
        color: 'orange' as const,
    },
    {
        title: 'AI Story Generator',
        description: 'Captivating short stories and plot points.',
        icon: BookOpen,
        href: '/tools/story-generator',
        color: 'amber' as const,
    },
    {
        title: 'AI Homework Helper',
        description: 'Simplified explanations for complex academic topics.',
        icon: GraduationCap,
        href: '/tools/homework-helper',
        color: 'cyan' as const,
    },
]

function DashboardContent() {
    const searchParams = useSearchParams()
    const rawQuery = searchParams.get('q') || ''
    const query = rawQuery.toLowerCase().trim()

    // Simple fuzzy search helper: checks if all characters of query appear in text in order
    const fuzzyMatch = (text: string, search: string) => {
        let textIdx = 0;
        let searchIdx = 0;
        while (textIdx < text.length && searchIdx < search.length) {
            if (text[textIdx] === search[searchIdx]) {
                searchIdx++;
            }
            textIdx++;
        }
        return searchIdx === search.length;
    }

    const filteredTools = query
        ? tools.filter(t =>
            t.title.toLowerCase().includes(query) ||
            t.description.toLowerCase().includes(query) ||
            fuzzyMatch(t.title.toLowerCase(), query) ||
            fuzzyMatch(t.description.toLowerCase(), query)
        )
        : tools

    return (
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-[1600px] mx-auto space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">
                            <Sparkles className="h-4 w-4" /> Professional AI Workspace
                        </div>
                        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                            AI Agents Dashboard
                        </h1>
                        <p className="text-base text-slate-500 max-w-2xl font-medium">
                            {query
                                ? <>Showing results for <span className="text-primary font-bold">"{rawQuery}"</span> — {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} found</>
                                : 'Select a specialized AI agent below to augment your productivity. Every tool is optimized with enterprise-grade prompt engineering.'
                            }
                        </p>
                    </div>
                </div>

                {filteredTools.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                        {filteredTools.map((tool) => (
                            <ToolCard key={tool.href} {...tool} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center text-slate-400 gap-4">
                        <SearchX className="h-14 w-14 opacity-20" />
                        <div>
                            <h3 className="text-lg font-bold mb-1">No tools found</h3>
                            <p className="text-sm">Try a different search term like "email", "blog", or "story".</p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}

export default function DashboardPage() {
    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <Suspense fallback={<main className="flex-1 overflow-y-auto p-4 md:p-6">Loading dashboard...</main>}>
                    <DashboardContent />
                </Suspense>
            </div>
        </div>
    )
}
