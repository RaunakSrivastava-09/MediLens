"use client";

import { useEffect, useState } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import Loader from "@/components/Loader";

const PERIODS = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
];

export default function SummaryPage() {
  const [days, setDays] = useState(30);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    setSummary(null);
    fetch(`/api/summary?days=${days}`)
      .then((res) => res.json())
      .then(setSummary);
  }, [days]);

  return (
    <div className="min-h-screen bg-[#F7FAF8] text-[#16352A]">
      <DashboardNavbar />

      <main className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-7 sm:py-8 lg:py-10">
        {/* Header */}
        <div className="mb-7 sm:mb-9">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#E4F5EC] px-3 py-1.5 text-[11px] font-semibold text-[#2F8F68] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2F8F68]" />
            Doctor visit summary
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-[36px] leading-tight font-semibold tracking-[-0.03em]">
            Your health summary.
            <br />
            <span className="font-serif italic font-normal text-[#2F8F68]">
              Ready for your next visit.
            </span>
          </h1>

          <p className="mt-3 max-w-xl text-sm sm:text-[15px] leading-6 text-[#71837B]">
            Review your medicines, adherence, and missed doses from a selected
            period before speaking with your doctor.
          </p>
        </div>

        {/* Period selector */}
        <section className="mb-6 sm:mb-7">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#83948C]">
              Summary period
            </p>

            <span className="hidden sm:block text-xs text-[#83948C]">
              Choose a timeframe
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
            {PERIODS.map((p) => (
              <button
                key={p.days}
                onClick={() => setDays(p.days)}
                className={`w-full rounded-2xl border px-4 py-3.5 text-sm font-semibold transition-all duration-200 ${
                  days === p.days
                    ? "bg-[#17392C] text-white border-[#17392C] shadow-lg shadow-[#17392C]/10"
                    : "bg-white border-[#DDE9E3] text-[#4E635A] hover:border-[#2F8F68] hover:text-[#2F8F68]"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </section>

        {/* Summary */}
        {!summary ? (
          <div className="bg-white border border-[#DDE9E3] rounded-[28px] p-6 sm:p-8">
            <Loader label="Building your summary..." />
          </div>
        ) : (
          <div className="space-y-5">
            {/* Overview card */}
            <section className="bg-[#17392C] rounded-[28px] p-6 sm:p-8 text-white shadow-xl shadow-[#17392C]/10">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#8ED4B0]">
                    Overview
                  </p>

                  <p className="mt-3 font-serif text-4xl sm:text-5xl">
                    {summary.prescriptions?.length || 0}
                  </p>

                  <p className="mt-1 text-sm text-white/70">
                    prescriptions
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 border border-white/10 px-4 py-3">
                  <p className="text-xs text-white/55">Selected period</p>
                  <p className="mt-1 text-sm font-semibold">
                    Last {summary.periodDays} days
                  </p>
                </div>
              </div>
            </section>

            {/* Medicines */}
            <section className="bg-white border border-[#DDE9E3] rounded-[28px] overflow-hidden">
              <div className="px-5 sm:px-7 py-5 border-b border-[#DDE9E3]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#83948C]">
                  Medicines taken
                </p>

                <p className="mt-1 text-sm text-[#71837B]">
                  Medicines recorded during this period
                </p>
              </div>

              <div className="px-5 sm:px-7">
                {summary.prescriptions?.map((p) =>
                  p.extractedMedicines.map((m, i) => (
                    <div
                      key={`${p._id}-${i}`}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-4 border-b border-[#DDE9E3] last:border-0"
                    >
                      <div className="min-w-0">
                        <p className="text-sm sm:text-[15px] font-semibold text-[#16352A] truncate">
                          {m.name}
                        </p>

                        <p className="text-xs text-[#83948C] mt-1">
                          Prescription medicine
                        </p>
                      </div>

                      <span
                        className={`self-start sm:self-auto shrink-0 inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${
                          p.status === "active"
                            ? "bg-[#E4F5EC] text-[#2F8F68]"
                            : "bg-[#F1F4F2] text-[#71837B]"
                        }`}
                      >
                        {p.status === "active" ? "Ongoing" : "Completed"}
                      </span>
                    </div>
                  ))
                )}

                {(!summary.prescriptions ||
                  summary.prescriptions.length === 0) && (
                  <div className="py-10 text-center">
                    <p className="text-sm font-semibold text-[#16352A]">
                      No prescriptions found
                    </p>
                    <p className="text-xs text-[#83948C] mt-1">
                      There are no medicine records for this period.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Adherence stats */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-[#DDE9E3] rounded-[28px] p-6">
                <div className="w-10 h-10 rounded-2xl bg-[#E8F5EE] flex items-center justify-center mb-5">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5 12.5l4 4L19 7"
                      stroke="#2F8F68"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <p className="font-serif text-3xl sm:text-4xl text-[#17392C]">
                  {summary.adherencePercent}%
                </p>

                <p className="text-sm font-semibold text-[#16352A] mt-1">
                  Adherence
                </p>

                <p className="text-xs text-[#83948C] mt-1">
                  Medication doses taken as scheduled
                </p>
              </div>

              <div className="bg-white border border-[#DDE9E3] rounded-[28px] p-6">
                <div className="w-10 h-10 rounded-2xl bg-[#F8EEE7] flex items-center justify-center mb-5">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 8v5M12 16.5v.5"
                      stroke="#A66A43"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="#A66A43"
                      strokeWidth="1.8"
                    />
                  </svg>
                </div>

                <p className="font-serif text-3xl sm:text-4xl text-[#17392C]">
                  {summary.missed}
                </p>

                <p className="text-sm font-semibold text-[#16352A] mt-1">
                  Missed doses
                </p>

                <p className="text-xs text-[#83948C] mt-1">
                  Doses missed during this period
                </p>
              </div>
            </section>
          </div>
        )}

        {/* Print */}
        <button
          className="w-full mt-6 flex items-center justify-center gap-2 rounded-2xl bg-[#17392C] text-white px-5 py-3.5 text-sm font-semibold shadow-lg shadow-[#17392C]/10 hover:bg-[#214A39] transition-colors"
          onClick={() => window.print()}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 16V4M7 9l5-5 5 5M5 20h14"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          Download / Print Summary
        </button>

        {/* Footer note */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl bg-[#E8F5EE] px-4 py-4">
          <svg
            className="shrink-0 mt-0.5"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="#2F8F68"
              strokeWidth="1.8"
            />
            <path
              d="M12 10v6M12 7.5v.5"
              stroke="#2F8F68"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>

          <p className="text-xs sm:text-[13px] leading-5 text-[#557267]">
            This summary is designed to help you discuss your medication
            history with your doctor. Always follow your doctor&apos;s
            instructions for treatment.
          </p>
        </div>

        <p className="text-center text-[11px] text-[#9AA9A3] mt-8 pb-3">
          MediLens · Your medication companion
        </p>
      </main>
    </div>
  );
}