'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import axios from 'axios'
import { LucideIcon, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface ToolField {
    name: string
    label: string
    type: 'text' | 'textarea'
    placeholder: string
}

interface ToolPageProps {
    toolId: string
    title: string
    description: string
    icon: LucideIcon
    fields: ToolField[]
}

export function ToolPage({ toolId, title, description, icon: Icon, fields }: ToolPageProps) {
    const { user } = useSelector((state: RootState) => state.auth)
    const [formData, setFormData] = useState<Record<string, string>>({})
    const [result, setResult] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleGenerate = async () => {
        if (!user) {
            toast.error('You must be logged in to use this tool.')
            return
        }

        // Basic validation
        for (const field of fields) {
            if (!formData[field.name]) {
                toast.error(`${field.label} is required.`)
                return
            }
        }

        setIsLoading(true)
        setResult(null)

        try {
            const response = await axios.post('/api/generate', {
                tool: toolId,
                inputs: formData,
                userId: user.id,
            })

            setResult(response.data.result)
            toast.success('Generation complete!')
        } catch (error) {
            toast.error('Failed to generate. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="max-w-4xl mx-auto px-4 py-8">
                <Link
                    href="/dashboard"
                    className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
                </Link>

                <div className="grid grid-cols-1 gap-8">
                    <Card className="border-slate-200">
                        <CardHeader className="flex flex-row items-center space-x-4 pb-4 border-b">
                            <div className="p-3 bg-primary/10 rounded-xl">
                                <Icon className="h-8 w-8 text-primary" />
                            </div>
                            <div className="space-y-1">
                                <CardTitle className="text-2xl font-bold">{title}</CardTitle>
                                <CardDescription>{description}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-6">
                            <div className="grid grid-cols-1 gap-4">
                                {fields.map((field) => (
                                    <div key={field.name} className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">
                                            {field.label}
                                        </label>
                                        {field.type === 'textarea' ? (
                                            <textarea
                                                className="w-full min-h-[120px] rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                                placeholder={field.placeholder}
                                                value={formData[field.name] || ''}
                                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                            />
                                        ) : (
                                            <input
                                                className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                                type="text"
                                                placeholder={field.placeholder}
                                                value={formData[field.name] || ''}
                                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <Button
                                onClick={handleGenerate}
                                className="w-full h-12 font-bold text-lg"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Generating...' : 'Generate with AI'}
                            </Button>
                        </CardContent>
                    </Card>

                    {(isLoading || result) && (
                        <Card className="border-slate-200 overflow-hidden">
                            <CardHeader className="bg-slate-50 border-b">
                                <CardTitle className="text-lg">AI Result</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                {isLoading ? (
                                    <div className="space-y-4">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-[90%]" />
                                        <Skeleton className="h-4 w-[95%]" />
                                        <Skeleton className="h-4 w-[85%]" />
                                    </div>
                                ) : (
                                    <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700">
                                        {result}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    )
}
