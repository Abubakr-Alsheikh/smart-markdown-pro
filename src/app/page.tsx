"use client";

import { useState } from "react";

export default function Home() {
  const [rawText, setRawText] = useState("");
  const [formattedText, setFormattedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormat = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/format-with-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: rawText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      const data = await response.json();
      setFormattedText(data.formattedText);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-12 bg-gray-50 dark:bg-gray-900 font-sans">
      <div className="w-full max-w-7xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white">
            Smart Markdown Pro
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
            Instantly format your text into clean, well-structured markdown
            using AI.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Editor */}
          <div className="flex flex-col">
            <label
              htmlFor="raw-text"
              className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300"
            >
              Your Raw Text
            </label>
            <textarea
              id="raw-text"
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Enter your notes, messy text, or markdown here..."
              className="w-full h-96 p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition"
            />
          </div>

          {/* Output Preview */}
          <div className="flex flex-col">
            <label
              htmlFor="formatted-text"
              className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300"
            >
              AI-Formatted Markdown
            </label>
            <div
              id="formatted-text"
              className="w-full h-96 p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-gray-100 dark:bg-gray-800 overflow-y-auto max-w-none"
            >
              {isLoading && !formattedText && (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <span>Formatting...</span>
                </div>
              )}
              {error && (
                <div className="flex items-center justify-center h-full text-red-500">
                  <p>Error: {error}</p>
                </div>
              )}
              <div className="whitespace-pre-wrap">{formattedText}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center">
          <button
            onClick={handleFormat}
            disabled={isLoading || !rawText.trim()}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:transform-none"
          >
            {isLoading ? "Formatting..." : "Format with AI"}
          </button>
          {isLoading && (
            <p className="mt-2 text-sm text-gray-500">AI is thinking...</p>
          )}
        </div>
      </div>
    </main>
  );
}
