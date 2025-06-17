CREATE TABLE public.ai_insights (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text,
    content text,
    generated_at timestamp with time zone DEFAULT now(),
    status text DEFAULT 'unread'
);

ALTER TABLE public.ai_insights ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.ai_insights FOR SELECT USING (true); 