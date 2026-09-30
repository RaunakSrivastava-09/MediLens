import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Prescription from "@/models/Prescription";
import { uploadPrescriptionImage } from "@/lib/cloudinary";
import { askAIWithImage, parseAIJson } from "@/lib/aiClient";
import { extractionPrompt } from "@/lib/prompts";

// Receives a base64 image from the upload form, stores it in Cloudinary,
// sends it to the AI for extraction, and saves the resulting prescription.
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { imageBase64 } = await req.json();
  if (!imageBase64) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  await connectDB();

  const imageUrl = await uploadPrescriptionImage(imageBase64);

  const rawResponse = await askAIWithImage(extractionPrompt(), imageBase64);
  const parsed = parseAIJson(rawResponse);

  const prescription = await Prescription.create({
    userId: session.user.id,
    imageUrl,
    extractedMedicines: parsed.medicines || []
  });

  return NextResponse.json({ prescription });
}
