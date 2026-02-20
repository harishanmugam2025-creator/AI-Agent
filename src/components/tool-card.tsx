import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface ToolCardProps {
    title: string
    description: string
    icon: LucideIcon
    href: string
    color: string
}

export function ToolCard({ title, description, icon: Icon, href, color }: ToolCardProps) {
    return (
        <Link href={href} className="group">
            <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-slate-200 overflow-hidden">
                <div className={`h-1 w-full ${color}`} />
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-between">
                        <div className={`p-2 rounded-lg bg-slate-100 group-hover:bg-white transition-colors duration-300`}>
                            <Icon className="h-6 w-6 text-slate-700" />
                        </div>
                    </div>
                    <CardTitle className="text-xl font-bold pt-2">{title}</CardTitle>
                    <CardDescription className="line-clamp-2">{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-xs font-semibold text-primary group-hover:underline">
                        Use Tool →
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
