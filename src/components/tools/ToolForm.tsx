'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { validations } from '@/lib/validations'
import { Zap, Sparkles } from 'lucide-react'

interface Field {
    name: string
    label: string
    type: 'text' | 'textarea'
    placeholder: string
}

interface ToolFormProps {
    toolId: string
    fields: Field[]
    onSubmit: (values: any) => Promise<void>
    isLoading: boolean
}

export function ToolForm({ toolId, fields, onSubmit, isLoading }: ToolFormProps) {
    const schema = (validations as any)[toolId]

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}),
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                    {fields.map((field) => (
                        <FormField
                            key={field.name}
                            control={form.control}
                            name={field.name}
                            render={({ field: formField }) => (
                                <FormItem>
                                    <FormLabel className="text-sm text-slate-700 font-semibold">{field.label}</FormLabel>
                                    <FormControl>
                                        {field.type === 'textarea' ? (
                                            <Textarea
                                                placeholder={field.placeholder}
                                                className="min-h-[120px] bg-slate-50 focus:bg-white resize-none"
                                                {...formField}
                                            />
                                        ) : (
                                            <Input
                                                placeholder={field.placeholder}
                                                className="h-11 bg-slate-50 focus:bg-white"
                                                {...formField}
                                            />
                                        )}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                </div>
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-11 text-base font-bold shadow-md hover:shadow-lg transition-all"
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <Zap className="h-5 w-5 animate-pulse" /> Generating...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5" /> Generate Results
                        </span>
                    )}
                </Button>
            </form>
        </Form>
    )
}
