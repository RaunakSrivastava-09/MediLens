import Navbar from "@/components/Navbar";
import MedicineCard from "@/components/MedicineCard";
import { NewReminderForm } from "@/components/ReminderForm";
import { connectDB } from "@/lib/db";
import Prescription from "@/models/Prescription";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// This route is keyed by prescription id; we show the first (or matching)
// extracted medicine's full explanation + voice + reminder setup, matching
// the "medicine-detail" mockup screen.
export default async function MedicineDetailPage({ params, searchParams }) {
  const session = await getServerSession(authOptions);
  await connectDB();

  const prescription = await Prescription.findOne({
    _id: params.id,
    userId: session?.user?.id
  }).lean();

  const medicineIndex = Number(searchParams?.m || 0);
  const medicine = prescription?.extractedMedicines?.[medicineIndex];

  if (!medicine) {
    return (
      <div>
        <Navbar />
        <p className="max-w-md mx-auto px-6 py-10 text-sm text-ink-soft">Medicine not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto px-6 py-8">
        <div className="w-full h-[140px] rounded-lg2 bg-mint-tint flex items-center justify-center mb-4">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="10" width="18" height="8" rx="4" stroke="#2C6B52" strokeWidth="1.8" />
            <path d="M9 10v8" stroke="#2C6B52" strokeWidth="1.8" />
          </svg>
        </div>

        <div className="chip bg-mint-tint text-forest-light mb-4">
          {Math.round((medicine.confidence || 0) * 100)}% confidence match
        </div>

        <MedicineCard medicineName={medicine.name} languageCode={session?.user?.preferredLanguage || "en"} />

        <NewReminderForm medicineName={medicine.name} />
      </div>
    </div>
  );
}
