import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Prescription from "@/models/Prescription";
import { askAI, parseAIJson } from "@/lib/aiClient";
import { interactionPrompt } from "@/lib/prompts";

// Checks a newly extracted medicine against the user's other active
// medicines for possible interactions. Called automatically right after
// a new prescription is uploaded (see app/upload/page.js).
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { newMedicineName } = await req.json();
  if (!newMedicineName) {
    return NextResponse.json({ error: "newMedicineName is required" }, { status: 400 });
  }

  await connectDB();

  const activePrescriptions = await Prescription.find({
    userId: session.user.id,
    status: "active"
  });

  const activeMedicineNames = activePrescriptions
    .flatMap((p) => p.extractedMedicines.map((m) => m.name))
    .filter((name) => name.toLowerCase() !== newMedicineName.toLowerCase());

  if (activeMedicineNames.length === 0) {
    return NextResponse.json({ hasInteraction: false });
  }

  const lang = session.user.preferredLanguage || "en";
  const rawResponse = await askAI(
    interactionPrompt(activeMedicineNames, newMedicineName, lang),
    { json: true }
  );
  const parsed = parseAIJson(rawResponse);

  return NextResponse.json(parsed);
}
