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
    <div>
    <DashboardNavbar />
      <div className="max-w-md mx-auto px-6 py-8">
        <h1 className="text-lg font-semibold mb-6">Reminders</h1>

        {reminders === null && <Loader label="Loading reminders..." />}

        {reminders?.length === 0 && (
          <p className="text-sm text-ink-soft mb-5">
            No reminders yet — set one from any medicine&apos;s detail page.
          </p>
        )}

        {reminders?.map((r) => (
          <ReminderCard key={r._id} reminder={r} />
        ))}

        {refillAlerts.map((a) => (
          <div key={a.prescriptionId} className="mt-5">
            <RefillAlertBanner
              medicineName={a.medicines?.[0]?.name || "Your medicine"}
              daysLeft={Math.max(a.daysLeft, 0)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
