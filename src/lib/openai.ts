import OpenAI from 'openai'

let _openai: OpenAI | null = null

export function getOpenAI(): OpenAI {
    if (!_openai) {
        _openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        })
    }
    return _openai
}

// Keep backward compat export
export const openai = {
    chat: {
        completions: {
            create: (...args: Parameters<OpenAI['chat']['completions']['create']>) =>
                getOpenAI().chat.completions.create(...args),
        },
    },
} as OpenAI
