import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const user = await User.findById(session.user.id).select(
    "name email preferredLanguage voiceOutputEnabled reminderNotificationsEnabled"
  );

  return NextResponse.json({ user });
}

export async function PATCH(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const updates = await req.json();
  const allowed = ["preferredLanguage", "voiceOutputEnabled", "reminderNotificationsEnabled", "name"];
  const filtered = Object.fromEntries(
    Object.entries(updates).filter(([key]) => allowed.includes(key))
  );

  await connectDB();
  const user = await User.findByIdAndUpdate(session.user.id, filtered, { new: true });

  return NextResponse.json({ user });
}
