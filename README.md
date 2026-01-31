<div align="center">
<p align="center">
  <img src="https://github.com/user-attachments/assets/1c3934fd-1dec-4516-90f7-267288f52805" alt="AnswerGit" />
</p>

# AnswerGit 🤖

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

🚀 **AI-Powered GitHub Repository Explorer** | Understand any codebase instantly with AI-driven insights

**Analyze any public GitHub repository with AI assistance - no cloning required!**

[Features](#-features) • [Quick Start](#-quick-start) • [Installation](#-installation) • [Troubleshooting](#-troubleshooting) • [Documentation](#-documentation)

---

### ✨ What's New in This Version

- 🔄 **Smart Caching System**: Redis with automatic file-based fallback (no configuration required!)
- ⚡ **Enhanced Timeout Handling**: Increased timeout limits for large repositories
- 🛡️ **Production Ready**: Graceful error handling and automatic recovery
- 📚 **Comprehensive Documentation**: Detailed guides for setup, troubleshooting, and deployment
- 🎯 **Optimized Git Operations**: Better handling of large repositories and slow networks

</div>

## 🌟 Features

### Core Features
- 🤖 **AI-Powered Analysis**: Leverages Google's Gemini AI to provide intelligent insights about any repository
- 💬 **Interactive Chat**: Ask questions about the codebase and get detailed, context-aware responses
- 📁 **Smart File Explorer**: Navigate through repository files with syntax highlighting and code preview
- 🔍 **Deep Code Understanding**: Get explanations for functions, dependencies, architecture, and more
- 📊 **Repository Summary**: Automatic analysis of structure, technologies, and key components

### Technical Features
- ⚡ **Smart Caching**: Automatic Redis/file-based caching for instant re-analysis
- 🔄 **Real-time Updates**: Instant responses as you explore repositories
- 🛡️ **Robust Error Handling**: Graceful fallbacks and automatic recovery
- 🎨 **Modern UI**: Beautiful dark-mode interface built with TailwindCSS and shadcn/ui
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🐳 **Docker Support**: Easy deployment with Docker

### Developer Experience
- 🚀 **One-Command Start**: Launch both services with a single script
- 📚 **Comprehensive Docs**: Detailed guides for setup, troubleshooting, and deployment
- 🔧 **Flexible Configuration**: Easy customization of AI models, timeouts, and caching
- 🆓 **Free Tier Friendly**: Works great with free tiers of GitHub and Gemini APIs

<h2>🎬 Watch AnswerGit Demo</h2>

https://github.com/user-attachments/assets/e975a943-e512-445a-8b40-8061b18a9b16

<video>
  <source src='./public/answergit-demo.mp4' type='video/mp4'>
  Your browser does not support the video tag.
</video>

## ⚡ Quick Start

**Get up and running in 3 steps:**

```bash
# 1. Clone and install
git clone https://github.com/Puranjaysalaria/Repogitanswer.git
cd Repogitanswer
pnpm install

# 2. Create .env.local with your API keys
# GEMINI_API_KEY=your_gemini_api_key
# GITHUB_TOKEN=your_github_token
# GITINGEST_API_URL=http://localhost:8000

# 3. Start both services (Windows)
start.bat
# Or manually in two terminals:
# Terminal 1: cd gitingest-api && python main.py
# Terminal 2: pnpm dev
```

**Open http://localhost:3000** and start exploring repositories! 🎉

> 💡 **First time?** Try analyzing `octocat/Hello-World` to test your setup!

---

## 🚀 Installation

### Prerequisites
- **Node.js** 16+ (with npm/pnpm/yarn)
- **Python** 3.8+ (with pip)
- **Git** installed and in PATH
- **Internet connection** for cloning repositories

### Step-by-Step Setup

#### 1. Clone the repository
```bash
git clone https://github.com/Puranjaysalaria/Repogitanswer.git
cd Repogitanswer
```

#### 2. Install dependencies

**Node.js dependencies:**
```bash
pnpm install  # Recommended
# OR
npm install
# OR
yarn install
```

**Python dependencies (for GitIngest API):**
```bash
cd gitingest-api
pip install -r requirements.txt
cd ..
```

**Docker alternative:**
```bash
docker build -t answergit .
```

#### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Required: Google Gemini API Key (get from https://aistudio.google.com/app/apikey)
GEMINI_API_KEY=your_gemini_api_key

# Required: GitHub Personal Access Token (get from https://github.com/settings/tokens)
GITHUB_TOKEN=your_github_token

# Required: GitIngest API URL (local Python service)
GITINGEST_API_URL=http://localhost:8000

# Optional: Redis URL (leave empty to use file-based cache)
REDIS_URL=
```

> 📝 **Note:** The `.env.local` file is already in `.gitignore` - your keys are safe!

### 🔑 Getting Your API Keys

#### **GitHub Personal Access Token**
1. Go to [GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give your token a descriptive name (e.g., "AnswerGit")
4. Set expiration (recommended: 90 days or custom)
5. Select scopes:
   - ✅ `public_repo` (access public repositories)
   - ✅ `read:user` (read user profile data)
6. Click **"Generate token"**
7. **Copy the token immediately** (you won't see it again!)
8. Paste it in your `.env.local` file

**Important Notes:**
- ✅ **Any GitHub Account**: You can use a token from ANY GitHub account you own
- ✅ **Safe**: Read-only access, cannot modify your repositories
- ✅ **Private**: Only stored locally in your `.env.local` file
- 📊 **Rate Limits**:
  - **With token**: 5,000 requests/hour
  - **Without token**: 60 requests/hour
- 🔒 **Security**: Never commit `.env.local` to git (already in `.gitignore`)
- 💡 **Tip**: The token works for analyzing ANY public repository on GitHub, not just your own repos

#### **Google Gemini API Key**
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click **"Create API Key"**
3. Select a Google Cloud project (or create new)
4. Copy the API key
5. Paste it in your `.env.local` file

**Gemini Free Tier Limits:**
- 15 requests per minute
- 1,500 requests per day
- Free forever for `gemini-flash` models

## 🔧 Configuration

The project uses several key dependencies:

- **Next.js** for the framework
- **React** for the UI
- **TailwindCSS** for styling
- **Google Generative AI** for AI features
- **GitHub API** for repository interaction

Customize the application by modifying:
- `tailwind.config.ts` for styling
- `components.json` for UI component settings
- `app/globals.css` for global styles



## 🚀 Usage

### Starting the Application

#### Option 1: One-Command Start (Recommended) 🎯
```bash
# Windows:
start.bat

# Or PowerShell:
.\start.ps1
```
This automatically starts both the GitIngest API and Next.js dev server!

#### Option 2: Manual Start (Two Terminals)

**Terminal 1 - GitIngest API (Required):**
```bash
cd gitingest-api
python main.py
# ✅ Wait for: "Uvicorn running on http://0.0.0.0:8000"
```

**Terminal 2 - Next.js App:**
```bash
pnpm dev
# OR: npm run dev
# OR: yarn dev
# ✅ Wait for: "ready - started server on 0.0.0.0:3000"
```

#### Option 3: Docker
```bash
docker run -p 3000:3000 answergit
```

> ⚠️ **Important:** You need BOTH services running (GitIngest API + Next.js)!

### Using the Application

**1. Open your browser**
```
http://localhost:3000
```

> 💡 **Tip:** Start with small repositories like `octocat/Hello-World` to test your setup!

![image](https://github.com/user-attachments/assets/6e9e1904-5449-49c7-9c7c-57efa01da11c)


3. **Enter a GitHub repository**
Enter the username and repository name to start exploring

![image](https://github.com/user-attachments/assets/52b02578-5d88-452a-b722-f7cd867bf9b0)


## 💡 Key Features Usage

### AI Assistant
Use the AI assistant to:
- Analyze code structure
- Understand dependencies
- Get code explanations
- Generate test suggestions

<img width="1919" height="1073" alt="image" src="https://github.com/user-attachments/assets/88603130-6b83-4962-81cd-976287bb0f2f" />


### File Explorer
- Navigate through repository files
- View file contents
- Get AI-powered insights for specific files

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/d8fc6049-e7c1-4c79-8b78-2d3ef0a63af8" />

---

## 📚 Documentation

Detailed guides available:

- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Complete troubleshooting guide for all common issues
- **[REDIS-SETUP.md](REDIS-SETUP.md)** - Optional Redis setup for production (not needed for local dev)
- **[CACHE-COMPARISON.md](CACHE-COMPARISON.md)** - File cache vs Redis comparison and performance
- **[SETUP-SUMMARY.md](SETUP-SUMMARY.md)** - Complete setup explanation and system architecture

---

## 🐛 Troubleshooting

### Quick Fixes

<details>
<summary><b>❌ "Repository analysis fails / timeouts"</b></summary>

**Causes:**
- Repository is too large
- Slow internet connection
- GitIngest API not running

**Solutions:**
1. Ensure GitIngest API is running: `cd gitingest-api && python main.py`
2. Check `.env.local` has `GITINGEST_API_URL=http://localhost:8000`
3. Try a smaller repo first: `octocat/Hello-World`
4. Check internet connection (repos are downloaded temporarily)
5. For large repos, wait up to 5 minutes for initial analysis

</details>

<details>
<summary><b>⚠️ "Redis cache warnings"</b></summary>

**Status:** ✅ Safe to ignore!

**Explanation:** Redis is optional. The app automatically uses file-based cache when Redis isn't configured. No action needed!

</details>

<details>
<summary><b>💾 "Does it use my laptop's storage?"</b></summary>

**Answer:** Yes, temporarily.

- **Location:** `C:\Users\YourName\AppData\Local\Temp\gitingest\`
- **Duration:** Only during analysis (auto-deleted after)
- **Size:** Depends on repository (few MB to 100+ MB)
- **Cache:** Small JSON files in `./cache/` folder (permanent but tiny)

</details>

<details>
<summary><b>🚫 "JavaScript heap out of memory"</b></summary>

**Cause:** Repository is too large for Node.js default memory.

**Solution:**
```bash
# Increase Node.js memory limit
set NODE_OPTIONS=--max-old-space-size=4096
pnpm dev
```

</details>

### 📖 Full Troubleshooting Guide

**See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for:**
- Detailed error explanations
- Step-by-step debugging
- Performance optimization
- Deployment issues
- Complete setup verification

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. 🐛 **Report bugs** - Open an issue with detailed reproduction steps
2. 💡 **Suggest features** - Share your ideas for improvements
3. 🔧 **Submit PRs** - Fix bugs or add features
4. 📚 **Improve docs** - Help make the documentation better
5. ⭐ **Star the repo** - Show your support!

**Development Setup:**
```bash
# Fork the repo, clone your fork, then:
git checkout -b feature/your-feature-name
# Make your changes
git commit -m "Add some feature"
git push origin feature/your-feature-name
# Open a Pull Request!
```

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

Free to use, modify, and distribute! 🎉

## 🙏 Acknowledgments

### Built With
- 🚀 [Next.js](https://nextjs.org/) - React framework
- ⚛️ [React](https://reactjs.org/) - UI library
- 🎨 [TailwindCSS](https://tailwindcss.com/) - Styling
- 🧩 [shadcn/ui](https://ui.shadcn.com/) - UI components
- 🤖 [Google Gemini](https://deepmind.google/technologies/gemini/) - AI model
- 📦 [GitIngest](https://gitingest.com/) - Repository ingestion
- 🐙 [GitHub API](https://docs.github.com/en/rest) - Repository data

### Special Thanks
- Original project by [Puranjay Salaria](https://github.com/Puranjaysalaria/answergit)
- All contributors and users of this project

---

<div align="center">

### 🌟 Star this repo if you find it useful!

[![GitHub stars](https://img.shields.io/github/stars/Puranjaysalaria/Repogitanswer?style=social)](https://github.com/Puranjaysalaria/Repogitanswer)

Made with ❤️ | Enhanced version of [AnswerGit](https://github.com/Puranjaysalaria/answergit) by Puranjay Salaria

**[⬆ Back to Top](#answergit-)**

</div>
