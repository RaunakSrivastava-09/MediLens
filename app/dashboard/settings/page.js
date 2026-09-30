"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import DashboardNavbar from "@/components/DashboardNavbar";
import LanguageSelector from "@/components/LanguageSelector";
import Loader from "@/components/Loader";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [prefs, setPrefs] = useState(null);

  useEffect(() => {
    fetch("/api/user/preferences")
      .then((res) => res.json())
      .then((data) => setPrefs(data.user));
  }, []);

  async function updatePref(key, value) {
    setPrefs((p) => ({ ...p, [key]: value }));
    await fetch("/api/user/preferences", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [key]: value })
    });
  }

  if (!prefs) {
    return (
      <div>
      <DashboardNavbar />
        <Loader label="Loading settings..." />
      </div>
    );
  }

  const initials = prefs.name
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div>
     <DashboardNavbar />
      <div className="max-w-md mx-auto px-6 py-8">
        <h1 className="text-lg font-semibold mb-6">Settings</h1>

        <div className="flex items-center gap-3.5 mb-7">
          <div className="w-14 h-14 rounded-full bg-mint-tint text-forest flex items-center justify-center text-base font-bold">
            {initials}
          </div>
          <div>
            <p className="text-[15px] font-semibold">{prefs.name}</p>
            <p className="text-xs text-ink-soft mt-0.5">{prefs.email}</p>
          </div>
        </div>

        <p className="text-[11.5px] font-semibold text-ink-faint uppercase tracking-wide mb-2.5">
          Preferences
        </p>
        <div className="card divide-y divide-line mb-6">
          <div className="px-4 py-3.5">
            <label className="field-label">Preferred language</label>
            <LanguageSelector value={prefs.preferredLanguage} onChange={(v) => updatePref("preferredLanguage", v)} />
          </div>
          <div className="px-4 py-3.5 flex items-center justify-between">
            <span className="text-sm font-medium">Voice output</span>
            <button
              onClick={() => updatePref("voiceOutputEnabled", !prefs.voiceOutputEnabled)}
              className={`w-9 h-5 rounded-full relative ${prefs.voiceOutputEnabled ? "bg-forest" : "bg-line"}`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-0.5 ${
                  prefs.voiceOutputEnabled ? "right-0.5" : "left-0.5"
                }`}
              />
            </button>
          </div>
          <div className="px-4 py-3.5 flex items-center justify-between">
            <span className="text-sm font-medium">Reminder notifications</span>
            <button
              onClick={() => updatePref("reminderNotificationsEnabled", !prefs.reminderNotificationsEnabled)}
              className={`w-9 h-5 rounded-full relative ${
                prefs.reminderNotificationsEnabled ? "bg-forest" : "bg-line"
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full bg-white absolute top-0.5 ${
                  prefs.reminderNotificationsEnabled ? "right-0.5" : "left-0.5"
                }`}
              />
            </button>
          </div>
        </div>

        <p className="text-[11.5px] font-semibold text-ink-faint uppercase tracking-wide mb-2.5">
          Account
        </p>
        <div className="card divide-y divide-line mb-6">
          <a href="/dashboard/family" className="px-4 py-3.5 flex items-center justify-between">
            <span className="text-sm font-medium">Family profiles</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="#93A099" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="btn btn-danger-outline w-full"
        >
          Sign out
        </button>

        <div className="flex gap-2.5 bg-mint-tint rounded-md2 px-3.5 py-3 mt-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="9.5" stroke="#2C6B52" strokeWidth="1.7" />
            <path d="M12 8h.01M12 11v5" stroke="#2C6B52" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          <p className="text-[11.5px] text-forest-light leading-relaxed">
            Changing your language updates all future medicine explanations automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
