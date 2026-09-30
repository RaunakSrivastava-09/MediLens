import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import AdherenceLog from "@/models/AdherenceLog";

// GET: fetch adherence stats (percentage, streak, missed count) for the
// logged-in user over the last 30 days.
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const logs = await AdherenceLog.find({
    userId: session.user.id,
    scheduledFor: { $gte: thirtyDaysAgo }
  }).sort({ scheduledFor: -1 });

  const total = logs.length;
  const taken = logs.filter((l) => l.takenStatus === "taken").length;
  const missed = logs.filter((l) => l.takenStatus === "missed").length;
  const adherencePercent = total > 0 ? Math.round((taken / total) * 100) : 100;

  // Simple streak: consecutive days (from most recent) with no missed dose
  let streak = 0;
  const byDay = {};
  for (const log of logs) {
    const day = log.scheduledFor.toISOString().slice(0, 10);
    byDay[day] = byDay[day] || [];
    byDay[day].push(log.takenStatus);
  }
  const days = Object.keys(byDay).sort().reverse();
  for (const day of days) {
    if (byDay[day].every((s) => s === "taken")) streak++;
    else break;
  }

  return NextResponse.json({ adherencePercent, missed, streak, total });
}

// POST: mark a specific adherence log as taken (from the "Mark as taken" button)
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { logId, status } = await req.json();
  await connectDB();

  const log = await AdherenceLog.findOneAndUpdate(
    { _id: logId, userId: session.user.id },
    { takenStatus: status, takenAt: status === "taken" ? new Date() : null },
    { new: true }
  );

  return NextResponse.json({ log });
}
