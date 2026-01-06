"use client";

import { useState, FormEvent } from "react";
import CodePreview from "@/components/CodePreview";
import OutputDisplay from "@/components/OutputDisplay";
import { GeneratedUI, GenerateResponse } from "@/lib/schemas";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedUI | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data: GenerateResponse = await response.json();

      if (!data.success) {
        setError(data.error || "Failed to generate UI");
        return;
      }

      if (data.data) {
        setResult(data.data);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const examplePrompts = [
    "Clean finance dashboard with dark mode, cards, line chart, and keyboard navigation",
    "Modern pricing page with three tiers, toggle for monthly/yearly, and highlight popular plan",
    "Responsive product grid with hover effects, filters sidebar, and mobile-friendly layout",
    "Contact form with validation states, success message, and accessible error handling",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Generative UI Designer
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform text prompts into production-ready React + Tailwind components
            with instant preview — no cloud rendering, fully accessible, and responsive.
          </p>
        </header>

        {/* Input Section */}
        <div className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-200 mb-2">
                Describe the UI component you want to create
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Clean finance dashboard with dark mode, cards, line chart, and keyboard navigation"
                className="w-full h-32 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                disabled={loading}
                required
                minLength={10}
                maxLength={1000}
              />
              <p className="text-sm text-gray-400 mt-2">
                {prompt.length}/1000 characters (minimum 10)
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || prompt.length < 10}
              className="w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors text-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Generating...
                </span>
              ) : (
                "Generate UI Component"
              )}
            </button>
          </form>

          {/* Example Prompts */}
          <div className="mt-6">
            <p className="text-sm text-gray-400 mb-3">Try these examples:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {examplePrompts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(example)}
                  className="text-left px-4 py-2 bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded text-sm text-gray-300 transition-colors"
                  disabled={loading}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 p-4 bg-red-900/20 border border-red-500 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Preview (2/3 width on large screens) */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white mb-4">Preview</h2>
              <CodePreview code={result.code} />
            </div>

            {/* Output Info (1/3 width on large screens) */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Details</h2>
              <div className="rounded-lg border border-gray-700 bg-gray-800/50 p-6">
                <OutputDisplay data={result} />
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p className="text-sm">
            Built with Next.js, React, Tailwind CSS, and OpenAI •{" "}
            <a
              href="https://github.com/ryan-tng/GenerativeUIDesigner"
              className="text-blue-400 hover:text-blue-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}







