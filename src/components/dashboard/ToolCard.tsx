import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ToolCardProps {
    title: string
    description: string
    icon: LucideIcon
    href: string
    className?: string
}

export function ToolCard({ title, description, icon: Icon, href, className }: ToolCardProps) {
    return (
        <Link href={href} className="group">
            <Card className={cn(
                "h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-slate-200 overflow-hidden transform group-hover:border-primary/50",
                className
            )}>
                <CardHeader className="space-y-1 pb-4">
                    <div className="flex items-center justify-between">
                        <div className="p-2.5 rounded-xl bg-slate-50 group-hover:bg-primary/10 transition-colors duration-300">
                            <Icon className="h-6 w-6 text-slate-600 group-hover:text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-xl font-bold pt-3 group-hover:text-primary transition-colors">{title}</CardTitle>
                    <CardDescription className="line-clamp-2 text-slate-500">{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center text-sm font-semibold text-primary/80 group-hover:text-primary transition-colors">
                        Launch Tool
                        <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
