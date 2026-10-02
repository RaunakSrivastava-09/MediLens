import DashboardNavbar from "@/components/DashboardNavbar";
import AdherenceTracker from "@/components/AdherenceTracker";

export default function AdherencePage() {
  return (
    <div className="min-h-screen bg-[#F7FAF8] text-[#16352A]">
      <DashboardNavbar />

      <main className="mx-auto w-full max-w-5xl px-5 py-7 sm:px-6 lg:px-8 lg:py-10">

        {/* =========================================================
            PAGE HEADER
        ========================================================= */}
        <div className="mb-7 sm:mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#CBEBDD] bg-[#E4F5EC] px-3.5 py-1.5 text-xs font-semibold text-[#247153]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2F8F68]" />
            Medication adherence
          </div>

          <div className="mt-4 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-[#17392C] sm:text-4xl">
                Stay on track with
                <br />
                <span className="font-serif italic text-[#2F8F68]">
                  your medicines.
                </span>
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#71837B] sm:text-[15px]">
                Keep track of your medication routine and monitor how
                consistently you follow your prescribed schedule.
              </p>
            </div>

            {/* Desktop icon */}
            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#DDE9E3] bg-white text-[#2F8F68] shadow-sm sm:flex">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M20 6 9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* =========================================================
            QUICK INFO CARDS
        ========================================================= */}
        <div className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">

          {/* Track */}
          <div className="group relative overflow-hidden rounded-3xl border border-[#DDE9E3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#E8F5EE] opacity-70 blur-2xl" />

            <div className="relative">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5EE] text-[#2F8F68]">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 3v18M3 12h18"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <p className="text-sm font-semibold text-[#17392C]">
                Track doses
              </p>

              <p className="mt-1.5 text-xs leading-5 text-[#788B83]">
                Keep your medication routine organized.
              </p>
            </div>
          </div>

          {/* Consistency */}
          <div className="group relative overflow-hidden rounded-3xl border border-[#DDE9E3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#E8F5EE] opacity-70 blur-2xl" />

            <div className="relative">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5EE] text-[#2F8F68]">
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

              <p className="text-sm font-semibold text-[#17392C]">
                Build consistency
              </p>

              <p className="mt-1.5 text-xs leading-5 text-[#788B83]">
                Follow your prescribed schedule consistently.
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="group relative overflow-hidden rounded-3xl border border-[#DDE9E3] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#E8F5EE] opacity-70 blur-2xl" />

            <div className="relative">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5EE] text-[#2F8F68]">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4 19V5M4 19h16"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                  <path
                    d="m7 15 4-4 3 2 5-6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p className="text-sm font-semibold text-[#17392C]">
                Monitor progress
              </p>

              <p className="mt-1.5 text-xs leading-5 text-[#788B83]">
                See how your medication routine is progressing.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================
            ADHERENCE TRACKER
        ========================================================= */}
        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#83948C]">
                Your progress
              </p>

              <h2 className="mt-1 text-xl font-bold tracking-tight text-[#17392C] sm:text-2xl">
                Adherence tracker
              </h2>

              <p className="mt-1 text-xs text-[#71837B] sm:text-sm">
                Review and manage your medication adherence.
              </p>
            </div>

            <div className="hidden rounded-full bg-[#E8F5EE] px-3 py-1.5 text-xs font-semibold text-[#2F765A] sm:block">
              Tracking
            </div>
          </div>

          {/* Existing component - NO LOGIC CHANGED */}
          <div className="overflow-hidden rounded-[28px] border border-[#DDE9E3] bg-white p-4 shadow-sm sm:p-6 lg:p-7">
            <AdherenceTracker />
          </div>
        </section>

        {/* =========================================================
            BOTTOM INFORMATION CARD
        ========================================================= */}
        <section className="mt-6 overflow-hidden rounded-[28px] bg-[#17392C] p-6 shadow-xl shadow-[#17392C]/10 sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#8ED4B0]">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 3a9 9 0 1 0 9 9"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 7v5l3 2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white sm:text-base">
                  Keep your routine consistent
                </h3>

                <p className="mt-1.5 max-w-xl text-xs leading-5 text-[#B5C9C0] sm:text-sm sm:leading-6">
                  Use your adherence tracker to stay organized and keep an
                  eye on your medication routine.
                </p>
              </div>
            </div>

            <div className="hidden shrink-0 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-center sm:block">
              <p className="text-[10px] uppercase tracking-wider text-[#8EA69D]">
                MediLens
              </p>

              <p className="mt-0.5 text-xs font-semibold text-[#8ED4B0]">
                Stay organized
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            FOOTER
        ========================================================= */}
        <div className="flex items-center justify-center gap-2 py-7 text-center text-[11px] text-[#899594] sm:py-8 sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2F8F68]" />
          Understand your medicines. Stay organized. Stay consistent.
        </div>
      </main>
    </div>
  );
}