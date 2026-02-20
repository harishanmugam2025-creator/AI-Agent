import { openai } from '@/lib/openai'
import { supabase } from '@/lib/supabase'
import { prompts } from '@/lib/prompts'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { tool, inputs, userId } = await req.json()

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const toolPromptGenerator = (prompts as any)[tool]

        let system, userPrompt
        if (tool === 'helper') {
            system = 'You are the NeuroBox AI assistant. Help the user with platform questions or general AI advice briefly.'
            userPrompt = inputs.question
        } else if (toolPromptGenerator) {
            const generated = toolPromptGenerator(inputs)
            system = generated.system
            userPrompt = generated.user
        } else {
            return NextResponse.json({ error: 'Invalid tool' }, { status: 400 })
        }

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: system },
                { role: 'user', content: userPrompt }
            ],
            temperature: 0.7,
        })

        const output = response.choices[0].message.content

        // Save to database
        await supabase
            .from('generations')
            .insert({
                user_id: userId,
                tool_name: tool,
                input: inputs, // Now saving as JSON object as per enterprise spec
                output: output,
            })

        return NextResponse.json({ result: output })
    } catch (error: any) {
        console.error('AI generation error:', error)
        return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 })
    }
}
