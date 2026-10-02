"use client";

import { useState } from "react";

// One row per medicine reminder
export default function ReminderCard({ reminder, onToggle }) {
  const [active, setActive] = useState(reminder.isActive);

  async function handleToggle() {
    const next = !active;
    setActive(next);

    await fetch("/api/reminders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reminderId: reminder._id,
        isActive: next,
      }),
    });

    onToggle?.(reminder._id, next);
  }

  return (
    <div
      className={`rounded-2xl border border-[#DDE9E3] bg-white px-4 py-3.5 mb-3 shadow-sm ${
        active ? "" : "opacity-60"
      }`}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-sm font-semibold text-[#17392C] truncate">
          {reminder.medicineName}
        </span>

        <button
          onClick={handleToggle}
          className={`w-9 h-5 rounded-full relative flex-shrink-0 transition-colors ${
            active ? "bg-[#2F8F68]" : "bg-[#C9D5D0]"
          }`}
        >
          <span
            className={`w-4 h-4 rounded-full bg-white absolute top-0.5 shadow-sm transition-all ${
              active ? "right-0.5" : "left-0.5"
            }`}
          />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {active ? (
          reminder.times.map((t) => (
            <span
              key={t}
              className="rounded-full bg-[#E8F5EE] px-2.5 py-1 text-[11px] font-medium text-[#2F8F68]"
            >
              {t}
            </span>
          ))
        ) : (
          <span className="rounded-full bg-[#F3F6F4] px-2.5 py-1 text-[11px] text-[#83948C]">
            Paused
          </span>
        )}
      </div>
    </div>
  );
}

// Form to create a new reminder for a given medicine.
export function NewReminderForm({ medicineName, onCreated }) {
  const [times, setTimes] = useState(["08:00"]);
  const [saving, setSaving] = useState(false);

  function updateTime(index, value) {
    const next = [...times];
    next[index] = value;
    setTimes(next);
  }

  async function handleSave() {
    setSaving(true);

    const res = await fetch("/api/reminders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ medicineName, times }),
    });

    const data = await res.json();
    setSaving(false);
    onCreated?.(data.reminder);
  }

  return (
    <div className="rounded-2xl border border-[#DDE9E3] bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-[#17392C] mb-3">
        Set reminder times for {medicineName}
      </p>

      {times.map((t, i) => (
        <input
          key={i}
          type="time"
          value={t}
          onChange={(e) => updateTime(i, e.target.value)}
          className="w-full rounded-xl border border-[#DDE9E3] bg-[#F8FBF9] px-3 py-2.5 text-sm text-[#17392C] outline-none focus:border-[#2F8F68] mb-2"
        />
      ))}

      <button
        className="text-xs font-semibold text-[#2F8F68] mb-3 hover:text-[#17392C] transition"
        onClick={() => setTimes([...times, "08:00"])}
      >
        + Add another time
      </button>

      <button
        className="w-full rounded-xl bg-[#17392C] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#24513F] transition disabled:opacity-60"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "Saving..." : "Save reminder"}
      </button>
    </div>
  );
}