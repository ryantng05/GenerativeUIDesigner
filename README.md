# Generative UI Designer - MVP

Transform text prompts into production-ready React + Tailwind components with instant preview. No cloud rendering of private designs — everything runs locally.

## ✨ Features

- **Text-to-Code Generation**: Describe what you want and get React + Tailwind code
- **Live Preview**: Instant client-side preview using react-live sandbox
- **Production-Ready**: Generated code includes accessibility and responsive design
- **Zero Database**: All generation via API route, rendered immediately
- **Swappable AI**: OpenAI-compatible SDK — use any provider via env vars

## 🎯 MVP Differentiators

The differentiator is:
- ✅ Production-ready code generation
- ✅ Built-in accessibility (ARIA labels, keyboard nav, semantic HTML)
- ✅ Responsive layout out of the box
- ✅ No cloud rendering of private designs
- ❌ Not pixel-perfect drawing

## 🏗️ Architecture

```
┌─────────────┐
│   Next.js   │
│ App Router  │
└──────┬──────┘
       │
┌──────┴──────────────┐
│                     │
│  Frontend           │  Backend
│  ─────────          │  ────────
│  • Input UI         │  • API Route (/api/generate)
│  • react-live       │  • OpenAI SDK
│    Preview          │  • Zod Validation
│  • Output Display   │
│                     │
└─────────────────────┘
```

**Tech Stack**:
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Preview**: react-live (client-side transpile for safe execution)
- **AI**: OpenAI SDK (swappable via env)
- **Validation**: Zod schemas for strict JSON

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- OpenAI API key (or compatible provider)

### Installation

1. **Clone and install dependencies**:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. **Set up environment variables**:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your API key:
```env
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
# Optional: Use a different OpenAI-compatible endpoint
# OPENAI_BASE_URL=https://api.openai.com/v1
```

3. **Run the development server**:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Usage

1. Enter a description of the UI component you want to create (e.g., "Clean finance dashboard with dark mode, cards, line chart, and keyboard navigation")
2. Click "Generate UI Component"
3. View the live preview and generated code
4. Check the accessibility and responsiveness features
5. Copy the code to use in your project

### Example Prompts

- "Clean finance dashboard with dark mode, cards, line chart, and keyboard navigation"
- "Modern pricing page with three tiers, toggle for monthly/yearly, and highlight popular plan"
- "Responsive product grid with hover effects, filters sidebar, and mobile-friendly layout"
- "Contact form with validation states, success message, and accessible error handling"

## 📦 Project Structure

```
generative-ui-designer/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # API endpoint for code generation
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page with UI
├── components/
│   ├── CodePreview.tsx           # React-live preview component
│   └── OutputDisplay.tsx         # Display metadata (a11y, responsive)
├── lib/
│   ├── openai.ts                 # OpenAI client configuration
│   └── schemas.ts                # Zod validation schemas
├── .env.local.example            # Example environment variables
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## 🔧 Configuration

### Swapping AI Providers

The project uses OpenAI SDK but supports any OpenAI-compatible API. To use a different provider:

1. Set `OPENAI_BASE_URL` in `.env.local`:
```env
OPENAI_BASE_URL=https://your-provider.com/v1
OPENAI_API_KEY=your_api_key
OPENAI_MODEL=your_model_name
```

2. The SDK will automatically use your custom endpoint.

### Customizing System Prompt

Edit `app/api/generate/route.ts` to customize the `SYSTEM_PROMPT` constant. This controls how the AI generates code.

## 🎨 Generated Code Features

All generated components include:

### Accessibility (a11y)
- ✅ Semantic HTML elements
- ✅ ARIA labels for interactive elements
- ✅ Proper heading hierarchy
- ✅ Keyboard navigation support
- ✅ Proper color contrast

### Responsiveness
- ✅ Mobile-first design
- ✅ Tailwind responsive prefixes (sm:, md:, lg:, xl:)
- ✅ Touch-friendly tap targets (44x44px minimum)
- ✅ Tested at multiple breakpoints

### Code Quality
- ✅ TypeScript types
- ✅ Modern React patterns (functional components, hooks)
- ✅ Self-contained components
- ✅ No external dependencies (only Tailwind)

## 🔐 Security

- **Client-side preview**: react-live runs in a sandboxed environment
- **No eval()**: Safe code execution without direct eval
- **Server-side generation**: API keys never exposed to client
- **Validation**: Strict Zod schemas for all inputs/outputs

## 🚧 Roadmap (Phase 2)

Future enhancements:
- [ ] Download as ZIP functionality
- [ ] Multiple component types (forms, navbars, hero sections)
- [ ] Theme customization (colors, fonts)
- [ ] Code export in multiple formats (Vue, Svelte)
- [ ] History of generated components
- [ ] Component variations (suggest alternatives)
- [ ] Image generation integration

## 🤝 Contributing

Contributions are welcome! This is an MVP, so there's plenty of room for improvement.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Preview powered by [react-live](https://github.com/FormidableLabs/react-live)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- AI generation via [OpenAI](https://openai.com/)

---

**Note**: This is an MVP (Minimum Viable Product). The focus is on demonstrating the core concept of text-to-code generation with accessibility and responsiveness built in. Further refinement and features can be added based on feedback.






