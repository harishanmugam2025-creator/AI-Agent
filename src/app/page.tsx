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

        <section className="relative z-10 w-full pt-20 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold shadow-sm mb-2">
                <Sparkles className="h-4 w-4" />
                <span>Introducing Generation History </span>
              </div>
              <div className="space-y-6 max-w-4xl mx-auto">
                <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl text-slate-900 leading-tight">
                  Your complete AI <br className="hidden sm:block" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-tr from-primary via-blue-600 to-indigo-600 pb-2">
                    productivity suite.
                  </span>
                </h1>
                <p className="mx-auto max-w-[700px] text-slate-500 md:text-xl font-medium leading-relaxed">
                  NeuroBox AI brings together specialized agents to help you write, design, plan, and learn faster than ever before. Everything you need in one beautifully simple workspace.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto">
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
              <div className="w-full max-w-5xl mx-auto mt-12 p-2 md:p-4 rounded-[2rem] bg-white/50 backdrop-blur-xl border border-slate-200/50 shadow-2xl">
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

        {/* How it Works Section */}
        <section className="relative z-10 w-full py-16 bg-slate-50/50 border-y border-slate-200/50">
          <div className="container px-4 md:px-6 mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4">How NeuroBox AI Works</h2>
              <p className="text-lg text-slate-500 font-medium">Three simple steps to supercharge your workflow.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

              {[
                { step: "01", title: "Select an Agent", desc: "Choose from our library of specialized AI tools tuned for specific tasks." },
                { step: "02", title: "Provide Context", desc: "Fill in a simple, guided form with your specific requirements and goals." },
                { step: "03", title: "Get Results", desc: "Receive instant, high-quality outputs that you can copy, edit, and use." }
              ].map((item, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-2xl font-black text-primary mb-2">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="relative z-10 w-full py-16 lg:py-24 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">Enterprise-grade intelligence.</h2>
              <p className="text-lg text-slate-500 font-medium">Everything you need to automate your daily workflows.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              <div className="group flex flex-col space-y-3 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300">
                <div className="p-3 bg-blue-100 w-fit rounded-xl group-hover:scale-110 transition-transform duration-300 mb-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Lightning Fast</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">Powered by GPT-4o-mini for near-instant responses and unmatched generation speed.</p>
              </div>

              <div className="group flex flex-col space-y-3 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300">
                <div className="p-3 bg-emerald-100 w-fit rounded-xl group-hover:scale-110 transition-transform duration-300 mb-2">
                  <Sparkles className="h-5 w-5 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">8+ Built-in Tools</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">From meal planning to social media strategy. Specialized agents for every task.</p>
              </div>

              <div className="group flex flex-col space-y-3 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300">
                <div className="p-3 bg-purple-100 w-fit rounded-xl group-hover:scale-110 transition-transform duration-300 mb-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Secure Data</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">Your generations are private, encrypted, and securely stored with our Supabase backend.</p>
              </div>

              <div className="group flex flex-col space-y-3 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300">
                <div className="p-3 bg-orange-100 w-fit rounded-xl group-hover:scale-110 transition-transform duration-300 mb-2">
                  <Brain className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Expert Agents</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">Each tool is pre-tuned with specific domain expertise so you get pro results every time.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="relative z-10 w-full py-16 bg-slate-50 border-t border-slate-200/50">
          <div className="container px-4 md:px-6 mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4">Loved by professionals</h2>
              <p className="text-lg text-slate-500 font-medium">Join thousands of users who are saving hours every week.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { quote: "NeuroBox completely changed how I write my weekly newsletters. The output is spot on every single time.", author: "Sarah Jenkins", role: "Content Marketer" },
                { quote: "I used to spend hours drafting project specs. Now the AI PM agent handles the heavy lifting in 30 seconds.", author: "David Chen", role: "Product Manager" },
                { quote: "The most beautiful AI interface I've used. It's so much easier than managing huge prompt libraries.", author: "Elena Rodriguez", role: "Freelance Designer" }
              ].map((t, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex text-amber-400 mb-4">
                    {[...Array(5)].map((_, j) => <Sparkles key={j} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="text-slate-700 italic mb-6">"{t.quote}"</p>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{t.author}</p>
                    <p className="text-xs text-slate-500 font-medium">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="relative z-10 w-full py-20 bg-white border-t border-slate-200/50">
          <div className="container px-4 md:px-6 mx-auto text-center max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">Ready to work faster?</h2>
            <p className="text-xl text-slate-500 font-medium mb-10">Sign up today and get instant access to our complete suite of specialized AI agents. No credit card required.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto h-14 px-10 font-bold text-base rounded-full shadow-xl shadow-primary/25 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  Create your free account
                </Button>
              </Link>
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
