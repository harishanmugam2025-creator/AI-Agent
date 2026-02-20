import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, FileText, Scale } from "lucide-react"

export default function TermsPage() {
    return (
        <div className="container max-w-4xl py-12 px-6">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4">
                    <Scale className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                    Terms of Service
                </h1>
                <p className="text-slate-500 dark:text-slate-400">Last updated: February 20, 2026</p>
            </div>

            <div className="space-y-8">
                <Card className="border-none shadow-sm bg-slate-50/50 dark:bg-slate-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            1. Acceptance of Terms
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        By accessing or using NeuroBox AI, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time, and your continued use of the service constitutes acceptance of those changes.
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-slate-50/50 dark:bg-slate-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                            2. Use of Service
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        NeuroBox AI provides AI-powered productivity tools. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree not to use the service for any illegal or unauthorized purpose.
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-slate-50/50 dark:bg-slate-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Scale className="h-5 w-5 text-primary" />
                            3. Limitation of Liability
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        NeuroBox AI is provided "as is" without any warranties. We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
                    </CardContent>
                </Card>

                <div className="text-center pt-8 border-t text-sm text-slate-500">
                    Questions about our Terms? Contact us at support@neurobox.ai
                </div>
            </div>
        </div>
    )
}
