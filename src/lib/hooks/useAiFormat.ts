"use client";

import useSWRMutation from "swr/mutation";
import { toast } from "sonner";

// Define the shape of the expected API response
interface FormatResponse {
  formattedText: string;
}

// The fetcher function that sends the POST request to our API route
async function formatTextFetcher(
  url: string,
  { arg }: { arg: { text: string } }
): Promise<FormatResponse> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to format text with AI.");
  }

  return response.json();
}

export function useAiFormat() {
  const { trigger, isMutating, error } = useSWRMutation(
    "/api/format-with-ai",
    formatTextFetcher
  );

  // Expose a clean API for the component to use
  return {
    format: trigger,
    isFormatting: isMutating,
    formattingError: error,
  };
}
