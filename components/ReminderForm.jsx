"use client";

import { useState } from "react";

// One row per medicine reminder: toggle active/paused, list of times,
// matching the "reminders" mockup screen.
export default function ReminderCard({ reminder, onToggle }) {
  const [active, setActive] = useState(reminder.isActive);

  async function handleToggle() {
    const next = !active;
    setActive(next);
    await fetch("/api/reminders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reminderId: reminder._id, isActive: next })
    });
    onToggle?.(reminder._id, next);
  }

  return (
    <div className={`card px-4 py-3.5 mb-2.5 ${active ? "" : "opacity-55"}`}>
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-sm font-semibold">{reminder.medicineName}</span>
        <button
          onClick={handleToggle}
          className={`w-9 h-5 rounded-full relative transition-colors ${active ? "bg-forest" : "bg-line"}`}
        >
          <span
            className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${
              active ? "right-0.5" : "left-0.5"
            }`}
          />
        </button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {active ? (
          reminder.times.map((t) => (
            <span key={t} className="chip bg-mint-tint text-forest-light">
              {t}
            </span>
          ))
        ) : (
          <span className="chip bg-bg text-ink-faint">Paused</span>
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
      body: JSON.stringify({ medicineName, times })
    });
    const data = await res.json();
    setSaving(false);
    onCreated?.(data.reminder);
  }

  return (
    <div className="card p-4">
      <p className="text-sm font-semibold mb-3">Set reminder times for {medicineName}</p>
      {times.map((t, i) => (
        <input
          key={i}
          type="time"
          value={t}
          onChange={(e) => updateTime(i, e.target.value)}
          className="field mb-2"
        />
      ))}
      <button className="text-xs font-semibold text-forest mb-3" onClick={() => setTimes([...times, "08:00"])}>
        + Add another time
      </button>
      <button className="btn btn-primary w-full" onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save reminder"}
      </button>
    </div>
  );
}
