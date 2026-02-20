'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/layout/Sidebar'
import { Navbar } from '@/components/layout/Navbar'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { History as HistoryIcon, Search, Calendar, Trash2, ExternalLink } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { format } from 'date-fns'
import Link from 'next/link'

export default function HistoryPage() {
    const [generations, setGenerations] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const { user } = useSelector((state: RootState) => state.auth)

    const fetchHistory = async () => {
        if (!user) return
        setLoading(true)
        const { data, error } = await supabase
            .from('generations')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })

        if (error) {
            toast.error('Failed to fetch history')
        } else {
            setGenerations(data || [])
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchHistory()
    }, [user])

    const handleDelete = async (id: string) => {
        const { error } = await supabase
            .from('generations')
            .delete()
            .eq('id', id)

        if (error) {
            toast.error('Failed to delete record')
        } else {
            setGenerations(prev => prev.filter(g => g.id !== id))
            toast.success('Record deleted')
        }
    }

    const filteredGenerations = generations.filter(g =>
        g.tool_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (typeof g.output === 'string' && g.output.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-slate-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-6xl mx-auto space-y-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">Generation History</h1>
                                <p className="text-slate-500 mt-1 font-medium">Review and manage your previous AI interactions.</p>
                            </div>
                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search history..."
                                    className="pl-9 bg-white dark:bg-slate-900"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3].map(i => (
                                    <Skeleton key={i} className="h-48 w-full rounded-2xl" />
                                ))}
                            </div>
                        ) : filteredGenerations.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredGenerations.map((gen) => (
                                    <Card key={gen.id} className="group hover:shadow-lg transition-all border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                                        <CardHeader className="pb-3 border-b bg-slate-50/50 dark:bg-slate-800/50">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded">
                                                    {gen.tool_name.replace('-', ' ')}
                                                </span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-slate-400 hover:text-red-500"
                                                    onClick={() => handleDelete(gen.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <CardTitle className="text-sm flex items-center gap-1.5 mt-2 text-slate-500">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {format(new Date(gen.created_at), 'MMM d, h:mm a')}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="pt-4">
                                            <div className="line-clamp-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                                                {gen.output}
                                            </div>
                                            <Link href={`/tools/${gen.tool_name}`}>
                                                <Button variant="link" className="px-0 mt-4 text-primary h-auto flex items-center gap-1 text-xs">
                                                    Reuse Tool <ExternalLink className="h-3 w-3" />
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                                <HistoryIcon className="h-12 w-12 mx-auto text-slate-300 mb-4" />
                                <h3 className="text-lg font-bold">No history found</h3>
                                <p className="text-slate-500 max-w-xs mx-auto mt-2">
                                    When you generate content using our AI agents, they will appear here.
                                </p>
                                <Link href="/dashboard">
                                    <Button className="mt-6">Try an AI Tool</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}
