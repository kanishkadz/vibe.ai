# Vibe.AI: Open-Source AI-Powered Full-Stack Web Development

Vibe.AI is an open-source AI-powered web development agent that allows you to prompt, run, edit, and deploy full-stack applications directly from your browser—no local setup required.


## What Makes Vibe.AI Different

While tools like Claude and v0 are impressive, they can't install packages, run backends, or edit code. Vibe.AI stands out because:

1. *Completely Open-Source*: Unlike proprietary alternatives, Vibe.AI's entire codebase is open for inspection and contribution.
   
2. *Future-Open WebContainer Tech*: We're actively working to open-source our WebContainer implementation (currently using StackBlitz's proprietary version as a foundation).

3. *Full-Stack in the Browser*:
   - Install and run npm tools/libraries (Vite, Next.js, etc.)
   - Execute Node.js servers
   - Interact with third-party APIs
   - Deploy to production from chat
   - Share projects via URL

4. *AI with Environment Control*:
   - Full filesystem access
   - Node server management
   - Package manager integration
   - Terminal/browser console access

## Getting Started

```bash
# Clone the repository
git clone https://github.com/vibe-ai/vibe.ai.git

# Install dependencies
cd vibe.ai
npm install

# Start the development server
npm run dev
