import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Prescription from "@/models/Prescription";

// GET: list the logged-in user's prescriptions (medicine history)
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const prescriptions = await Prescription.find({ userId: session.user.id }).sort({
    createdAt: -1
  });

  return NextResponse.json({ prescriptions });
}

// POST: create a prescription directly (used internally by /api/upload;
// exposed here too for manual entry without a photo, if ever needed)
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  await connectDB();

  const prescription = await Prescription.create({
    ...body,
    userId: session.user.id
  });

  return NextResponse.json({ prescription });
}
