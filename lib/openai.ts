import OpenAI from "openai";

/**
 * Initialize OpenAI client with API key from environment
 */
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Get the model to use for generation
 * Defaults to gpt-4o, but can be overridden via environment variable
 */
export function getModel(): string {
  return process.env.OPENAI_MODEL || "gpt-4o-2024-08-06";
}

