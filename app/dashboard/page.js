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
    status: "active",
  })
    .sort({ createdAt: -1 })
    .lean();

  const medicines = prescriptions.flatMap((p) =>
    p.extractedMedicines.map((m) => ({ ...m, prescriptionId: p._id }))
  );

  if (medicines.length === 0) {
    return (
      <div className="min-h-screen bg-[#F7FAF8] text-[#16352A]">
        <DashboardNavbar />

        <div className="mx-auto max-w-5xl px-5 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#CBEBDD] bg-[#E4F5EC] px-3.5 py-1.5 text-xs font-semibold text-[#247153]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2F8F68]" />
              Your medication dashboard
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#17392C] sm:text-4xl">
              Your medicines,
              <br />
              <span className="font-serif italic text-[#2F8F68]">
                all in one place.
              </span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#71837B]">
              Upload your first prescription to start understanding and
              managing your medicines with MediLens.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#DDE9E3] bg-white p-6 shadow-xl shadow-[#17392C]/5 sm:p-10">
            <EmptyState />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7FAF8] text-[#16352A]">
      <DashboardNavbar />

      <main className="mx-auto max-w-5xl px-5 py-7 sm:px-6 lg:px-8 lg:py-10">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#CBEBDD] bg-[#E4F5EC] px-3.5 py-1.5 text-xs font-semibold text-[#247153]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2F8F68]" />
              Medication overview
            </div>

            <p className="text-sm font-medium text-[#7A8C84]">
              Good to see you
            </p>

            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#17392C] sm:text-4xl">
              {session?.user?.name}
            </h1>

            <p className="mt-2 text-sm text-[#71837B]">
              Here&apos;s your medication overview for today.
            </p>
          </div>

          <div className="hidden h-12 w-12 items-center justify-center rounded-2xl border border-[#DDE9E3] bg-white text-[#2F8F68] shadow-sm sm:flex">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 21s-7-4.5-7-10.2C5 7.4 7.2 5 10 5c1.2 0 2.3.5 3 1.4C13.7 5.5 14.8 5 16 5c2.8 0 5 2.4 5 5.8C21 16.5 14 21 12 21Z"
                stroke="#2F8F68"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Active medicines */}
          <div className="group relative overflow-hidden rounded-3xl border border-[#DDE9E3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#17392C]/5">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#E8F5EE] opacity-70 blur-2xl" />

            <div className="relative">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5EE] text-[#2F8F68]">
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M8.5 3.5h7A2.5 2.5 0 0 1 18 6v12a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 6 18V6a2.5 2.5 0 0 1 2.5-2.5Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <path
                      d="M9 8h6M9 12h6M9 16h3"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <span className="rounded-full bg-[#F1F8F4] px-2.5 py-1 text-[10px] font-semibold text-[#2F765A]">
                  Active
                </span>
              </div>

              <p className="text-3xl font-bold tracking-tight text-[#17392C]">
                {medicines.length}
              </p>

              <p className="mt-1 text-xs font-medium text-[#788B83]">
                Active medicines
              </p>
            </div>
          </div>

          {/* Adherence */}
          <Link
            href="/dashboard/adherence"
            className="group relative overflow-hidden rounded-3xl border border-[#DDE9E3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#BBDCCB] hover:shadow-lg hover:shadow-[#17392C]/5"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#E8F5EE] opacity-70 blur-2xl" />

            <div className="relative">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5EE] text-[#2F8F68]">
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M20 6 9 17l-5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <span className="text-lg text-[#9AACA4] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>

              <p className="text-3xl font-bold tracking-tight text-[#2F8F68]">
                —
              </p>

              <p className="mt-1 text-xs font-medium text-[#788B83]">
                Adherence
              </p>

              <p className="mt-2 text-[11px] font-medium text-[#2F765A]">
                View your progress
              </p>
            </div>
          </Link>

          {/* Reminders */}
          <Link
            href="/dashboard/reminders"
            className="group relative overflow-hidden rounded-3xl border border-[#DDE9E3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#BBDCCB] hover:shadow-lg hover:shadow-[#17392C]/5"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#E8F5EE] opacity-70 blur-2xl" />

            <div className="relative">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5EE] text-[#2F8F68]">
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 21h4"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <span className="text-lg text-[#9AACA4] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>

              <p className="text-3xl font-bold tracking-tight text-[#17392C]">
                —
              </p>

              <p className="mt-1 text-xs font-medium text-[#788B83]">
                Reminders
              </p>

              <p className="mt-2 text-[11px] font-medium text-[#2F765A]">
                Manage reminders
              </p>
            </div>
          </Link>
        </div>

        {/* Medicine Section */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#83948C]">
              Your medication
            </p>

            <h2 className="mt-1 text-xl font-bold tracking-tight text-[#17392C]">
              Your medicines
            </h2>
          </div>

          <span className="rounded-full bg-[#E8F5EE] px-3 py-1.5 text-xs font-semibold text-[#2F765A]">
            {medicines.length}{" "}
            {medicines.length === 1 ? "medicine" : "medicines"}
          </span>
        </div>

        {/* Medicine List */}
        <div className="space-y-3">
          {medicines.map((m, i) => (
            <div
              key={`${m.prescriptionId}-${i}`}
              className="rounded-3xl border border-[#DDE9E3] bg-white p-1 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <MedicineListItem
                medicine={m}
                index={i}
                href={`/medicine/${m.prescriptionId}?m=${i}`}
              />
            </div>
          ))}
        </div>

        {/* Upload CTA */}
        <div className="mt-6 overflow-hidden rounded-[28px] bg-[#17392C] p-6 shadow-xl shadow-[#17392C]/10 sm:p-7">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-md">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#8ED4B0]">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    x="3"
                    y="7"
                    width="18"
                    height="13"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle
                    cx="12"
                    cy="13.5"
                    r="3.2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M8 7 9.5 4h5L16 7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <h3 className="text-lg font-bold text-white">
                Have another prescription?
              </h3>

              <p className="mt-1.5 text-sm leading-6 text-[#B5C9C0]">
                Scan it and let MediLens help you understand your medicines.
              </p>
            </div>

            <Link
              href="/upload"
              className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-[#1E5A43] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F0F8F4]"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect
                  x="3"
                  y="7"
                  width="18"
                  height="13"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <circle
                  cx="12"
                  cy="13.5"
                  r="3.2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>

              Scan new prescription

              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}