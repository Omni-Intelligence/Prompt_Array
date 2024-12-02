-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Templates are viewable by all authenticated users" ON public.prompts;
DROP POLICY IF EXISTS "Users can view their own prompts" ON public.prompts;

-- Create policy for viewing prompts
CREATE POLICY "Public prompts and user's own prompts are viewable"
  ON public.prompts
  FOR SELECT
  USING (
    is_public = true -- All public prompts
    OR user_id = auth.uid() -- User's own prompts
    OR (
      group_id IN ( -- Prompts in groups the user is a member of
        SELECT group_id 
        FROM public.group_members 
        WHERE user_id = auth.uid()
      )
    )
  );
