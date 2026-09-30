import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Prescription from "@/models/Prescription";
import AdherenceLog from "@/models/AdherenceLog";

// Generates a doctor-visit summary: every medicine taken in a period,
// plus adherence stats — the data the frontend renders as a printable/
// downloadable report (see app/dashboard/summary/page.js).
export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const days = Number(searchParams.get("days") || 30);
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  await connectDB();

  const prescriptions = await Prescription.find({
    userId: session.user.id,
    createdAt: { $gte: since }
  }).sort({ createdAt: -1 });

  const logs = await AdherenceLog.find({
    userId: session.user.id,
    scheduledFor: { $gte: since }
  });

  const total = logs.length;
  const taken = logs.filter((l) => l.takenStatus === "taken").length;
  const missed = logs.filter((l) => l.takenStatus === "missed").length;
  const adherencePercent = total > 0 ? Math.round((taken / total) * 100) : 100;

  return NextResponse.json({
    periodDays: days,
    prescriptions,
    adherencePercent,
    missed,
    generatedAt: new Date()
  });
}
