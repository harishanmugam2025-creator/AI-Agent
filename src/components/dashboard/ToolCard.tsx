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
    color?: 'blue' | 'purple' | 'emerald' | 'amber' | 'rose' | 'indigo' | 'cyan' | 'orange'
}

const colorMap = {
    blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white border-blue-100",
    purple: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white border-purple-100",
    emerald: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white border-emerald-100",
    amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white border-amber-100",
    rose: "bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white border-rose-100",
    indigo: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white border-indigo-100",
    cyan: "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white border-cyan-100",
    orange: "bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white border-orange-100",
}

const hoverBorderMap = {
    blue: "group-hover:border-blue-200",
    purple: "group-hover:border-purple-200",
    emerald: "group-hover:border-emerald-200",
    amber: "group-hover:border-amber-200",
    rose: "group-hover:border-rose-200",
    indigo: "group-hover:border-indigo-200",
    cyan: "group-hover:border-cyan-200",
    orange: "group-hover:border-orange-200",
}

const textMap = {
    blue: "group-hover:text-blue-600",
    purple: "group-hover:text-purple-600",
    emerald: "group-hover:text-emerald-600",
    amber: "group-hover:text-amber-600",
    rose: "group-hover:text-rose-600",
    indigo: "group-hover:text-indigo-600",
    cyan: "group-hover:text-cyan-600",
    orange: "group-hover:text-orange-600",
}

export function ToolCard({ title, description, icon: Icon, href, className, color = 'blue' }: ToolCardProps) {
    return (
        <Link href={href} className="group">
            <Card className={cn(
                "h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-slate-200 overflow-hidden transform",
                hoverBorderMap[color],
                className
            )}>
                <CardHeader className="space-y-0.5 pb-2.5 pt-4 px-4">
                    <div className="flex items-center justify-between">
                        <div className={cn(
                            "p-2 rounded-xl border transition-all duration-300 shadow-sm",
                            colorMap[color]
                        )}>
                            <Icon className="h-4 w-4" />
                        </div>
                    </div>
                    <CardTitle className={cn(
                        "text-base font-bold pt-2 transition-colors",
                        textMap[color]
                    )}>{title}</CardTitle>
                    <CardDescription className="line-clamp-2 text-[13px] text-slate-500 font-medium leading-tight">{description}</CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-4">
                    <div className={cn(
                        "flex items-center text-[12px] font-bold opacity-80 transition-all group-hover:opacity-100",
                        textMap[color]
                    )}>
                        Launch Tool
                        <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
