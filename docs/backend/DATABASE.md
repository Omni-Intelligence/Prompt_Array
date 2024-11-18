# Database Schema

## Core Tables

1. **users**
   - Authentication details
   - Profile information
   - Preferences
   - Usage metrics

2. **prompts**
   ```sql
   CREATE TABLE IF NOT EXISTS prompts (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     title TEXT NOT NULL,
     content TEXT NOT NULL,
     description TEXT,
     tags TEXT[] DEFAULT '{}',
     is_public BOOLEAN DEFAULT false,
     team_id UUID REFERENCES teams(id),
     group_id UUID REFERENCES groups(id),
     version INTEGER DEFAULT 1,
     user_id UUID REFERENCES auth.users(id) NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
   );
   ```

3. **groups**
   ```sql
   CREATE TABLE IF NOT EXISTS groups (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     title TEXT NOT NULL,
     description TEXT,
     user_id UUID REFERENCES auth.users(id) NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
   );
   ```

4. **teams**
   ```sql
   CREATE TABLE IF NOT EXISTS teams (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     name TEXT NOT NULL,
     description TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
   );
   ```

## Optimization Strategies

1. **Indexing**
   - B-tree indexes for exact matches
   - GiST indexes for full-text search
   - Composite indexes for common queries

2. **Partitioning**
   - Time-based partitioning for logs
   - Hash partitioning for large tables
   - Range partitioning for historical data

3. **Backup and Recovery**
   - Point-in-time recovery
   - Continuous backup
   - Disaster recovery planning
