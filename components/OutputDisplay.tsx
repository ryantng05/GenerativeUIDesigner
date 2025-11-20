"use client";

import { GeneratedUI } from "@/lib/schemas";

interface OutputDisplayProps {
  data: GeneratedUI;
}

/**
 * Displays the metadata about the generated UI
 * Including description, accessibility features, and responsiveness notes
 */
export default function OutputDisplay({ data }: OutputDisplayProps) {
  return (
    <div className="space-y-6">
      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold text-gray-100 mb-2">Description</h3>
        <p className="text-gray-300 leading-relaxed">{data.description}</p>
      </div>

      {/* Accessibility Features */}
      <div>
        <h3 className="text-lg font-semibold text-gray-100 mb-2 flex items-center gap-2">
          <span className="text-green-400">✓</span> Accessibility Features
        </h3>
        <ul className="space-y-2">
          {data.accessibility.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-300">
              <span className="text-green-400 mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Responsiveness Notes */}
      <div>
        <h3 className="text-lg font-semibold text-gray-100 mb-2 flex items-center gap-2">
          <span className="text-blue-400">📱</span> Responsive Design
        </h3>
        <ul className="space-y-2">
          {data.responsiveness.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-300">
              <span className="text-blue-400 mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Copy Code Button */}
      <div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(data.code);
            alert("Code copied to clipboard!");
          }}
          className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Copy Code to Clipboard
        </button>
      </div>
    </div>
  );
}






