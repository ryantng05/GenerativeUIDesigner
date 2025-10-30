"use client";

import { LiveProvider, LiveError, LivePreview } from "react-live";
import { useState } from "react";
import * as React from "react";

interface CodePreviewProps {
  code: string;
}

/**
 * CodePreview component that renders React code using react-live
 * Provides safe client-side execution of generated code
 */
export default function CodePreview({ code }: CodePreviewProps) {
  const [showCode, setShowCode] = useState(false);

  // Transform the code for react-live
  // Remove export statements and add render call
  const transformCode = (originalCode: string): string => {
    // Remove 'export default' and 'export' keywords
    let transformedCode = originalCode
      .replace(/export\s+default\s+/g, "")
      .replace(/export\s+/g, "");
    
    // Check if code already has a render call
    if (transformedCode.includes("render(")) {
      return transformedCode;
    }
    
    // Try to find component name in various formats
    let componentName = null;
    
    // Try: function ComponentName() {}
    let match = transformedCode.match(/function\s+(\w+)\s*\(/);
    if (match) {
      componentName = match[1];
    }
    
    // Try: const ComponentName = () => {}
    if (!componentName) {
      match = transformedCode.match(/const\s+(\w+)\s*=\s*\(/);
      if (match) {
        componentName = match[1];
      }
    }
    
    // Try: const ComponentName = function
    if (!componentName) {
      match = transformedCode.match(/const\s+(\w+)\s*=\s*function/);
      if (match) {
        componentName = match[1];
      }
    }
    
    if (componentName) {
      // Add render call at the end
      transformedCode += `\n\nrender(<${componentName} />);`;
    } else {
      // If no component found, wrap the code in a render call
      // Assume the last expression is JSX to render
      transformedCode = `render(${transformedCode});`;
    }
    
    return transformedCode;
  };

  // Prepare the code for react-live
  const liveCode = transformCode(code);
  
  // Debug: Log transformed code (can be removed in production)
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('Original code:', code);
    console.log('Transformed code:', liveCode);
  }

  // Scope includes all React hooks and utilities that generated code might use
  const scope = {
    React,
    useState,
    useEffect: React.useEffect,
    useCallback: React.useCallback,
    useMemo: React.useMemo,
    useRef: React.useRef,
    // Add other React hooks as needed
  };

  return (
    <div className="space-y-4">
      {/* Tab switcher */}
      <div className="flex gap-2 border-b border-gray-700">
        <button
          onClick={() => setShowCode(false)}
          className={`px-4 py-2 font-medium transition-colors ${
            !showCode
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Preview
        </button>
        <button
          onClick={() => setShowCode(true)}
          className={`px-4 py-2 font-medium transition-colors ${
            showCode
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Code
        </button>
      </div>

      {/* Content */}
      <div className="min-h-[400px] rounded-lg border border-gray-700 bg-gray-800/50 p-6">
        {!showCode ? (
          <LiveProvider code={liveCode} scope={scope} noInline={true}>
            <div className="space-y-4">
              {/* Error display */}
              <LiveError className="rounded bg-red-900/20 border border-red-500 p-4 text-sm text-red-400" />
              
              {/* Preview */}
              <div className="rounded bg-white p-6 min-h-[350px]">
                <LivePreview />
              </div>
            </div>
          </LiveProvider>
        ) : (
          <pre className="overflow-x-auto text-sm">
            <code className="text-gray-300">{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
}


