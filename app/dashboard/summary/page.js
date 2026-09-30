"use client";

import { useEffect, useState } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import Loader from "@/components/Loader";

const PERIODS = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 }
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
    <div>
   <DashboardNavbar />
      <div className="max-w-md mx-auto px-6 py-8">
        <h1 className="text-lg font-semibold mb-5">Doctor visit summary</h1>

        <div className="flex gap-2 mb-6">
          {PERIODS.map((p) => (
            <button
              key={p.days}
              onClick={() => setDays(p.days)}
              className={`chip border ${
                days === p.days ? "bg-forest text-white border-forest" : "border-line text-ink"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {!summary ? (
          <Loader label="Building your summary..." />
        ) : (
          <div className="card p-5">
            <p className="font-serif text-xl mb-1">{summary.prescriptions?.length || 0} prescriptions</p>
            <p className="text-xs text-ink-soft mb-4">Last {summary.periodDays} days</p>
            <div className="h-px bg-line mb-4" />

            <p className="text-[11.5px] font-semibold text-ink-faint uppercase tracking-wide mb-3">
              Medicines taken
            </p>
            {summary.prescriptions?.map((p) =>
              p.extractedMedicines.map((m, i) => (
                <div key={`${p._id}-${i}`} className="flex items-center justify-between py-2.5 border-b border-line last:border-0">
                  <span className="text-sm">{m.name}</span>
                  <span className="text-xs text-ink-soft">
                    {p.status === "active" ? "Ongoing" : "Completed"}
                  </span>
                </div>
              ))
            )}

            <div className="h-px bg-line my-4" />
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="font-serif text-xl font-semibold">{summary.adherencePercent}%</p>
                <p className="text-xs text-ink-soft mt-1">Adherence</p>
              </div>
              <div>
                <p className="font-serif text-xl font-semibold">{summary.missed}</p>
                <p className="text-xs text-ink-soft mt-1">Missed doses</p>
              </div>
            </div>
          </div>
        )}

        <button className="btn btn-primary w-full mt-5" onClick={() => window.print()}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 16V4M7 9l5-5 5 5M5 20h14" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Download / Print
        </button>
      </div>
    </div>
  );
}
