export const prompts = {
    'meal-planner': (inputs: any) => ({
        system: 'You are a certified nutritionist.',
        user: `Create a custom weekly meal plan based on these inputs: ${JSON.stringify(inputs)}. Format it beautifully with sections for Breakfast, Lunch, and Dinner.`,
    }),
    'blog-title': (inputs: any) => ({
        system: 'You are an SEO expert and copywriter.',
        user: `Generate 10 viral, SEO-friendly blog titles for this topic: ${inputs.topic}. Target audience: ${inputs.audience}.`,
    }),
    'email-reply': (inputs: any) => ({
        system: 'You are a professional business communicator.',
        user: `Draft a professional email reply to the following message: "${inputs.message}". Tone: ${inputs.tone}.`,
    }),
    'linkedin-post': (inputs: any) => ({
        system: 'You are a social media growth expert for LinkedIn.',
        user: `Write a compelling LinkedIn post about: ${inputs.topic}. Use a hook, value-driven content, and a call to action. Tone: ${inputs.tone}.`,
    }),
    'logo-generator': (inputs: any) => ({
        system: 'You are a brand identity designer.',
        user: `Provide 5 unique logo concepts for a company named: ${inputs.companyName}. Industry: ${inputs.industry}. Describe the visual elements, colors, and typography for each concept.`,
    }),
    'business-name': (inputs: any) => ({
        system: 'You are a branding specialist.',
        user: `Generate 20 creative and catchy business names for: ${inputs.description}. Keywords to include: ${inputs.keywords}.`,
    }),
    'story-generator': (inputs: any) => ({
        system: 'You are a creative fiction writer.',
        user: `Write a short story (or a detailed plot outline) based on: Genre: ${inputs.genre}, Theme: ${inputs.theme}, Character: ${inputs.character}.`,
    }),
    'homework-helper': (inputs: any) => ({
        system: 'You are a patient and knowledgeable tutor.',
        user: `Explain this topic in simple terms (explain like I'm 12): ${inputs.topic}. Key points to cover: ${inputs.points}.`,
    }),
}
