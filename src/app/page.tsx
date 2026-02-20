'use client'

import { Button } from '@/components/ui/button'
import { Brain, Zap, Shield, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-primary/20">
      {/* Header */}
      <header className="sticky top-0 z-50 px-4 md:px-8 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-md">
        <Link className="flex items-center space-x-2.5 transition-opacity hover:opacity-90" href="/">
          <div className="bg-gradient-to-br from-primary to-blue-600 p-1.5 rounded-xl shadow-sm">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            NeuroBox <span className="text-primary font-black">AI</span>
          </span>
        </Link>
        <nav className="flex items-center gap-3 sm:gap-6">
          <Link className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors" href="/login">
            Log in
          </Link>
          <Link href="/register">
            <Button className="rounded-full shadow-sm shadow-primary/20 hover:shadow-md transition-all font-bold px-6">
              Get Started
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 relative overflow-hidden">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0 bg-white">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div>
          <div className="absolute left-60 top-40 -z-10 h-[250px] w-[250px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>
        </div>

        <section className="relative z-10 w-full pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold shadow-sm mb-4">
                <Sparkles className="h-4 w-4" />
                <span>Introducing Generation History </span>
              </div>
              <div className="space-y-6 max-w-4xl mx-auto">
                <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl text-slate-900">
                  Your complete AI <br className="hidden sm:block" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-tr from-primary via-blue-600 to-indigo-600">
                    productivity suite.
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-500 md:text-xl font-medium leading-relaxed">
                  NeuroBox AI brings together specialized agents to help you write, design, plan, and learn faster than ever before. All in one beautifully simple workspace.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
                <Link href="/register" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 font-bold text-base rounded-full shadow-xl shadow-primary/25 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    Start for free <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 font-bold text-base rounded-full hover:bg-slate-50 transition-all duration-300">
                    View Demo
                  </Button>
                </Link>
              </div>

              {/* Dashboard Preview mockup */}
              <div className="w-full max-w-5xl mx-auto mt-16 lg:mt-24 p-2 md:p-4 rounded-[2rem] bg-white/50 backdrop-blur-xl border border-slate-200/50 shadow-2xl">
                <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-100 to-slate-50 opacity-80 z-0"></div>
                  <div className="z-10 text-center">
                    <Brain className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-400 font-bold text-lg">NeuroBox AI Workspace</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="relative z-10 w-full py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">Enterprise-grade intelligence, simplified.</h2>
              <p className="text-lg text-slate-500 font-medium">Everything you need to automate your daily workflows without the prompt engineering headache.</p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              {/* Feature 1 */}
              <div className="group flex flex-col space-y-4 p-8 rounded-3xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-xl transition-all duration-300 cursor-default">
                <div className="p-3 bg-blue-100 w-fit rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Lightning Fast</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    Powered by GPT-4o-mini for near-instant responses and unparalleled generation speed.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group flex flex-col space-y-4 p-8 rounded-3xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-xl transition-all duration-300 cursor-default">
                <div className="p-3 bg-emerald-100 w-fit rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">8+ Built-in Tools</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    From meal planning to social media strategy. Specialized agents for every task.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group flex flex-col space-y-4 p-8 rounded-3xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-xl transition-all duration-300 cursor-default">
                <div className="p-3 bg-purple-100 w-fit rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Secure Data</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    Your generations are private, encrypted, and securely stored with our Supabase backend.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="group flex flex-col space-y-4 p-8 rounded-3xl bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-xl transition-all duration-300 cursor-default">
                <div className="p-3 bg-orange-100 w-fit rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Expert Agents</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    Each tool is pre-tuned with specific domain expertise so you get pro results every time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center px-4 border-t bg-slate-50">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-slate-500">© 2026 NeuroBox AI. All rights reserved.</p>
          <nav className="flex gap-6">
            <Link className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors" href="#">
              Terms
            </Link>
            <Link className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors" href="#">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
