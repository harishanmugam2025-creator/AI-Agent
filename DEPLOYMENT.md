# Production Deployment Guide: NeuroBox AI

Follow these steps to push your application to GitHub, set up Supabase Auth, and deploy to Vercel.

## 1. GitHub Setup
1. Create a new repository on [GitHub](https://github.com/new).
2. Initialize and push your code:
   ```bash
   git init
   git add .
   git commit -m "feat: complete enterprise AI platform with helper bot and history"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

## 2. Supabase Configuration
1. **Authentication**:
   - Go to **Authentication > Providers** and enable **Email**.
   - Ensure "Confirm Email" is disabled for easy testing (optional for prod).
2. **Database Schema**:
   - Go to **SQL Editor** and run the following to create the `generations` table:
     ```sql
     CREATE TABLE generations (
       id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
       user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
       tool_name TEXT NOT NULL,
       input JSONB NOT NULL,
       output TEXT NOT NULL,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
     );

     -- Enable RLS
     ALTER TABLE generations ENABLE ROW LEVEL SECURITY;

     -- Policy: Users can see their own generations
     CREATE POLICY "Users can view own generations" ON generations
     FOR SELECT USING (auth.uid() = user_id);

     -- Policy: Users can insert their own generations
     CREATE POLICY "Users can insert own generations" ON generations
     FOR INSERT WITH CHECK (auth.uid() = user_id);
     
     -- Policy: Users can delete their own generations
     CREATE POLICY "Users can delete own generations" ON generations
     FOR DELETE USING (auth.uid() = user_id);
     ```

## 3. Vercel Deployment
1. Import your GitHub repository to [Vercel](https://vercel.com/new).
2. Configure **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY`
3. Click **Deploy**.

## 4. Post-Deployment
- Update your Supabase Auth **Site URL** and **Redirect URIs** in **Authentication > URL Configuration** to your Vercel URL (e.g., `https://neurobox-ai.vercel.app`).
