import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Prescription from "@/models/Prescription";
import DashboardNavbar from "@/components/DashboardNavbar";

function groupByMonth(prescriptions) {
  const groups = {};

  for (const p of prescriptions) {
    const month = new Date(p.createdAt).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });

    groups[month] = groups[month] || [];
    groups[month].push(p);
  }

  return groups;
}

export default async function HistoryPage() {
  const session = await getServerSession(authOptions);
  await connectDB();

  const prescriptions = await Prescription.find({
    userId: session?.user?.id,
  })
    .sort({ createdAt: -1 })
    .lean();

  const grouped = groupByMonth(prescriptions);

  return (
    <div className="min-h-screen bg-[#F7FAF8] text-[#16352A]">
      <DashboardNavbar />

      <main className="mx-auto w-full max-w-5xl px-5 py-7 sm:px-6 lg:px-8 lg:py-10">

        {/* =========================================================
            HEADER
        ========================================================= */}
        <div className="mb-7 flex items-end justify-between gap-4 sm:mb-8">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#CBEBDD] bg-[#E4F5EC] px-3.5 py-1.5 text-xs font-semibold text-[#247153]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2F8F68]" />
              Medication records
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-[#17392C] sm:text-4xl">
              Your medicine
              <br />
              <span className="font-serif italic text-[#2F8F68]">
                history.
              </span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#71837B] sm:text-[15px]">
              Review your previously scanned prescriptions and the medicines
              recorded in your MediLens account.
            </p>
          </div>

          {/* Header icon */}
          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#DDE9E3] bg-white text-[#2F8F68] shadow-sm sm:flex">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5 4h14v16H5z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path
                d="M8 8h8M8 12h8M8 16h5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* =========================================================
            SUMMARY CARD
        ========================================================= */}
        <div className="mb-7 relative overflow-hidden rounded-[28px] bg-[#17392C] p-6 shadow-xl shadow-[#17392C]/10 sm:p-7">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#2F8F68]/30 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8ED4B0]">
                Prescription archive
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                {prescriptions.length}
              </h2>

              <p className="mt-1 text-sm text-[#B5C9C0]">
                {prescriptions.length === 1
                  ? "prescription in your history"
                  : "prescriptions in your history"}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#8ED4B0]">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 3h12v18H6z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 7h6M9 11h6M9 15h4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* =========================================================
            HISTORY
        ========================================================= */}
        {Object.entries(grouped).map(([month, items]) => (
          <section key={month} className="mb-8">

            {/* Month heading */}
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8F5EE] text-[#2F8F68]">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="16"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M8 3v4M16 3v4M3 10h18"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#83948C]">
                  Prescription history
                </p>

                <h2 className="text-base font-bold text-[#17392C] sm:text-lg">
                  {month}
                </h2>
              </div>
            </div>

            {/* History cards */}
            <div className="space-y-3">
              {items.map((p) =>
                p.extractedMedicines.map((m, i) => (
                  <div
                    key={`${p._id}-${i}`}
                    className="group relative overflow-hidden rounded-3xl border border-[#DDE9E3] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#BBDCCB] hover:shadow-md sm:p-5"
                  >
                    {/* Hover accent */}
                    <div className="absolute bottom-0 left-0 top-0 w-1 bg-[#2F8F68] opacity-0 transition-opacity group-hover:opacity-100" />

                    <div className="flex items-center gap-3.5 sm:gap-4">

                      {/* Medicine icon */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E8F5EE] text-[#2C6B52] sm:h-12 sm:w-12">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <rect
                            x="3"
                            y="10"
                            width="18"
                            height="8"
                            rx="4"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          />
                          <path
                            d="M9 10v8"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          />
                        </svg>
                      </div>

                      {/* Medicine information */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="truncate text-[13.5px] font-bold text-[#17392C] sm:text-sm">
                            {m.name}
                          </p>

                          <span
                            className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                              p.status === "active"
                                ? "bg-[#E8F5EE] text-[#2F765A]"
                                : "bg-[#F1F3F2] text-[#718079]"
                            }`}
                          >
                            {p.status === "active"
                              ? "Ongoing"
                              : "Completed"}
                          </span>
                        </div>

                        <p className="mt-1 text-[11.5px] text-[#788B83] sm:text-xs">
                          {p.doctorName || "Self-reported"}
                        </p>
                      </div>

                      {/* Date */}
                      <div className="shrink-0 text-right">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-[#A0ADA7]">
                          Scanned
                        </p>

                        <p className="mt-0.5 text-[11px] font-semibold text-[#667870] sm:text-xs">
                          {new Date(p.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        ))}

        {/* =========================================================
            EMPTY STATE
        ========================================================= */}
        {prescriptions.length === 0 && (
          <div className="rounded-[28px] border border-[#DDE9E3] bg-white px-6 py-12 text-center shadow-sm sm:px-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F5EE] text-[#2F8F68]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 3h12v18H6z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 8h6M9 12h6M9 16h4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h2 className="mt-5 text-lg font-bold text-[#17392C]">
              No medicine history yet
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#71837B]">
              No prescriptions have been scanned yet. Once you scan a
              prescription, your medicine history will appear here.
            </p>
          </div>
        )}

        {/* =========================================================
            EXPORT CTA
        ========================================================= */}
        <a
          href="/dashboard/summary"
          className="group mt-7 flex w-full items-center justify-center gap-3 rounded-3xl bg-[#17392C] px-5 py-4 text-sm font-bold text-white shadow-xl shadow-[#17392C]/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1E4A3A] sm:py-4.5"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 4h16v12H8l-4 4z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>

          <span>Export summary for doctor visit</span>

          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 py-7 text-center text-[11px] text-[#899594] sm:py-8 sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2F8F68]" />
          Your medication history, organized in one place.
        </div>
      </main>
    </div>
  );
}