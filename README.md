# Prompt Engineering Platform

A scalable platform for creating, managing, and sharing AI prompts with Supabase backend integration.

## Backend Setup with Supabase

### 1. Create Supabase Project
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project" and fill in your project details
3. Save your project URL and anon key for later use

### 2. Database Setup
Run these SQL commands in your Supabase SQL editor:

```sql
-- Users table is automatically created by Supabase Auth

-- Create prompts table
CREATE TABLE prompts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create chains table
CREATE TABLE chains (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create chain_prompts table for managing prompts within chains
CREATE TABLE chain_prompts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  chain_id UUID REFERENCES chains(id) ON DELETE CASCADE,
  prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create groups table
CREATE TABLE groups (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create group_prompts junction table
CREATE TABLE group_prompts (
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  PRIMARY KEY (group_id, prompt_id)
);

-- Create favorites table
CREATE TABLE favorites (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt_id UUID REFERENCES prompts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  PRIMARY KEY (user_id, prompt_id)
);
```

### 3. Row Level Security (RLS)
Enable RLS and set up policies for each table:

```sql
-- Enable RLS
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE chains ENABLE ROW LEVEL SECURITY;
ALTER TABLE chain_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Prompts policies
CREATE POLICY "Users can view their own prompts"
  ON prompts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own prompts"
  ON prompts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own prompts"
  ON prompts FOR UPDATE
  USING (auth.uid() = user_id);

-- Similar policies for other tables...
```

### 4. Environment Setup
Create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 5. Authentication Setup
1. Go to Authentication > Settings in Supabase Dashboard
2. Configure Site URL (your frontend URL)
3. Enable the authentication providers you want to use
4. Set up email templates if using email authentication

## Frontend Setup

1. Clone the repository
```bash
git clone <your-repo-url>
cd prompt-engineering-platform
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

## Production Deployment

1. Build the frontend
```bash
npm run build
```

2. Deploy the built files to your hosting service (Vercel, Netlify, etc.)
3. Set up environment variables in your hosting platform
4. Update Supabase authentication settings with production URLs

## Additional Documentation
- [Backend Architecture](./docs/backend/ARCHITECTURE.md)
- [API Documentation](./docs/backend/API.md)
- [Database Schema](./docs/backend/DATABASE.md)
- [Deployment Guide](./docs/backend/DEPLOYMENT.md)

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License
MIT License - see [LICENSE.md](LICENSE.md)