-- Create necessary tables first
create table if not exists public.groups (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    created_by uuid references auth.users(id) on delete cascade not null
);

create table if not exists public.group_members (
    id uuid primary key default uuid_generate_v4(),
    group_id uuid references public.groups(id) on delete cascade not null,
    user_id uuid references auth.users(id) on delete cascade not null,
    role text not null default 'member',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(group_id, user_id)
);

create table if not exists public.prompts (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    content text not null,
    description text,
    tags text[] default array[]::text[],
    is_public boolean default false,
    version integer default 1,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_id uuid references auth.users(id) on delete cascade not null,
    team_id uuid,
    group_id uuid references public.groups(id) on delete set null,
    is_template boolean default false,
    template_category text
);

create table if not exists public.prompt_versions (
    id uuid primary key default uuid_generate_v4(),
    prompt_id uuid references public.prompts(id) on delete cascade not null,
    version_number integer not null,
    title text not null,
    content text not null,
    description text,
    tags text[] default array[]::text[],
    change_description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    created_by uuid references auth.users(id) on delete cascade not null,
    unique(prompt_id, version_number)
);

-- Create function to handle user account deletion
create or replace function public.delete_user_account()
returns void
language plpgsql
security definer
as $$
begin
  -- Delete user's prompts
  delete from public.prompts
  where user_id = auth.uid();
  
  -- Delete user's templates
  delete from public.templates
  where created_by = auth.uid();
  
  -- Delete groups where user is the owner
  delete from public.groups
  where user_id = auth.uid();
end;
$$;

-- Create trigger to handle user profile updates
create or replace function public.handle_user_profile_update()
returns trigger
language plpgsql
security definer
as $$
begin
  -- Validate avatar URL (basic check)
  if new.raw_user_meta_data->>'avatar_url' is not null then
    if not (
      new.raw_user_meta_data->>'avatar_url' like 'http://%' or
      new.raw_user_meta_data->>'avatar_url' like 'https://%'
    ) then
      raise exception 'Invalid avatar URL format. Must start with http:// or https://';
    end if;
  end if;
  
  return new;
end;
$$;

create trigger on_auth_user_update
  before update on auth.users
  for each row
  execute function public.handle_user_profile_update();

-- Create storage bucket for avatars if it doesn't exist
do $$
begin
  if not exists (select from storage.buckets where id = 'avatars') then
    insert into storage.buckets (id, name, public)
    values ('avatars', 'avatars', true);
  end if;
end $$;

-- Set up storage policies for avatars
create policy if not exists "Avatar images are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy if not exists "Users can upload avatar images"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated'
  );

create policy if not exists "Users can update their own avatar images"
  on storage.objects for update
  using (
    bucket_id = 'avatars' AND
    auth.uid() = owner
  );

create policy if not exists "Users can delete their own avatar images"
  on storage.objects for delete
  using (
    bucket_id = 'avatars' AND
    auth.uid() = owner
  );

-- Update RLS policies for templates
create policy if not exists "Templates are viewable by all authenticated users"
  on public.templates
  for select
  using (
    is_public = true
    or created_by = auth.uid()
  );

create policy if not exists "Users can create templates"
  on public.templates
  for insert
  with check (
    auth.role() = 'authenticated'
  );

create policy if not exists "Users can update their own templates"
  on public.templates
  for update
  using (
    created_by = auth.uid()
  );

create policy if not exists "Users can delete their own templates"
  on public.templates
  for delete
  using (
    created_by = auth.uid()
  );

-- Enable Row Level Security if not already enabled
alter table public.templates enable row level security;
alter table public.prompts enable row level security;
alter table public.groups enable row level security;

-- Grant necessary permissions
grant usage on schema public to authenticated;
grant all on function public.delete_user_account to authenticated;
