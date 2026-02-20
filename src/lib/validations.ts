import * as z from 'zod'

export const mealPlannerSchema = z.object({
    diet: z.string().min(2, 'Diet type is required'),
    goals: z.string().min(2, 'Health goals are required'),
    preferences: z.string().optional(),
})

export const blogTitleSchema = z.object({
    topic: z.string().min(3, 'Topic is required'),
    audience: z.string().min(2, 'Target audience is required'),
})

export const emailReplySchema = z.object({
    message: z.string().min(10, 'Message is too short'),
    tone: z.string().min(2, 'Tone is required'),
})

export const linkedinPostSchema = z.object({
    topic: z.string().min(5, 'Topic is required'),
    tone: z.string().min(2, 'Tone is required'),
})

export const logoGeneratorSchema = z.object({
    companyName: z.string().min(2, 'Company name is required'),
    industry: z.string().min(2, 'Industry is required'),
})

export const businessNameSchema = z.object({
    description: z.string().min(10, 'Please provide a better description'),
    keywords: z.string().optional(),
})

export const storyGeneratorSchema = z.object({
    genre: z.string().min(2, 'Genre is required'),
    theme: z.string().min(2, 'Theme is required'),
    character: z.string().min(3, 'Character description is required'),
})

export const homeworkHelperSchema = z.object({
    topic: z.string().min(3, 'Topic is required'),
    points: z.string().min(5, 'Points are required'),
})

export const validations = {
    'meal-planner': mealPlannerSchema,
    'blog-title': blogTitleSchema,
    'email-reply': emailReplySchema,
    'linkedin-post': linkedinPostSchema,
    'logo-generator': logoGeneratorSchema,
    'business-name': businessNameSchema,
    'story-generator': storyGeneratorSchema,
    'homework-helper': homeworkHelperSchema,
}
