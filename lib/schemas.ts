import { z } from "zod";

/**
 * Schema for the generation request from the client
 */
export const GenerateRequestSchema = z.object({
  prompt: z.string().min(10, "Prompt must be at least 10 characters").max(1000, "Prompt must be less than 1000 characters"),
});

export type GenerateRequest = z.infer<typeof GenerateRequestSchema>;

/**
 * Schema for the AI-generated response
 */
export const GeneratedUISchema = z.object({
  description: z.string().describe("A brief description of what was generated"),
  code: z.string().describe("The complete React component code in TSX format with Tailwind classes"),
  accessibility: z.array(z.string()).describe("List of accessibility features included (e.g., ARIA labels, keyboard navigation)"),
  responsiveness: z.array(z.string()).describe("List of responsive design notes (e.g., mobile-first, breakpoints used)"),
});

export type GeneratedUI = z.infer<typeof GeneratedUISchema>;

/**
 * Schema for the API response
 */
export const GenerateResponseSchema = z.object({
  success: z.boolean(),
  data: GeneratedUISchema.optional(),
  error: z.string().optional(),
});

export type GenerateResponse = z.infer<typeof GenerateResponseSchema>;



