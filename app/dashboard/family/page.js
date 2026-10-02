import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Prescription from "@/models/Prescription";
import DashboardNavbar from "@/components/DashboardNavbar";
import FamilyMemberCard from "@/components/FamilyProfile";

export default async function FamilyPage() {
  const session = await getServerSession(authOptions);
  await connectDB();

  const dependents = await User.find({
    managedBy: session?.user?.id,
  }).lean();

  const membersWithCounts = await Promise.all(
    dependents.map(async (dep) => {
      const activeCount = await Prescription.countDocuments({
        userId: dep._id,
        status: "active",
      });

      return {
        ...dep,
        name: dep.name,
        activeMedicineCount: activeCount,
        missedToday: 0,
      };
    })
  );

  const ownActiveCount = await Prescription.countDocuments({
    userId: session?.user?.id,
    status: "active",
  });

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
              Family care
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-[#17392C] sm:text-4xl">
              Manage your
              <br />
              <span className="font-serif italic text-[#2F8F68]">
                family profiles.
              </span>
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#71837B] sm:text-[15px]">
              Keep track of your family members&apos; medicines and help
              everyone stay organized with their medication routine.
            </p>
          </div>

          {/* Header icon */}
          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#DDE9E3] bg-white text-[#2F8F68] shadow-sm sm:flex">
            <svg
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-3A4.5 4.5 0 0 0 4 18.5V20"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
              <circle
                cx="10"
                cy="7"
                r="3.5"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <path
                d="M16 11a3 3 0 1 0-1.5-5.6"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
              <path
                d="M17 14.2a4.5 4.5 0 0 1 3 4.3V20"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* =========================================================
            FAMILY SUMMARY
        ========================================================= */}
        <div className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-2">

          {/* Your profile */}
          <div className="relative overflow-hidden rounded-3xl border border-[#DDE9E3] bg-white p-5 shadow-sm">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#E8F5EE] opacity-70 blur-2xl" />

            <div className="relative flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E8F5EE] text-sm font-bold text-[#2F8F68]">
                You
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#83948C]">
                  Your profile
                </p>

                <p className="mt-1 truncate text-sm font-bold text-[#17392C]">
                  {session?.user?.name}
                </p>

                <p className="mt-1 text-xs text-[#788B83]">
                  {ownActiveCount}{" "}
                  {ownActiveCount === 1 ? "active medicine" : "active medicines"}
                </p>
              </div>
            </div>
          </div>

          {/* Family count */}
          <div className="relative overflow-hidden rounded-3xl border border-[#DDE9E3] bg-white p-5 shadow-sm">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#E8F5EE] opacity-70 blur-2xl" />

            <div className="relative flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E8F5EE] text-[#2F8F68]">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-3A4.5 4.5 0 0 0 4 18.5V20"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="10"
                    cy="7"
                    r="3.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M16 11a3 3 0 1 0-1.5-5.6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#83948C]">
                  Family members
                </p>

                <p className="mt-1 text-xl font-bold text-[#17392C]">
                  {membersWithCounts.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            PROFILES
        ========================================================= */}
        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#83948C]">
                Profiles
              </p>

              <h2 className="mt-1 text-xl font-bold tracking-tight text-[#17392C] sm:text-2xl">
                Your family
              </h2>
            </div>

            <span className="rounded-full bg-[#E8F5EE] px-3 py-1.5 text-xs font-semibold text-[#2F765A]">
              {membersWithCounts.length + 1}{" "}
              {membersWithCounts.length + 1 === 1 ? "profile" : "profiles"}
            </span>
          </div>

          <div className="space-y-3">
            {/* Owner */}
            <div className="overflow-hidden rounded-3xl border border-[#DDE9E3] bg-white p-1 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
              <FamilyMemberCard
                member={{
                  name: `${session?.user?.name} (You)`,
                  activeMedicineCount: ownActiveCount,
                }}
                index={0}
                isOwner
              />
            </div>

            {/* Dependents */}
            {membersWithCounts.map((m, i) => (
              <div
                key={m._id}
                className="overflow-hidden rounded-3xl border border-[#DDE9E3] bg-white p-1 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#BBDCCB] hover:shadow-md"
              >
                <FamilyMemberCard
                  member={m}
                  index={i + 1}
                />
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================
            ADD MEMBER
        ========================================================= */}
        <button className="group mt-5 flex w-full items-center justify-center gap-2.5 rounded-3xl border-[1.5px] border-dashed border-[#AFCFC0] bg-[#FBFDFC] py-4 text-sm font-semibold text-[#2F765A] transition-all duration-200 hover:border-[#2F8F68] hover:bg-[#F1F8F4]">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E8F5EE] transition-transform group-hover:scale-110">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 5v14M5 12h14"
                stroke="#2F765A"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>

          Add a family member
        </button>

        {/* =========================================================
            NOTIFICATION INFO
        ========================================================= */}
        {membersWithCounts.length > 0 && (
          <div className="mt-5 flex items-start gap-3 rounded-3xl border border-[#F0DFC1] bg-[#FFF8EA] px-4 py-4 sm:px-5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#FBECCF]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 3l9 16H3z"
                  stroke="#C98A2C"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 10v4M12 17h.01"
                  stroke="#C98A2C"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#7A5A1E]">
                Family medication alerts
              </p>

              <p className="mt-1 text-[11.5px] leading-relaxed text-[#856B3B] sm:text-xs">
                You&apos;ll be notified if a family member misses a scheduled
                dose.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 py-7 text-center text-[11px] text-[#899594] sm:py-8 sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2F8F68]" />
          Stay organized. Support your family. Stay informed.
        </div>
      </main>
    </div>
  );
}