# Prompt Central

<img src="public/logo.svg" alt="Prompt Central Logo" width="200"/>

A modern, collaborative platform for managing and sharing AI prompts. Built with React, Vite, and Supabase.

## Features

### 🎯 Core Features
- **Prompt Management**: Create, edit, and organize AI prompts with rich text support
- **Version Control**: Track changes with built-in version history for each prompt
- **Collaboration**: Share prompts with team members and the community
- **Groups & Tags**: Organize prompts into groups and add tags for easy discovery
- **Templates**: Access a curated library of prompt templates for various use cases

### 💫 Advanced Features
- **Real-time Updates**: Changes sync instantly across all users
- **Version History**: Track and restore previous versions of prompts
- **Smart Search**: Find prompts quickly with full-text search
- **Access Control**: Fine-grained permissions for teams and groups
- **Dark Mode**: Beautiful dark theme support

## Tech Stack

- **Frontend**:
  - React 18
  - Vite
  - TailwindCSS
  - Shadcn/ui
  - React Query
  - React Router

- **Backend**:
  - Supabase (PostgreSQL)
  - Row Level Security
  - Real-time subscriptions
  - Edge Functions

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase CLI

### Installation

1. Clone the repository:
```bash
git clone https://github.com/EDNAHQ/Prompt_Central.git
cd Prompt_Central
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update `.env` with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Start the development server:
```bash
npm run dev
```

### Database Setup

1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Initialize Supabase:
```bash
supabase init
```

3. Apply migrations:
```bash
supabase db push
```

## Project Structure

```
prompt-central/
├── src/
│   ├── components/     # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions and configurations
│   ├── pages/         # Page components
│   ├── services/      # API and service functions
│   └── styles/        # Global styles and Tailwind config
├── supabase/
│   └── migrations/    # Database migrations
├── public/           # Static assets
└── tests/           # Test files
```

## Key Components

### Prompt Management
- `CreatePromptSheet`: Modal for creating/editing prompts
- `PromptForm`: Form component for prompt details
- `PromptVersionHistory`: Version tracking interface

### Groups & Organization
- `GroupsList`: Display and manage prompt groups
- `GroupDetail`: Group details and member management
- `PromptTagsField`: Tag management interface

### Templates & Community
- `TemplatesList`: Browse template prompts
- `CommunityPrompts`: Discover shared prompts
- `PromptDetailCard`: Display prompt details

## Database Schema

### Core Tables
- `prompts`: Store prompt data and metadata
- `prompt_versions`: Version history for prompts
- `groups`: Organize prompts into collections
- `teams`: Team management and permissions

### Junction Tables
- `group_members`: Group membership
- `team_members`: Team membership
- `favorites`: User prompt favorites

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful commit messages

### Testing
- Write unit tests for utilities
- Add integration tests for key flows
- Test across different themes/modes

## Deployment

### Production Build
```bash
npm run build
```

### Supabase Deployment
```bash
supabase db push
```

## License

This project is proprietary and confidential. All rights reserved by EnterpriseDNA.

## Support

For support, please contact:
- Email: support@promptcentral.pro
- GitHub Issues: [Create an issue](https://github.com/EDNAHQ/Prompt_Central/issues)