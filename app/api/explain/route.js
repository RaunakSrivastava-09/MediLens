import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Medicine from "@/models/Medicine";
import { askAI, parseAIJson } from "@/lib/aiClient";
import { explanationPrompt } from "@/lib/prompts";

// Explains a medicine in the user's preferred language, using the cache
// in the Medicine collection first before calling the AI.
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { medicineName, language } = await req.json();
  if (!medicineName) {
    return NextResponse.json({ error: "medicineName is required" }, { status: 400 });
  }

  const lang = language || session.user.preferredLanguage || "en";

  await connectDB();

  // 1. Check cache first
  const cached = await Medicine.findOne({ name: medicineName, language: lang });
  if (cached) {
    return NextResponse.json({
      purpose: cached.purpose,
      sideEffects: cached.sideEffects,
      timing: cached.timing,
      fromCache: true
    });
  }

  // 2. Not cached — ask the AI
  const rawResponse = await askAI(explanationPrompt(medicineName, lang), { json: true });
  const parsed = parseAIJson(rawResponse);

  // 3. Save to cache for next time
  await Medicine.create({
    name: medicineName,
    language: lang,
    purpose: parsed.purpose,
    sideEffects: parsed.sideEffects,
    timing: parsed.timing
  });

  return NextResponse.json({ ...parsed, fromCache: false });
}
