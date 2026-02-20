'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Navbar } from '@/components/layout/Navbar'
import { Sidebar } from '@/components/layout/Sidebar'
import { ToolForm } from '@/components/tools/ToolForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import axios from 'axios'
import {
    ArrowLeft,
    Utensils,
    FileText,
    Mail,
    Linkedin,
    Palette,
    Briefcase,
    BookOpen,
    GraduationCap,
    Copy,
    Download,
    Sparkles
} from 'lucide-react'
import Link from 'next/link'

const toolConfigs: Record<string, any> = {
    'meal-planner': {
        title: 'AI Meal Planner',
        description: 'Custom weekly meal plans based on your diet and goals.',
        icon: Utensils,
        fields: [
            { name: 'diet', label: 'Diet Type', type: 'text', placeholder: 'e.g., Vegan, Keto, Paleo' },
            { name: 'goals', label: 'Health Goals', type: 'text', placeholder: 'e.g., Muscle gain, Weight loss' },
            { name: 'preferences', label: 'Preferences', type: 'textarea', placeholder: 'e.g., No cilantro, nut allergy' },
        ],
    },
    'blog-title': {
        title: 'AI Blog Title',
        description: 'Generate viral, SEO-friendly blog titles in seconds.',
        icon: FileText,
        fields: [
            { name: 'topic', label: 'Blog Topic', type: 'text', placeholder: 'e.g., Next.js 14, Remote Work' },
            { name: 'audience', label: 'Target Audience', type: 'text', placeholder: 'e.g., Web Developers' },
        ],
    },
    'email-reply': {
        title: 'AI Email Reply',
        description: 'Smart, professional email replies based on context.',
        icon: Mail,
        fields: [
            { name: 'message', label: 'Email Content', type: 'textarea', placeholder: 'Paste incoming email...' },
            { name: 'tone', label: 'Tone', type: 'text', placeholder: 'e.g., Professional, Friendly' },
        ],
    },
    'linkedin-post': {
        title: 'AI LinkedIn Post',
        description: 'Expert-level LinkedIn content that drives engagement.',
        icon: Linkedin,
        fields: [
            { name: 'topic', label: 'Topic', type: 'text', placeholder: 'e.g., Leadership, AI trends' },
            { name: 'tone', label: 'Tone', type: 'text', placeholder: 'e.g., Inspiring' },
        ],
    },
    'logo-generator': {
        title: 'AI Logo Idea',
        description: 'Brand-focused logo concepts and visual descriptions.',
        icon: Palette,
        fields: [
            { name: 'companyName', label: 'Company Name', type: 'text', placeholder: 'e.g., NeuroBox' },
            { name: 'industry', label: 'Industry', type: 'text', placeholder: 'e.g., Technology' },
        ],
    },
    'business-name': {
        title: 'AI Business Name',
        description: 'Creative and available business name ideas.',
        icon: Briefcase,
        fields: [
            { name: 'description', label: 'What do you do?', type: 'textarea', placeholder: 'Describe your business...' },
            { name: 'keywords', label: 'Keywords', type: 'text', placeholder: 'e.g., Cloud, Speed' },
        ],
    },
    'story-generator': {
        title: 'AI Story Generator',
        description: 'Captivating short stories and plot points.',
        icon: BookOpen,
        fields: [
            { name: 'genre', label: 'Genre', type: 'text', placeholder: 'e.g., Sci-Fi' },
            { name: 'theme', label: 'Theme', type: 'text', placeholder: 'e.g., Adventure' },
            { name: 'character', label: 'Character', type: 'text', placeholder: 'Describe the protagonist...' },
        ],
    },
    'homework-helper': {
        title: 'AI Homework Helper',
        description: 'Simplified explanations for complex academic topics.',
        icon: GraduationCap,
        fields: [
            { name: 'topic', label: 'Topic', type: 'text', placeholder: 'e.g., Photosynthesis' },
            { name: 'points', label: 'Specific Points', type: 'textarea', placeholder: 'What do you need help with?' },
        ],
    },
}

export default function DynamicToolPage() {
    const params = useParams()
    const toolId = params.tool as string
    const config = toolConfigs[toolId]
    const { user, loading: authLoading } = useSelector((state: RootState) => state.auth)
    const [result, setResult] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    if (!config) return <div>Tool not found</div>

    // Show loading skeleton while auth is initializing so we don't
    // prematurely show "Session expired" during session restoration
    if (authLoading) {
        return (
            <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Navbar />
                    <main className="flex-1 overflow-y-auto p-4 md:p-8">
                        <div className="max-w-[1600px] mx-auto space-y-6">
                            <Skeleton className="h-8 w-48" />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <Skeleton className="h-96 w-full rounded-2xl" />
                                <Skeleton className="h-96 w-full rounded-2xl" />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        )
    }

    const handleGenerate = async (values: any) => {
        setIsLoading(true)
        setResult(null)

        try {
            // Get the session directly from Supabase - more reliable than Redux state
            // which can be null due to hydration timing on page load/refresh
            const { data: { session } } = await (await import('@/lib/supabase')).supabase.auth.getSession()

            const resolvedUserId = session?.user?.id || user?.id

            if (!resolvedUserId) {
                toast.error('Please log in to use this tool.', {
                    action: { label: 'Login', onClick: () => window.location.href = '/login' }
                })
                setIsLoading(false)
                return
            }

            const response = await axios.post('/api/generate', {
                tool: toolId,
                inputs: values,
                userId: resolvedUserId,
            })
            setResult(response.data.result)
            toast.success('Generation complete!')
        } catch (error: any) {
            const message = error?.response?.data?.error || 'Failed to generate. Please try again.'
            toast.error(message)
        } finally {
            setIsLoading(false)
        }
    }

    const copyToClipboard = () => {
        if (result) {
            navigator.clipboard.writeText(result)
            toast.success('Copied to clipboard!')
        }
    }

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-[1600px] mx-auto">
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary mb-6 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Tools
                        </Link>

                        <div className="space-y-8">
                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                                <div className={cn(
                                    "p-4 rounded-2xl shadow-lg border transition-all duration-300",
                                    toolId === 'meal-planner' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                        toolId === 'blog-title' ? "bg-blue-50 text-blue-600 border-blue-100" :
                                            toolId === 'email-reply' ? "bg-purple-50 text-purple-600 border-purple-100" :
                                                toolId === 'linkedin-post' ? "bg-indigo-50 text-indigo-600 border-indigo-100" :
                                                    toolId === 'logo-generator' ? "bg-rose-50 text-rose-600 border-rose-100" :
                                                        toolId === 'business-name' ? "bg-orange-50 text-orange-600 border-orange-100" :
                                                            toolId === 'story-generator' ? "bg-amber-50 text-amber-600 border-amber-100" :
                                                                "bg-cyan-50 text-cyan-600 border-cyan-100"
                                )}>
                                    <config.icon className="h-8 w-8" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-extrabold tracking-tight">{config.title}</h1>
                                    <p className="text-sm text-slate-500 mt-1">{config.description}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                                {/* Form Section */}
                                <div>
                                    <Card className="border-slate-200">
                                        <CardHeader>
                                            <CardTitle className="text-base">Input Parameters</CardTitle>
                                            <CardDescription className="text-xs">Fill in the details for the AI agent</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <ToolForm
                                                toolId={toolId}
                                                fields={config.fields}
                                                onSubmit={handleGenerate}
                                                isLoading={isLoading}
                                            />
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Result Section */}
                                <div className="flex flex-col h-full min-h-[500px] lg:min-h-0">
                                    {(isLoading || result) ? (
                                        <Card className="border-slate-200 flex-1 flex flex-col overflow-hidden max-h-[600px]">
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b bg-slate-50 shrink-0">
                                                <CardTitle className="text-base">AI Response</CardTitle>
                                                {result && (
                                                    <div className="flex items-center gap-2">
                                                        <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                                                            <Copy className="h-4 w-4 mr-1" /> Copy
                                                        </Button>
                                                    </div>
                                                )}
                                            </CardHeader>
                                            <CardContent className="pt-6 flex-1 overflow-y-auto custom-scrollbar">
                                                {isLoading ? (
                                                    <div className="space-y-4">
                                                        <Skeleton className="h-4 w-full" />
                                                        <Skeleton className="h-4 w-[90%]" />
                                                        <Skeleton className="h-4 w-[95%]" />
                                                        <Skeleton className="h-4 w-[80%]" />
                                                    </div>
                                                ) : (
                                                    <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700 leading-relaxed font-medium">
                                                        {result}
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ) : (
                                        <div className="flex-1 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-12 text-center text-slate-400 min-h-[400px]">
                                            <Sparkles className="h-16 w-16 mb-4 opacity-10" />
                                            <h3 className="text-xl font-bold mb-2">Ready to Generate</h3>
                                            <p className="max-w-[250px]">Your results will appear here after you click generate.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
