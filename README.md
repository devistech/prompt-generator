# PromptForge AI

Turn basic coding prompts into production-ready instructions using AI.

## Features

- AI-powered prompt optimization using Groq (Llama-3.3-70b)
- Clarification questions for ambiguous prompts
- Structured output with Role, Objective, Context, Requirements, Output Format, Constraints
- One-click copy functionality
- Dark-first glassmorphism design
- Free for all - no login, no storage

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Groq SDK

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Groq API key

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd promptforge-ai

# Install dependencies
npm install
```

### Environment Setup

1. Copy the example environment file:
```bash
cp .env.local.example .env.local
```

2. Add your Groq API key to `.env.local`:
```
GROQ_API_KEY=your_groq_api_key_here
```

Get your API key from [Groq Console](https://console.groq.com/keys)

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Netlify

1. Push your code to GitHub
2. Connect your GitHub repo to Netlify
3. Add the environment variable in Netlify dashboard:
   - Site settings > Environment variables
   - Add `GROQ_API_KEY` with your API key
4. Deploy!

### Vercel

```bash
npm install -g vercel
vercel
```

Add your `GROQ_API_KEY` in the Vercel dashboard.

## License

MIT
