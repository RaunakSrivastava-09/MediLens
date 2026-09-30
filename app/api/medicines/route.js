import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Medicine from "@/models/Medicine";

// Lists all cached medicine explanations (admin/debug use).
export async function GET() {
  await connectDB();
  const medicines = await Medicine.find({}).sort({ lastFetchedAt: -1 }).limit(100);
  return NextResponse.json({ medicines });
}
