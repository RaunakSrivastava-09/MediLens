"use client";

import { useEffect, useState } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import ReminderCard from "@/components/ReminderForm";
import RefillAlertBanner from "@/components/RefillAlertBanner";
import Loader from "@/components/Loader";

export default function RemindersPage() {
  const [reminders, setReminders] = useState(null);
  const [refillAlerts, setRefillAlerts] = useState([]);

  useEffect(() => {
    fetch("/api/reminders")
      .then((res) => res.json())
      .then((data) => setReminders(data.reminders || []));

    fetch("/api/refill-alerts")
      .then((res) => res.json())
      .then((data) => setRefillAlerts(data.alerts || []));
  }, []);

  return (
    <div className="min-h-screen bg-[#F7FAF8] text-[#16352A]">
      <DashboardNavbar />

      <main className="mx-auto w-full max-w-5xl px-5 py-7 sm:px-6 lg:px-8 lg:py-10">
        {/* Header */}
        <div className="mb-7 sm:mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#CBEBDD] bg-[#E4F5EC] px-3.5 py-1.5 text-xs font-semibold text-[#247153]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2F8F68]" />
            Medication schedule
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-[#17392C] sm:text-4xl">
                Your medication
                <br />
                <span className="font-serif italic text-[#2F8F68]">
                  reminders.
                </span>
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#71837B] sm:text-[15px]">
                Stay on top of your medication schedule and keep track of
                upcoming refills in one place.
              </p>
            </div>

            {/* Desktop icon */}
            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#DDE9E3] bg-white text-[#2F8F68] shadow-sm sm:flex">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l2.5 2.5"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-[24px] border border-[#DDE9E3] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#83948C]">
                  Active reminders
                </p>

                <p className="mt-2 text-2xl font-bold text-[#17392C]">
                  {reminders === null ? "—" : reminders.length}
                </p>

                <p className="mt-1 text-xs text-[#788B83]">
                  Scheduled medications
                </p>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E8F5EE] text-[#2F8F68]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6l3.5 2"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#DDE9E3] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#83948C]">
                  Refill alerts
                </p>

                <p className="mt-2 text-2xl font-bold text-[#17392C]">
                  {refillAlerts.length}
                </p>

                <p className="mt-1 text-xs text-[#788B83]">
                  Medicines needing attention
                </p>
              </div>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FFF4DC] text-[#A87518]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v4"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 17h.01"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.3 4.7 2.9 17.5A2 2 0 0 0 4.63 20.5h14.74a2 2 0 0 0 1.73-3L13.7 4.7a2 2 0 0 0-3.4 0Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Loading */}
        {reminders === null && (
          <div className="rounded-[28px] border border-[#DDE9E3] bg-white px-5 py-10 shadow-sm sm:px-8">
            <Loader label="Loading reminders..." />
          </div>
        )}

        {/* Empty state */}
        {reminders?.length === 0 && (
          <div className="mb-6 overflow-hidden rounded-[28px] border border-[#DDE9E3] bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F5EE] text-[#2F8F68]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6l3 2"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>

              <h2 className="mt-4 text-lg font-bold text-[#17392C]">
                No reminders yet
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-[#71837B]">
                Set a reminder from any medicine&apos;s detail page and
                MediLens will help you stay consistent with your schedule.
              </p>
            </div>
          </div>
        )}

        {/* Reminder list */}
        {reminders?.length > 0 && (
          <section className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8F5EE] text-[#2F8F68]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-4.5 w-4.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6l3 2"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#83948C]">
                  Scheduled
                </p>
                <h2 className="text-base font-bold text-[#17392C] sm:text-lg">
                  Medication reminders
                </h2>
              </div>
            </div>

            <div className="space-y-3">
              {reminders.map((r) => (
                <div
                  key={r._id}
                  className="rounded-[28px] border border-[#DDE9E3] bg-white p-2 shadow-sm transition-all duration-300 hover:border-[#BBDCCB] hover:shadow-md"
                >
                  <ReminderCard reminder={r} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Refill alerts */}
        {refillAlerts.length > 0 && (
          <section className="mb-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF4DC] text-[#A87518]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-4.5 w-4.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v4"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 17h.01"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.3 4.7 2.9 17.5A2 2 0 0 0 4.63 20.5h14.74a2 2 0 0 0 1.73-3L13.7 4.7a2 2 0 0 0-3.4 0Z"
                  />
                </svg>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#A87518]">
                  Attention needed
                </p>
                <h2 className="text-base font-bold text-[#17392C] sm:text-lg">
                  Refill alerts
                </h2>
              </div>
            </div>

            <div className="space-y-4">
              {refillAlerts.map((a) => (
                <div key={a.prescriptionId}>
                  <RefillAlertBanner
                    medicineName={a.medicines?.[0]?.name || "Your medicine"}
                    daysLeft={Math.max(a.daysLeft, 0)}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom note */}
        <div className="flex items-center justify-center gap-2 py-7 text-center text-[11px] text-[#899594] sm:py-8 sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2F8F68]" />
          <span>
            MediLens helps you stay consistent with your medication routine.
          </span>
        </div>
      </main>
    </div>
  );
}