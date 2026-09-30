import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Prescription from "@/models/Prescription";

// Calculates which active, fixed-course prescriptions are about to run out
// (within 2 days) so the frontend can show a refill banner.
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const activePrescriptions = await Prescription.find({
    userId: session.user.id,
    status: "active",
    courseDays: { $ne: null }
  });

  const alerts = activePrescriptions
    .map((p) => {
      const endDate = new Date(p.createdAt);
      endDate.setDate(endDate.getDate() + p.courseDays);
      const daysLeft = Math.ceil((endDate - new Date()) / (1000 * 60 * 60 * 24));
      return { prescriptionId: p._id, medicines: p.extractedMedicines, daysLeft, endDate };
    })
    .filter((a) => a.daysLeft <= 2);

  return NextResponse.json({ alerts });
}
