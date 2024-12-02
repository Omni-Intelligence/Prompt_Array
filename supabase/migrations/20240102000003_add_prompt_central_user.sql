-- Create the Prompt Central user in auth.users
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin
)
VALUES (
  '00000000-0000-0000-0000-000000000000'::uuid,
  'e52e5b4a-00a3-4385-b315-00f0a8d3e000'::uuid, -- Fixed UUID for Prompt Central user
  'authenticated',
  'authenticated',
  'promptcentral@enterprisedna.co',
  crypt('REPLACE_WITH_SECURE_PASSWORD', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Prompt Central","avatar_url":"https://promptcentral.pro/logo.png"}',
  false
);

-- Update existing templates to be owned by Prompt Central user
UPDATE public.prompts
SET user_id = 'e52e5b4a-00a3-4385-b315-00f0a8d3e000'::uuid
WHERE is_template = true;
