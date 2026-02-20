'use client'

import { Button } from '@/components/ui/button'
import { Brain, Zap, Shield, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

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
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-center">

              {/* Left Content Column */}
              <div className="flex flex-col items-center lg:items-start space-y-8 text-center lg:text-left lg:col-span-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold shadow-sm mb-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Introducing Generation History </span>
                </div>
                <div className="space-y-6">
                  <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl text-slate-900 leading-tight">
                    Your complete AI <br className="hidden sm:block" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-tr from-primary via-blue-600 to-indigo-600 pb-2">
                      productivity suite.
                    </span>
                  </h1>
                  <p className="max-w-[600px] text-slate-500 md:text-xl font-medium leading-relaxed">
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
              </div>

              {/* Right Illustration Column */}
              <div className="hidden lg:flex lg:col-span-2 relative items-center justify-center">
                {/* Decorative glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-500/20 to-primary/20 blur-3xl rounded-full -z-10" />
                {/* Hero Image from Unsplash */}
                <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" alt="Hero illustration" width={600} height={600} className="rounded-lg shadow-lg" />

                {/* Abstract UI representation */}
                <div className="relative w-full aspect-square max-w-md">
                  {/* Floating Elements */}
                  <div className="absolute top-4 right-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100/50 w-48 float-animation pulse-glow cursor-default z-20">
                    <div className="flex gap-3 items-center mb-1">
                      <div className="p-2 bg-purple-100 rounded-lg"><Shield className="h-5 w-5 text-purple-600" /></div>
                      <div className="font-bold text-slate-800 text-sm">Security Guard</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Monitoring session...</div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-full animate-pulse" />
                      </div>
                      <div className="text-[9px] text-slate-400 font-medium">AES-256 Encryption active</div>
                    </div>
                  </div>

                  <div className="absolute bottom-10 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100/50 w-52 float-animation-delayed pulse-glow cursor-default z-20">
                    <div className="flex gap-3 items-center mb-1">
                      <div className="p-2 bg-emerald-100 rounded-lg"><Zap className="h-5 w-5 text-emerald-600" /></div>
                      <div className="font-bold text-slate-800 text-sm">Speed Optimizer</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Processing task...</div>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-2/3" />
                        </div>
                        <span className="text-[9px] font-black text-primary">67%</span>
                      </div>
                      <div className="text-[9px] text-slate-400 font-medium">Latency: &lt; 0.8s</div>
                    </div>
                  </div>

                  {/* Central Main Panel */}
                  <div className="absolute inset-8 bg-white/60 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white flex flex-col items-center justify-center overflow-hidden z-10 transition-transform duration-500 hover:scale-105 cursor-default">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5" />
                    <Brain className="h-16 w-16 text-primary mb-4" />
                    <p className="font-bold text-slate-800 text-lg">NeuroBox AI Hub</p>
                    <p className="text-sm font-medium text-slate-500 mt-1">Status: Active</p>
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
                {
                  quote: "NeuroBox completely changed how I write my weekly newsletters. The output is spot on every single time.",
                  author: "Sarah Jenkins",
                  role: "Content Marketer",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
                },
                {
                  quote: "I used to spend hours drafting project specs. Now the AI PM agent handles the heavy lifting in 30 seconds.",
                  author: "David Chen",
                  role: "Product Manager",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                },
                {
                  quote: "The most beautiful AI interface I've used. It's so much easier than managing huge prompt libraries.",
                  author: "Elena Rodriguez",
                  role: "Freelance Designer",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                }
              ].map((t, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                  <div className="relative w-16 h-16 mb-4">
                    <Image
                      src={t.image}
                      alt={t.author}
                      fill
                      className="rounded-full object-cover border-2 border-primary/10"
                    />
                  </div>
                  <div className="flex text-amber-400 mb-4 justify-center">
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
