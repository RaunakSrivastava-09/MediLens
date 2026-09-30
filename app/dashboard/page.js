import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Prescription from "@/models/Prescription";
import Navbar from "@/components/Navbar";
import DashboardNavbar from "@/components/DashboardNavbar";
import { MedicineListItem } from "@/components/MedicineCard";
import { InteractionBanner } from "@/components/InteractionAlert";
import EmptyState from "@/components/EmptyState";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  await connectDB();

  const prescriptions = await Prescription.find({
    userId: session?.user?.id,
    status: "active"
  })
    .sort({ createdAt: -1 })
    .lean();

  const medicines = prescriptions.flatMap((p) =>
    p.extractedMedicines.map((m) => ({ ...m, prescriptionId: p._id }))
  );

  if (medicines.length === 0) {
    return (
      <div>
      <DashboardNavbar />
        <div className="max-w-md mx-auto px-6 py-8">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div>
    <DashboardNavbar />
      <div className="max-w-md mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-ink-soft">Good to see you</p>
            <h1 className="font-serif text-lg">{session?.user?.name}</h1>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5 mb-6">
          <div className="card p-3.5">
            <p className="font-serif text-xl font-semibold">{medicines.length}</p>
            <p className="text-[11px] text-ink-soft mt-1">Active meds</p>
          </div>
          <Link href="/dashboard/adherence" className="card p-3.5">
            <p className="font-serif text-xl font-semibold text-forest-light">—</p>
            <p className="text-[11px] text-ink-soft mt-1">Adherence</p>
          </Link>
          <Link href="/dashboard/reminders" className="card p-3.5">
            <p className="font-serif text-xl font-semibold">—</p>
            <p className="text-[11px] text-ink-soft mt-1">Reminders</p>
          </Link>
        </div>

        <p className="text-[15px] font-semibold mb-3">Your medicines</p>
        {medicines.map((m, i) => (
          <MedicineListItem
            key={`${m.prescriptionId}-${i}`}
            medicine={m}
            index={i}
            href={`/medicine/${m.prescriptionId}?m=${i}`}
          />
        ))}

        <Link href="/upload" className="btn btn-primary w-full mt-3">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="7" width="18" height="13" rx="2" stroke="#fff" strokeWidth="1.8" />
            <circle cx="12" cy="13.5" r="3.2" stroke="#fff" strokeWidth="1.8" />
          </svg>
          Scan a new prescription
        </Link>
      </div>
    </div>
  );
}



