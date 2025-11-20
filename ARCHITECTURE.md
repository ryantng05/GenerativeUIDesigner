# Architecture Overview

## System Flow

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────┐                                         │
│  │   app/page.tsx │  Main UI                                │
│  │   (Client)     │                                         │
│  └────────┬───────┘                                         │
│           │                                                  │
│           │ 1. User enters prompt                           │
│           │ "Clean finance dashboard..."                    │
│           ↓                                                  │
│  ┌────────────────────────┐                                │
│  │  POST /api/generate    │                                │
│  │  { prompt: "..." }     │                                │
│  └────────┬───────────────┘                                │
│           │                                                  │
└───────────┼──────────────────────────────────────────────────┘
            │
            │ HTTP Request
            │
┌───────────┼──────────────────────────────────────────────────┐
│           │              Next.js Server                       │
│           ↓                                                  │
│  ┌─────────────────────┐                                    │
│  │  API Route Handler  │                                    │
│  │  route.ts           │                                    │
│  └──────┬──────────────┘                                    │
│         │                                                    │
│         │ 2. Validate with Zod                              │
│         ↓                                                    │
│  ┌─────────────────────┐                                    │
│  │  GenerateRequest    │                                    │
│  │  Schema             │                                    │
│  └──────┬──────────────┘                                    │
│         │                                                    │
│         │ 3. Call OpenAI API                                │
│         ↓                                                    │
│  ┌─────────────────────┐                                    │
│  │   OpenAI SDK        │ ─────────┐                        │
│  │   (openai.ts)       │          │                        │
│  └──────┬──────────────┘          │                        │
│         │                          │                        │
└─────────┼──────────────────────────┼────────────────────────┘
          │                          │
          │                          │ API Call
          │                          │
          │                  ┌───────┼─────────────────┐
          │                  │       ↓                 │
          │                  │  ┌──────────────┐      │
          │                  │  │   OpenAI     │      │
          │                  │  │   gpt-4o     │      │
          │                  │  └──────┬───────┘      │
          │                  │         │              │
          │                  │    4. Generate code    │
          │                  │       with schema      │
          │                  │         │              │
          │                  │  ┌──────┴───────┐      │
          │                  │  │  Structured  │      │
          │                  │  │    Output    │      │
          │                  │  └──────────────┘      │
          │                  └─────────────────────────┘
          │
          │ 5. Parse & Validate Response
          ↓
┌─────────────────────────────────────────────────────────────┐
│                     Next.js Server                           │
│  ┌─────────────────────┐                                    │
│  │  GeneratedUI Schema │                                    │
│  │  Zod Validation     │                                    │
│  └──────┬──────────────┘                                    │
│         │                                                    │
│         │ 6. Return JSON                                    │
│         ↓                                                    │
│  ┌─────────────────────┐                                    │
│  │  { success: true,   │                                    │
│  │    data: { ... } }  │                                    │
│  └──────┬──────────────┘                                    │
│         │                                                    │
└─────────┼──────────────────────────────────────────────────┘
          │
          │ HTTP Response
          │
┌─────────┼──────────────────────────────────────────────────┐
│         ↓              User Browser                         │
│  ┌────────────────────┐                                    │
│  │   State Update     │                                    │
│  │   setResult(data)  │                                    │
│  └──────┬─────────────┘                                    │
│         │                                                    │
│         │ 7. Render Components                             │
│         ↓                                                    │
│  ┌─────────────────────────────┐                           │
│  │  CodePreview (react-live)   │                           │
│  │  ┌─────────────────────┐    │                           │
│  │  │  Live Preview       │    │                           │
│  │  │  (Sandbox)          │    │                           │
│  │  └─────────────────────┘    │                           │
│  └─────────────────────────────┘                           │
│         │                                                    │
│         │                                                    │
│  ┌─────┴───────────────────┐                               │
│  │  OutputDisplay          │                               │
│  │  • Description          │                               │
│  │  • Accessibility        │                               │
│  │  • Responsiveness       │                               │
│  └─────────────────────────┘                               │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Data Flow

### Request Flow

1. **User Input** → Prompt text entered in textarea
2. **Client Validation** → Character length check (10-1000)
3. **HTTP POST** → Send to `/api/generate`
4. **Server Validation** → Zod schema validates request
5. **AI Generation** → OpenAI generates structured response
6. **Response Validation** → Zod schema validates AI output
7. **HTTP Response** → JSON returned to client
8. **State Update** → React state updated with result
9. **Component Render** → Preview and details displayed

### Data Structures

```typescript
// Request
{
  prompt: string (10-1000 chars)
}

// Response
{
  success: boolean,
  data?: {
    description: string,
    code: string,
    accessibility: string[],
    responsiveness: string[]
  },
  error?: string
}
```

## Key Components

### Frontend (Client-Side)

#### `app/page.tsx`
- Main UI container
- Form handling
- State management
- API communication
- **Why Client**: Uses React hooks (useState)

#### `components/CodePreview.tsx`
- react-live integration
- Tab switching (Preview/Code)
- Sandbox execution
- **Why Client**: Interactive UI, react-live needs browser

#### `components/OutputDisplay.tsx`
- Metadata display
- Copy-to-clipboard
- **Why Client**: Browser APIs (clipboard)

### Backend (Server-Side)

#### `app/api/generate/route.ts`
- API endpoint
- Request validation
- AI communication
- Response formatting
- **Why Server**: Protects API keys, server-side only OpenAI SDK

#### `lib/openai.ts`
- OpenAI client initialization
- Configuration management
- **Why Server**: API keys must stay server-side

#### `lib/schemas.ts`
- Zod validation schemas
- Type definitions
- **Why Shared**: Used by both client and server

## Security Model

### Client-Side
- ✅ No API keys exposed
- ✅ Sandboxed preview (react-live)
- ✅ Input validation
- ❌ No direct AI access

### Server-Side
- ✅ API keys in environment
- ✅ Request validation (Zod)
- ✅ Response validation (Zod)
- ✅ Error handling

### Preview Sandbox
- ✅ react-live provides safe execution
- ✅ No eval() used directly
- ✅ Isolated from parent scope
- ✅ Only standard React/HTML allowed

## Scalability Considerations

### Current (MVP)
- Single API route
- No caching
- No rate limiting
- No database

### Future Improvements
- Redis cache for common prompts
- Rate limiting per IP/user
- Database for history
- Batch generation
- Component library cache

## Technology Choices

| Technology | Why? | Alternatives |
|------------|------|--------------|
| **Next.js App Router** | Modern, built-in API routes, great DX | Remix, vanilla React + Express |
| **react-live** | Safe client-side execution, no backend needed | iframe sandboxes, vm2, eval |
| **OpenAI SDK** | Official, well-maintained, swappable | Anthropic, LangChain |
| **Zod** | Type-safe validation, inference, great errors | Yup, Joi, io-ts |
| **Tailwind** | Utility-first, no runtime, works with generated code | CSS-in-JS, plain CSS |

## Development vs Production

### Development
```
npm run dev
- Hot reload
- Detailed errors
- Slower build
- Source maps
```

### Production
```
npm run build
npm start
- Optimized bundles
- Minified code
- Fast startup
- No source maps
```

## API Endpoints

### POST `/api/generate`

**Request**:
```json
{
  "prompt": "Clean finance dashboard..."
}
```

**Response (Success)**:
```json
{
  "success": true,
  "data": {
    "description": "A clean finance dashboard...",
    "code": "export default function GeneratedComponent() {...}",
    "accessibility": ["ARIA labels on all buttons", ...],
    "responsiveness": ["Mobile-first design", ...]
  }
}
```

**Response (Error)**:
```json
{
  "success": false,
  "error": "Prompt must be at least 10 characters"
}
```

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `OPENAI_API_KEY` | Yes | - | OpenAI API key |
| `OPENAI_MODEL` | No | `gpt-4o-mini` | Model to use |
| `OPENAI_BASE_URL` | No | `https://api.openai.com/v1` | API endpoint |

## Performance

### Generation Time
- gpt-4o-mini: ~2-5 seconds
- gpt-4o: ~5-10 seconds
- Network overhead: ~500ms

### Bundle Size
- Initial JS: ~200KB (gzipped)
- react-live: ~50KB
- Total first load: ~250KB

### Optimizations
- Code splitting (Next.js automatic)
- Client-side preview (no server roundtrip)
- Tailwind purging (production)
- Image optimization (if added)

## Error Handling

### Client Errors
- Validation errors → User-friendly messages
- Network errors → Retry suggestion
- Timeout → "Try again" message

### Server Errors
- Invalid API key → Configuration error
- Rate limit → Retry with backoff
- Invalid response → Schema validation error
- AI errors → Generic error message

## Testing Strategy

### Unit Tests (Future)
- Schema validation
- Utility functions
- Component rendering

### Integration Tests (Future)
- API endpoint
- Full generation flow
- Preview rendering

### Manual Testing (Current)
- Various prompts
- Error cases
- Different browsers
- Mobile/desktop






