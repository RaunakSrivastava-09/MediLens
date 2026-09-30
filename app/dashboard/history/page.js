import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Prescription from "@/models/Prescription";
import DashboardNavbar from "@/components/DashboardNavbar";

function groupByMonth(prescriptions) {
  const groups = {};
  for (const p of prescriptions) {
    const month = new Date(p.createdAt).toLocaleString("en-US", { month: "long", year: "numeric" });
    groups[month] = groups[month] || [];
    groups[month].push(p);
  }
  return groups;
}

export default async function HistoryPage() {
  const session = await getServerSession(authOptions);
  await connectDB();

  const prescriptions = await Prescription.find({ userId: session?.user?.id })
    .sort({ createdAt: -1 })
    .lean();

  const grouped = groupByMonth(prescriptions);

  return (
    <div>
   <DashboardNavbar />
      <div className="max-w-md mx-auto px-6 py-8">
        <h1 className="text-lg font-semibold mb-6">Medicine history</h1>

        {Object.entries(grouped).map(([month, items]) => (
          <div key={month}>
            <p className="text-xs font-semibold text-ink-faint uppercase tracking-wide mb-3 mt-5">
              {month}
            </p>
            {items.map((p) =>
              p.extractedMedicines.map((m, i) => (
                <div key={`${p._id}-${i}`} className="flex items-center gap-3.5 card px-4 py-3.5 mb-2.5">
                  <div className="w-[42px] h-[42px] rounded-[11px] bg-mint-tint flex items-center justify-center flex-shrink-0">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="10" width="18" height="8" rx="4" stroke="#2C6B52" strokeWidth="1.8" />
                      <path d="M9 10v8" stroke="#2C6B52" strokeWidth="1.8" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13.5px] font-semibold truncate">{m.name}</p>
                    <p className="text-[11.5px] text-ink-soft mt-0.5">
                      {p.doctorName || "Self-reported"} ·{" "}
                      {p.status === "active" ? "Ongoing" : "Completed"}
                    </p>
                  </div>
                  <div className="text-[11px] text-ink-faint text-right flex-shrink-0">
                    {new Date(p.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </div>
                </div>
              ))
            )}
          </div>
        ))}

        {prescriptions.length === 0 && (
          <p className="text-sm text-ink-soft">No prescriptions scanned yet.</p>
        )}

        <a href="/dashboard/summary" className="btn btn-secondary w-full mt-5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M4 4h16v12H8l-4 4z" stroke="#173B2E" strokeWidth="1.8" />
          </svg>
          Export summary for doctor visit
        </a>
      </div>
    </div>
  );
}
