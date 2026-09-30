import { NextResponse } from "next/server";
import { askAIWithImage, parseAIJson } from "@/lib/aiClient";
import { extractionPrompt } from "@/lib/prompts";

// Standalone extraction endpoint (image in, structured medicines out).
// Useful for re-running extraction on an already-uploaded image without
// re-uploading it, or for testing the AI prompt in isolation.
export async function POST(req) {
  const { imageBase64 } = await req.json();
  if (!imageBase64) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  const rawResponse = await askAIWithImage(extractionPrompt(), imageBase64);
  const parsed = parseAIJson(rawResponse);

  return NextResponse.json(parsed);
}
