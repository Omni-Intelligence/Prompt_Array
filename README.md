# Prompt Array

<div align="center">
  <img src="public/logo.svg" alt="Prompt Array Logo" width="200"/>
  <h3>🚀 The Modern Platform for AI Prompt Engineering</h3>
  <p>Create, manage, and share your AI prompts with version control and real-time collaboration.</p>

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
  [![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/EDNAHQ/Prompt_Array/issues)
  
</div>

## 🌟 Why Prompt Array?

Prompt Array is not just another prompt management tool - it's a complete platform for prompt engineering excellence:

- 📝 **Version Control**: Track every change in your prompts with detailed history
- 🤝 **Real-time Collaboration**: Work together with your team in real-time
- 🔍 **Smart Organization**: Use tags, groups, and powerful search to find prompts instantly
- 🎯 **Templates**: Start with proven templates or create your own
- 🔒 **Security First**: Enterprise-grade security with fine-grained access control
- 🌙 **Dark Mode**: Beautiful dark theme support for comfortable viewing

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/EDNAHQ/Prompt_Array.git

# Navigate to project directory
cd Prompt_Array

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
```

## 🎓 Educational Resources

### Step-by-Step Tutorials
1. [Building the Chrome Extension](docs/tutorials/chrome-extension.md)
2. [Setting up Supabase Authentication](docs/tutorials/auth-setup.md)
3. [API Documentation](docs/backend/API.md)
4. [Database Schema and RLS Policies](docs/backend/DATABASE.md)

### Architecture Documentation
- [System Architecture](docs/backend/ARCHITECTURE.md)
- [Database Design](docs/backend/DATABASE.md)
- [Row Level Security](docs/backend/RLS_POLICIES.md)
- [Deployment Guide](docs/backend/DEPLOYMENT.md)

> 📝 **Note**: Additional documentation for Stripe payments, state management, and frontend architecture is currently being developed. We welcome contributions in these areas!

## 🛠️ Tech Stack

### Frontend
- ⚛️ React 18 with Vite
- 🎨 TailwindCSS & Shadcn/ui
- 🔄 React Query
- 🛣️ React Router

### Backend
- 🔥 Supabase
- 🔒 Row Level Security
- ⚡ Real-time subscriptions
- 🌐 Edge Functions

## 🤝 Contributing

We love your input! We want to make contributing to Prompt Array as easy and transparent as possible. Check out our [Contributing Guide](CONTRIBUTING.md) to get started.

### Ways to Contribute
- 🐛 Report bugs and issues
- 💡 Propose new features
- 📝 Improve documentation
- 🔧 Submit pull requests

## 🔑 Environment Setup

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update with your credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📦 Chrome Extension

Our Chrome Extension brings Prompt Array directly into your browser:

1. Build the extension:
```bash
cd chrome-extension
npm install
npm run build
```

2. Load in Chrome:
- Open `chrome://extensions/`
- Enable Developer mode
- Click "Load unpacked"
- Select the `chrome-extension/dist` directory

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=EDNAHQ/Prompt_Array&type=Date)](https://star-history.com/#EDNAHQ/Prompt_Array&Date)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all our [contributors](https://github.com/EDNAHQ/Prompt_Array/graphs/contributors)
- Built with [React](https://reactjs.org/), [Vite](https://vitejs.dev/), and [Supabase](https://supabase.io/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)

## 📞 Support

- 📧 Email: support@ednahq.com
- 💬 [Discord Community](https://discord.gg/your-discord)
- 🐦 [Twitter](https://twitter.com/your-twitter)

---

<div align="center">
  <sub>Built with ❤️ by the EDNA HQ team</sub>
</div>