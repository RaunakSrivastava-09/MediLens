import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Reminder from "@/models/Reminder";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const reminders = await Reminder.find({ userId: session.user.id }).sort({ createdAt: -1 });
  return NextResponse.json({ reminders });
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { medicineName, times, prescriptionId } = await req.json();
  if (!medicineName || !times?.length) {
    return NextResponse.json({ error: "medicineName and times are required" }, { status: 400 });
  }

  await connectDB();
  const reminder = await Reminder.create({
    userId: session.user.id,
    prescriptionId: prescriptionId || null,
    medicineName,
    times
  });

  return NextResponse.json({ reminder });
}

export async function PATCH(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { reminderId, ...updates } = await req.json();
  await connectDB();

  const reminder = await Reminder.findOneAndUpdate(
    { _id: reminderId, userId: session.user.id },
    updates,
    { new: true }
  );

  return NextResponse.json({ reminder });
}
