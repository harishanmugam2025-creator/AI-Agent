'use client'

import { Check, Zap, Sparkles, Shield, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Sidebar } from '@/components/layout/Sidebar'
import { Navbar } from '@/components/layout/Navbar'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { loadStripe } from '@stripe/stripe-js'

const plans = [
    {
        name: 'Free',
        price: '$0',
        description: 'Perfect for small personal tasks.',
        features: ['10 AI Generations / mo', '8+ Basic AI Agents', 'Standard Support', 'Standard Speed'],
        buttonText: 'Current Plan',
        popular: false,
        color: 'slate'
    },
    {
        name: 'Pro',
        price: '$19',
        description: 'For power users and professionals.',
        features: ['Unlimited Generations', 'Advanced Agent Access', 'Priority Support', 'Turbo Speed', 'Generation History', 'API Access'],
        buttonText: 'Upgrade to Pro',
        popular: true,
        color: 'indigo'
    },
    {
        name: 'Enterprise',
        price: '$49',
        description: 'Custom solutions for teams.',
        features: ['Everything in Pro', 'Custom AI Training', 'Team Management', 'Dedicated Support', 'White-labeling'],
        buttonText: 'Contact Sales',
        popular: false,
        color: 'sky'
    }
]

export default function PricingPage() {
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null)

    const handleUpgrade = async (planName: string) => {
        if (planName === 'Free' || planName === 'Enterprise') return

        setLoadingPlan(planName)
        toast.info('Redirecting to Stripe Checkout...')

        // Simulate Stripe Checkout redirect
        setTimeout(() => {
            setLoadingPlan(null)
            toast.success('Subscription successful! (Mock Mode)')
        }, 2000)
    }

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden text-slate-900 dark:text-slate-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-[1600px] mx-auto space-y-10">
                        <div className="text-center space-y-2">
                            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                                <Rocket className="h-3.5 w-3.5" /> Simple Pricing
                            </div>
                            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">
                                Unlock the Full Power of AI
                            </h1>
                            <p className="text-sm text-slate-500 max-w-xl mx-auto font-medium">
                                Choose the plan that fits your needs. Scale your productivity with unlimited access to specialized agents.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                            {plans.map((plan) => (
                                <Card
                                    key={plan.name}
                                    className={cn(
                                        "relative flex flex-col transition-all duration-300 hover:shadow-xl",
                                        plan.popular ? "border-primary shadow-md z-10" : "border-slate-200 dark:border-slate-800"
                                    )}
                                >
                                    {plan.popular && (
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-md">
                                            Most Popular
                                        </div>
                                    )}
                                    <CardHeader className="py-4 px-5">
                                        <CardTitle className="text-base font-bold">{plan.name}</CardTitle>
                                        <div className="flex items-baseline gap-1 mt-2">
                                            <span className="text-2xl font-black">{plan.price}</span>
                                            <span className="text-slate-500 text-xs font-medium">/month</span>
                                        </div>
                                        <p className="text-slate-500 text-xs mt-1">{plan.description}</p>
                                    </CardHeader>
                                    <CardContent className="flex-1 py-2 px-5 space-y-3">
                                        <div className="space-y-2">
                                            {plan.features.map((feature) => (
                                                <div key={feature} className="flex items-center gap-2.5">
                                                    <div className="h-4 w-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                                                        <Check className="h-2.5 w-2.5 text-green-600 dark:text-green-400" />
                                                    </div>
                                                    <span className="text-[13px] font-medium text-slate-600 dark:text-slate-400">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="py-4 px-5">
                                        <Button
                                            onClick={() => handleUpgrade(plan.name)}
                                            disabled={loadingPlan !== null || plan.name === 'Free'}
                                            variant={plan.popular ? "default" : "outline"}
                                            className={cn(
                                                "w-full h-10 font-bold text-sm shadow-sm transition-all",
                                                plan.name === 'Free' && "opacity-50 cursor-default"
                                            )}
                                        >
                                            {loadingPlan === plan.name ? 'Processing...' : plan.buttonText}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center bg-white dark:bg-slate-900 py-8 px-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 max-w-2xl mx-auto">
                            <div className="flex justify-center -space-x-3">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="h-10 w-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 flex items-center justify-center overflow-hidden">
                                        <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm font-bold">Joined by over 10,000+ professionals worldwide</p>
                            <div className="flex items-center justify-center gap-1 text-yellow-500">
                                {[1, 2, 3, 4, 5].map(i => <Sparkles key={i} className="h-3 w-3 fill-current" />)}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
