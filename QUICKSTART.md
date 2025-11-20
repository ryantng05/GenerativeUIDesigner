# Quick Start Guide

Get up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure Environment

Create `.env.local` file:

```bash
# Copy the example file
cp .env.local.example .env.local
```

Then edit `.env.local` and add your OpenAI API key:

```env
OPENAI_API_KEY=sk-...your-key-here
OPENAI_MODEL=gpt-4o-mini
```

**Don't have an OpenAI API key?**
1. Go to https://platform.openai.com/
2. Sign up or log in
3. Navigate to API keys
4. Create a new secret key
5. Copy and paste it into `.env.local`

## Step 3: Start Development Server

```bash
npm run dev
```

## Step 4: Open Browser

Navigate to http://localhost:3000

## Step 5: Generate Your First Component

Try this prompt:
```
Clean finance dashboard with dark mode, cards, line chart, and keyboard navigation
```

## Troubleshooting

### Error: "OpenAI API key not configured"
- Make sure you created `.env.local` in the project root
- Verify your API key is correct
- Restart the dev server after adding the key

### Error: "Module not found"
- Run `npm install` again
- Delete `node_modules` and `.next` folders, then run `npm install`

### Preview not showing
- Check browser console for errors
- Ensure the generated code is valid React/JSX
- Try a different prompt

### Slow generation
- gpt-4o-mini is fast and cheap (recommended for MVP)
- For faster results, you can try gpt-3.5-turbo
- For better quality, try gpt-4o (slower, more expensive)

## Next Steps

- Read the full [README.md](README.md) for more details
- Customize the system prompt in `app/api/generate/route.ts`
- Explore the generated code structure
- Build something amazing! 🚀






