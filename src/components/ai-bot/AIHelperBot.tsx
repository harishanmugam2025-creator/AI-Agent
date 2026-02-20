'use client'

import { useState, useRef, useEffect } from 'react'
import {
    Bot,
    X,
    Send,
    MessageSquare,
    Minimize2,
    Sparkles,
    User
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

interface Message {
    role: 'user' | 'assistant'
    content: string
}

export function AIHelperBot() {
    const [isOpen, setIsOpen] = useState(false)
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hello! I am your NeuroBox assistant. How can I help you today?' }
    ])
    const [isLoading, setIsLoading] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)
    const { user } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = async () => {
        if (!input.trim() || isLoading) return

        const userMessage: Message = { role: 'user', content: input }
        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsLoading(true)

        try {
            // For the helper bot, we can use a simpler system prompt or a dedicated route
            // For now, let's use a simple one-off generation or simulated response
            // or we can reuse /api/generate with a special toolId 'helper'

            const response = await axios.post('/api/generate', {
                tool: 'helper',
                inputs: { question: input },
                userId: user?.id
            })

            setMessages(prev => [...prev, { role: 'assistant', content: response.data.result }])
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. Please try again later." }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                    >
                        <Button
                            onClick={() => setIsOpen(true)}
                            className="h-14 w-14 rounded-full shadow-2xl bg-primary hover:scale-110 transition-transform duration-300"
                        >
                            <Bot className="h-7 w-7 text-white" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ y: 20, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 20, opacity: 0, scale: 0.95 }}
                        className="w-[380px] h-[550px] shadow-2xl"
                    >
                        <Card className="h-full border-slate-200 dark:border-slate-800 flex flex-col bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
                            <CardHeader className="p-4 border-b bg-primary/5 dark:bg-primary/10 flex flex-row items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="bg-primary p-1.5 rounded-lg">
                                        <Bot className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base font-bold">NeuroBox Helper</CardTitle>
                                        <div className="flex items-center gap-1.5">
                                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Online</span>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                                    <X className="h-5 w-5" />
                                </Button>
                            </CardHeader>
                            <CardContent ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4">
                                {messages.map((msg, i) => (
                                    <div key={i} className={cn(
                                        "flex w-full",
                                        msg.role === 'user' ? "justify-end" : "justify-start"
                                    )}>
                                        <div className={cn(
                                            "max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed",
                                            msg.role === 'user'
                                                ? "bg-primary text-white rounded-tr-none shadow-md"
                                                : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none shadow-sm"
                                        )}>
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none animate-pulse">
                                            <div className="flex gap-1">
                                                <div className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                <div className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                                <div className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="p-4 border-t bg-slate-50/50 dark:bg-slate-900/50">
                                <form
                                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                    className="flex w-full items-center gap-2"
                                >
                                    <Input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Type a message..."
                                        className="flex-1 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                                    />
                                    <Button type="submit" size="icon" disabled={isLoading}>
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </form>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
