-- RUN THIS IN THE SUPABASE SQL EDITOR
-- Link: https://supabase.com/dashboard/project/brgerllbgweddtagdbhj/sql/new

-- 1. Create the generations table
CREATE TABLE IF NOT EXISTS public.generations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    tool_name TEXT NOT NULL,
    input JSONB NOT NULL,
    output TEXT NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;

-- 3. Create a policy to allow users to see ONLY their own history
CREATE POLICY "Users can view their own generations" 
ON public.generations 
FOR SELECT 
USING (auth.uid() = user_id);

-- 4. Create a policy to allow users to insert their own records
CREATE POLICY "Users can insert their own generations" 
ON public.generations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 5. Grant permissions to the service role and authenticated users
GRANT ALL ON public.generations TO authenticated;
GRANT ALL ON public.generations TO service_role;
