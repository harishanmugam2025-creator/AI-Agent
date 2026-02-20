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

        let output = ''

        // Standardized high-quality simulation logic for all 8 tool cards
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('your-openai') || process.env.OPENAI_API_KEY.trim() === '') {
            const lowerMsg = (inputs.message || inputs.topic || inputs.description || inputs.points || inputs.emailContent || '').toLowerCase()

            // Strict whole-word matching for leave/vacation/off/permission (including common typos)
            const isLeaveMail = tool === 'email-reply' && /\b(leave|vacat|off|permis|late|perm|permisison)\b/i.test(lowerMsg)

            const toolTemplates: Record<string, string> = {
                'email-reply': isLeaveMail ?
                    `Subject: Permission Request - ${inputs.tone || 'Professional'} Draft

Dear [Manager's Name],

I hope you are doing well.

I am writing to request a short permission today. Regarding my earlier message: "${lowerMsg.length > 60 ? lowerMsg.substring(0, 60) + '...' : lowerMsg}".

I will ensure that all my current responsibilities are managed and will coordinate with the team accordingly.

Thank you for your understanding.

Best regards,
[Your Name]` :
                    `Subject: Re: [Contextual Reply]

Dear [Name],

Thank you for your message. Regarding the points you mentioned: "${lowerMsg.length > 50 ? lowerMsg.substring(0, 50) + '...' : lowerMsg}".

I have reviewed this and would like to suggest we move forward as discussed. Let's touch base soon to finalize the next steps.

Best regards,
[Your Name]`,

                'meal-planner':
                    `### 🥗 7-Day Healthy Meal Plan: ${inputs.diet || 'Balanced'}

**Monday:** Quinoa Salad with Roasted Chickpeas and Lemon Tahini.
**Tuesday:** Lemon Garlic Grilled Salmon with Asparagus and Brown Rice.
**Wednesday:** Veggie & Tofu Stir-fry with Soba Noodles.
**Thursday:** Mediterranean Chickpea Wraps with Hummus and Feta.
**Friday:** Baked Cod with Steamed Broccoli and Quinoa.
**Saturday:** Sweet Potato and Black Bean Tacos with Avocado.
**Sunday:** Roasted Vegetable Medley with Herb-Crusted Chicken.

**Health Goal:** ${inputs.goals || 'General Fitness'}
**Preferences:** ${inputs.preferences || 'Natural ingredients'}`,

                'blog-title':
                    `### 🚀 Viral SEO Titles for: "${inputs.topic || 'Innovation'}"

1. **The Future of ${inputs.topic || 'Innovation'}**: 7 Trends You Can't Ignore in 2024
2. **Why ${inputs.topic || 'Innovation'} is the Secret Weapon** of Highly Productive Professionals
3. **10 Proven Strategies** to Master ${inputs.topic || 'Innovation'} Starting Today
4. **The Truth About ${inputs.topic || 'Innovation'}**: What the Experts Won't Tell You
5. **From Beginner to Pro**: The Ultimate Guide to Navigating ${inputs.topic || 'Innovation'}

**Target Audience**: ${inputs.audience || 'Professionals'}`,

                'linkedin-post':
                    `📱 **Optimized LinkedIn Content**

Excited to share some thoughts on **${inputs.topic || 'the future of work'}**! 🚀 

In today's fast-paced environment, staying ahead of the curve is more important than ever. By focusing on quality and innovation, we can drive meaningful change in our industries.

Key takeaway: Consistency is the bridge between goals and accomplishment.

#AI #Innovation #Productivity #NeuroBox #Leadership`,

                'logo-generator':
                    `🎨 **Logo Design Concepts for: ${inputs.companyName || 'Your Brand'}**

**Concept 1: Modern Minimalist**
- **Symbol**: A clean, geometric icon representing growth.
- **Typography**: Sleek, sans-serif font in bold.
- **Colors**: Deep navy and minimalist silver.

**Concept 2: Dynamic & Creative**
- **Symbol**: An abstract 'fluid' shape representing innovation.
- **Typography**: Modern rounded typeface.
- **Colors**: Vibrant gradient of turquoise and amethyst.

**Industry Focus**: ${inputs.industry || 'General'}`,

                'business-name':
                    `💡 **Premium Business Name Ideas for: "${inputs.description}"**

1. **EverPeak** Solutions
2. **NovaFlow** Systems
3. **Lumina** Brand Co.
4. **VantEdge** Group
5. **Zenith** Creative Hub

**Keywords focused**: ${inputs.keywords || 'modern, premium'}`,

                'story-generator':
                    `📖 **The Echo of ${inputs.theme || 'Destiny'}**

Once upon a time, in a world where ${inputs.theme || 'hope was a rare commodity'}, there lived a character known as ${inputs.character || 'The Seeker'}. They resided in the heart of ${inputs.genre === 'Adventure in forest' ? 'a whispering emerald forest' : 'their homeland'}, surrounded by trees that seemed to breathe with the ancient rhythm of the earth.

In the genre of ${inputs.genre || 'Epic Fantasy'}, their journey began when a mysterious message arrived from the distant mountains. "The era of silence is ending," it read. The message was etched onto a leaf of silver, glowing with an ethereal light that pulsed in sync with ${inputs.character || 'The Seeker'}'s heartbeat.

Determined to uncover the truth, they packed a small satchel and stepped into the unknown. Every step they took resounded with the weight of ancient prophecies. The wind carried whispers of forgotten kings and the shadows of dragons long since departed. 

As they neared the peak of the Silent Mountain, the air grew thin and cold. Suddenly, a figure appeared from the mist—a guardian of the old ways. "Only those with a heart of true purpose may pass," the guardian intoned. With a firm nod, ${inputs.character || 'The Seeker'} stepped forward, ready to face whatever trials awaited them.

The journey was not just about the destination, but about the transformation within. By the time they reached the summit, they were no longer just a seeker, but a hero of legend.`,
                'homework-helper':
                    `📚 **Detailed Explanation: ${inputs.topic || 'Advanced Concepts'}**

**Core Concept**: ${inputs.topic || 'This subject'} is fundamental to understanding our modern systems. Think of it as the framework upon which more complex logic is built.

**Specific Points Analysis**:
Regarding "${inputs.points || 'the specific details'}": It is essential to focus on the primary drivers first. For example, in competitive systems, the most efficient model usually prevails.

**Key Takeaway**: Don't get overwhelmed by the complexity; start with the core principles!`
            }

            const helperQuestion = (inputs.question || '').toLowerCase()
            let helperOutput = ''

            if (helperQuestion.includes('what is neurobox')) {
                helperOutput = "NeuroBox is an all-in-one AI workspace designed to boost your productivity. We provide specialized agents for writing, coding, planning, and creative tasks, all within a single unified interface."
            } else if (helperQuestion.includes('pricing') || helperQuestion.includes('cost') || helperQuestion.includes('plan')) {
                helperOutput = "NeuroBox offers flexible plans to suit your needs: a Free plan for individuals, a Pro plan at $19/mo for power users, and an Enterprise plan for teams. You can view all details on our Pricing page."
            } else if (helperQuestion.includes('history') || helperQuestion.includes('save') || helperQuestion.includes('find')) {
                helperOutput = "Your generations are automatically saved to your History. You can access them anytime from the sidebar to review, copy, or reuse your previous AI outputs."
            } else {
                helperOutput = "I'm here to help you get the most out of NeuroBox! You can use our specialized tools like the Email Reply assistant, Meal Planner, or Story Generator to automate your daily tasks. Feel free to ask me anything about how the platform works."
            }

            output = tool === 'helper' ? helperOutput : (toolTemplates[tool] || `### Professional ${tool.replace('-', ' ')} Result\n\nBased on your input, here is a professional draft optimized for clarity.`)

            // Add a small artificial delay to simulate network/generation time
            await new Promise(resolve => setTimeout(resolve, 1500))
        } else {
            // We have an API key, try the real OpenAI call
            const response = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: system },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.7,
            })
            output = response.choices[0].message.content || 'No content generated.'
        }

        // Save to database (Note: ensure you have run SUPABASE_SETUP.sql)
        await supabase
            .from('generations')
            .insert({
                user_id: userId,
                tool_name: tool,
                input: inputs,
                output: output,
            })

        return NextResponse.json({ result: output })
    } catch (error: any) {
        console.error('AI generation error:', error)
        return NextResponse.json({ error: error.message || 'Failed to generate response' }, { status: 500 })
    }
}
