import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Medicine from "@/models/Medicine";

export async function GET(req, { params }) {
  await connectDB();
  const medicine = await Medicine.findById(params.id);
  if (!medicine) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ medicine });
}

export async function DELETE(req, { params }) {
  await connectDB();
  await Medicine.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
