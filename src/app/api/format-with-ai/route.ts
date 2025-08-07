import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// --- Configuration ---
// Read configuration from environment variables, providing sensible defaults.
const OPENAI_BASE_URL =
  process.env.OPENAI_API_BASE_URL || "https://api.openai.com/v1";
const OPENAI_MODEL = process.env.OPENAI_API_MODEL || "gpt-3.5-turbo";

// Initialize the OpenAI client with the API key and custom base URL
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: OPENAI_BASE_URL,
});

// --- System Prompt ---
// A system prompt to instruct the AI on its role and desired output format
const SYSTEM_PROMPT = `
You are an expert markdown formatter. A user will provide you with a piece of text.
Your task is to format this text into clean, well-structured GitHub-Flavored Markdown.
Key requirements:
- Use appropriate headers, lists, bold, italics, and code blocks.
- Do not add any introductory text, commentary, or explanations.
- Your response must ONLY be the formatted markdown content.
- If the text is already well-formatted markdown, just return it as is or make minor improvements.
- Pay attention to creating proper lists from lines of text that look like items.
`;

// --- API Route Handler ---
export async function POST(req: NextRequest) {
  try {
    // 1. Extract the 'text' from the request body
    const body = await req.json();
    const { text } = body;

    // 2. Validate the input
    if (!text) {
      return NextResponse.json(
        { error: "Text content is required." },
        { status: 400 }
      );
    }

    // 3. Make the API call to OpenAI using the configured model
    const completion = await openai.chat.completions.create({
      model: OPENAI_MODEL, // Use the configured model
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 0.2,
      max_tokens: 2000,
    });

    const formattedText = completion.choices[0]?.message?.content;

    // 4. Handle cases where the AI might return an empty response
    if (!formattedText) {
      return NextResponse.json(
        { error: "AI failed to return formatted text." },
        { status: 500 }
      );
    }

    // 5. Send the formatted text back to the client
    return NextResponse.json({ formattedText });
  } catch (error) {
    // 6. Implement robust error handling
    console.error("Error in /api/format-with-ai:", error);

    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: `OpenAI API Error: ${error.message}` },
        { status: error.status }
      );
    }

    return NextResponse.json(
      { error: "An unexpected server error occurred." },
      { status: 500 }
    );
  }
}
