import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Prescription from "@/models/Prescription";

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const prescription = await Prescription.findOne({
    _id: params.id,
    userId: session.user.id
  });

  if (!prescription) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ prescription });
}

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const updates = await req.json();
  await connectDB();

  const prescription = await Prescription.findOneAndUpdate(
    { _id: params.id, userId: session.user.id },
    updates,
    { new: true }
  );

  return NextResponse.json({ prescription });
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  await Prescription.deleteOne({ _id: params.id, userId: session.user.id });

  return NextResponse.json({ success: true });
}
