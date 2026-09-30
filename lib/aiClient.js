// Thin wrapper around the multimodal AI API call.
// Swap AI_API_URL / AI_MODEL in .env.local to change providers (Grok, GPT-4o, etc).
// This file only knows how to "send a prompt, get text back" — it has no
// knowledge of prescriptions, medicines, or languages. That logic lives in
// the API routes that call this function, using templates from lib/prompts.js.

const AI_API_URL = process.env.AI_API_URL;
const AI_API_KEY = process.env.AI_API_KEY;
const AI_MODEL = process.env.AI_MODEL || "grok-2-vision";

/**
 * Send a text-only prompt to the AI and get a text response back.
 */
export async function askAI(prompt, { json = false } = {}) {
  const res = await fetch(AI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AI_API_KEY}`
    },
    body: JSON.stringify({
      model: AI_MODEL,
      messages: [{ role: "user", content: prompt }],
      ...(json ? { response_format: { type: "json_object" } } : {})
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`AI API error (${res.status}): ${text}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

/**
 * Send an image (base64 data URL) plus a text prompt to the AI, for
 * prescription/medicine-strip extraction.
 */
export async function askAIWithImage(prompt, imageDataUrl, { json = true } = {}) {
  const res = await fetch(AI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AI_API_KEY}`
    },
    body: JSON.stringify({
      model: AI_MODEL,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: imageDataUrl } }
          ]
        }
      ],
      ...(json ? { response_format: { type: "json_object" } } : {})
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`AI API error (${res.status}): ${text}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}

/**
 * Safely parse AI JSON output, stripping ```json fences if present.
 */
export function parseAIJson(rawText) {
  const cleaned = rawText.replace(/```json|```/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error("Failed to parse AI response as JSON: " + cleaned.slice(0, 200));
  }
}
