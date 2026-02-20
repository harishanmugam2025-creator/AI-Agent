import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createClient(supabaseUrl, supabaseKey)

    // First, check if the table already exists by trying a simple query
    const { error: checkError } = await supabase
        .from('generations')
        .select('id')
        .limit(1)

    if (!checkError) {
        return NextResponse.json({ message: 'Table already exists', created: false })
    }

    // The table doesn't exist – try to create it via Supabase's rpc
    // Since the anon key can't run DDL, we'll use a workaround:
    // Return the SQL so the frontend can guide the user
    const sql = `
CREATE TABLE IF NOT EXISTS public.generations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    tool_name TEXT NOT NULL,
    input JSONB NOT NULL,
    output TEXT NOT NULL
);

ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own generations" 
ON public.generations FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own generations" 
ON public.generations FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own generations" 
ON public.generations FOR DELETE USING (auth.uid() = user_id);

GRANT ALL ON public.generations TO authenticated;
GRANT ALL ON public.generations TO service_role;
`

    return NextResponse.json({
        message: 'Table does not exist. Please run the SQL below in your Supabase SQL Editor.',
        created: false,
        tableExists: false,
        sql,
        sqlEditorUrl: `https://supabase.com/dashboard/project/brgerllbgweddtagdbhj/sql/new`
    })
}
