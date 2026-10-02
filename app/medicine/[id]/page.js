import DashboardNavbar from "@/components/DashboardNavbar";
import MedicineCard from "@/components/MedicineCard";
import { NewReminderForm } from "@/components/ReminderForm";
import { connectDB } from "@/lib/db";
import Prescription from "@/models/Prescription";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// This route is keyed by prescription id; we show the first (or matching)
// extracted medicine's full explanation + voice + reminder setup.

export default async function MedicineDetailPage({ params, searchParams }) {
  const session = await getServerSession(authOptions);

  await connectDB();

  const prescription = await Prescription.findOne({
    _id: params.id,
    userId: session?.user?.id,
  }).lean();

  const medicineIndex = Number(searchParams?.m || 0);
  const medicine = prescription?.extractedMedicines?.[medicineIndex];

  if (!medicine) {
    return (
      <div className="min-h-screen bg-[#F7FAF8]">
        <Navbar />

        <main className="max-w-2xl mx-auto px-5 sm:px-6 py-8">
          <div className="bg-white border border-[#DDE9E3] rounded-3xl p-6">
            <p className="text-sm text-[#71837B]">
              Medicine not found.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7FAF8] text-[#16352A]">
     <DashboardNavbar />

      <main className="max-w-2xl mx-auto px-5 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#83948C] mb-1.5">
            Medicine details
          </p>

          <h1 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em]">
            {medicine.name}
          </h1>

          <p className="text-xs sm:text-sm text-[#71837B] mt-1">
            Your medicine explanation and reminder settings
          </p>
        </div>

        {/* Medicine image / icon */}
        <div className="w-full h-28 sm:h-32 rounded-3xl bg-[#E8F5EE] border border-[#DDE9E3] flex items-center justify-center mb-4">
          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
            >
              <rect
                x="3"
                y="10"
                width="18"
                height="8"
                rx="4"
                stroke="#2C6B52"
                strokeWidth="1.8"
              />
              <path
                d="M9 10v8"
                stroke="#2C6B52"
                strokeWidth="1.8"
              />
            </svg>
          </div>
        </div>

        {/* Confidence */}
        <div className="inline-flex items-center gap-2 bg-[#E4F5EC] text-[#2F8F68] rounded-full px-3 py-1.5 text-[11px] font-semibold mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2F8F68]" />
          {Math.round((medicine.confidence || 0) * 100)}% confidence match
        </div>

        {/* Medicine explanation */}
        <div className="bg-white border border-[#DDE9E3] rounded-3xl p-4 sm:p-5">
          <MedicineCard
            medicineName={medicine.name}
            languageCode={session?.user?.preferredLanguage || "en"}
          />
        </div>

        {/* Reminder */}
        <div className="mt-4 bg-white border border-[#DDE9E3] rounded-3xl p-4 sm:p-5">
          <p className="text-sm font-semibold text-[#16352A] mb-3">
            Set a reminder
          </p>

          <NewReminderForm medicineName={medicine.name} />
        </div>

        <p className="text-center text-[11px] text-[#9AA9A3] mt-6">
          MediLens · Your medication companion
        </p>
      </main>
    </div>
  );
}