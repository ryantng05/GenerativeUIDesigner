import { NextRequest, NextResponse } from "next/server";
import { openai, getModel } from "@/lib/openai";
import { GenerateRequestSchema, GeneratedUISchema, GenerateResponse } from "@/lib/schemas";
import { zodResponseFormat } from "openai/helpers/zod";

/**
 * System prompt for the AI model
 * Instructs it to generate production-ready React + Tailwind code
 */
const SYSTEM_PROMPT = `You are an expert React developer and UI designer. Your task is to generate production-ready React components with Tailwind CSS based on user descriptions.

REQUIREMENTS:
1. Generate a complete, self-contained React component (TSX)
2. Use Tailwind CSS for all styling (no custom CSS)
3. Include proper TypeScript types
4. Ensure accessibility (ARIA labels, semantic HTML, keyboard navigation where applicable)
5. Make it responsive (mobile-first design)
6. Use modern React patterns (functional components, hooks)
7. The component MUST be named "GeneratedComponent" using function declaration syntax
8. Do NOT include imports for React or useState - they will be provided by the preview environment
9. Only use standard HTML elements and React built-ins (no external component libraries)
10. Use 'export default' before the function declaration

CODE FORMAT EXAMPLE:
export default function GeneratedComponent() {
  const [state, setState] = useState(initialValue);
  
  return (
    <div className="...">
      {/* Your component JSX */}
    </div>
  );
}

ACCESSIBILITY GUIDELINES:
- Use semantic HTML (nav, main, header, footer, article, etc.)
- Add ARIA labels for interactive elements
- Ensure proper heading hierarchy
- Include keyboard navigation support where needed
- Use proper color contrast

RESPONSIVENESS GUIDELINES:
- Mobile-first approach
- Use Tailwind responsive prefixes (sm:, md:, lg:, xl:)
- Ensure touch-friendly tap targets (min 44x44px)
- Test layouts at different breakpoints`;

/**
 * POST handler for generating UI code
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedRequest = GenerateRequestSchema.parse(body);

    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "OpenAI API key not configured. Please set OPENAI_API_KEY in your environment.",
        } satisfies GenerateResponse,
        { status: 500 }
      );
    }

    // Call OpenAI API with structured output
    const completion = await openai.beta.chat.completions.parse({
      model: getModel(),
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: validatedRequest.prompt },
      ],
      response_format: zodResponseFormat(GeneratedUISchema, "ui_generation"),
      temperature: 0.7,
    });

    const result = completion.choices[0].message.parsed;

    if (!result) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to generate UI. Please try again.",
        } satisfies GenerateResponse,
        { status: 500 }
      );
    }

    // Validate the generated response
    const validatedResult = GeneratedUISchema.parse(result);

    return NextResponse.json({
      success: true,
      data: validatedResult,
    } satisfies GenerateResponse);

  } catch (error) {
    console.error("Generation error:", error);

    // Handle validation errors
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        } satisfies GenerateResponse,
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      } satisfies GenerateResponse,
      { status: 500 }
    );
  }
}


