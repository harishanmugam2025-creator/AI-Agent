import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, Eye, ShieldAlert } from "lucide-react"

export default function PrivacyPage() {
    return (
        <div className="container max-w-4xl py-12 px-6">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4">
                    <Lock className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                    Privacy Policy
                </h1>
                <p className="text-slate-500 dark:text-slate-400">Last updated: February 20, 2026</p>
            </div>

            <div className="space-y-8">
                <Card className="border-none shadow-sm bg-slate-50/50 dark:bg-slate-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Eye className="h-5 w-5 text-primary" />
                            1. Data Collection
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        We collect information you provide directly to us when you create an account, use our AI tools, or communicate with us. This may include your name, email address, and any content you generate using our AI services.
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-slate-50/50 dark:bg-slate-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Lock className="h-5 w-5 text-primary" />
                            2. Data Security
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access. Your data is stored securely using industry-standard encryption and protocols.
                    </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-slate-50/50 dark:bg-slate-900/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShieldAlert className="h-5 w-5 text-primary" />
                            3. AI Processing
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Your inputs to our AI tools are processed to generate results. We do not use your private data to train large-scale public models without your explicit consent. Your generation history is private to your account.
                    </CardContent>
                </Card>

                <div className="text-center pt-8 border-t text-sm text-slate-500">
                    Privacy concerns? Reach out to privacy@neurobox.ai
                </div>
            </div>
        </div>
    )
}
