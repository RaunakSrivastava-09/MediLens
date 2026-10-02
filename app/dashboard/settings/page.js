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
      body: JSON.stringify({ [key]: value }),
    });
  }

  if (!prefs) {
    return (
      <div className="min-h-screen bg-[#F7FAF8]">
        <DashboardNavbar />

        <main className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="rounded-[28px] border border-[#DDE9E3] bg-white p-10 shadow-sm">
            <Loader label="Loading settings..." />
          </div>
        </main>
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
    <div className="min-h-screen bg-[#F7FAF8] text-[#17392C]">
      <DashboardNavbar />

      <main className="mx-auto w-full max-w-5xl px-5 py-7 sm:px-6 lg:px-8 lg:py-10">
        {/* ───────────────── HEADER ───────────────── */}
        <div className="mb-8 sm:mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#CBEBDD] bg-[#E4F5EC] px-3.5 py-1.5 text-xs font-semibold text-[#247153]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2F8F68]" />
            Settings
          </div>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Account &{" "}
            <span className="font-serif italic text-[#2F8F68]">
              preferences.
            </span>
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#71837B] sm:text-[15px]">
            Manage your MediLens profile, medication preferences, notifications,
            and family settings.
          </p>
        </div>

        {/* ───────────────── PROFILE ───────────────── */}
        <section className="mb-8 overflow-hidden rounded-[30px] border border-[#DDE9E3] bg-white shadow-sm">
          <div className="relative overflow-hidden bg-[#17392C] px-6 py-7 sm:px-8 sm:py-8">
            <div className="absolute -right-20 -top-24 h-52 w-52 rounded-full bg-[#2F8F68]/30 blur-3xl" />
            <div className="absolute -bottom-24 left-1/3 h-44 w-44 rounded-full bg-[#2F8F68]/20 blur-3xl" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[24px] bg-[#E4F5EC] text-xl font-bold text-[#247153] shadow-lg">
                {initials}
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8ED4B0]">
                  Your account
                </p>

                <h2 className="mt-1 truncate text-xl font-bold text-white sm:text-2xl">
                  {prefs.name}
                </h2>

                <p className="mt-1 truncate text-sm text-[#B5C9C0]">
                  {prefs.email}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 divide-y divide-[#DDE9E3] sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <div className="px-6 py-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#899A92]">
                Account status
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#2F8F68]" />
                <span className="text-sm font-semibold text-[#17392C]">
                  Active
                </span>
              </div>
            </div>

            <div className="px-6 py-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#899A92]">
                Medication support
              </p>

              <p className="mt-2 text-sm font-semibold text-[#17392C]">
                Personalized
              </p>
            </div>
          </div>
        </section>

        {/* ───────────────── PREFERENCES ───────────────── */}
        <section className="mb-8">
          <div className="mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#83948C]">
              Preferences
            </p>

            <h2 className="mt-1 text-xl font-bold text-[#17392C]">
              How MediLens works for you
            </h2>
          </div>

          <div className="overflow-hidden rounded-[30px] border border-[#DDE9E3] bg-white shadow-sm">
            {/* Language */}
            <div className="p-5 sm:p-6 lg:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E8F5EE] text-[#2F8F68]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 5h10M9 3v2M7 5c.7 4 2.7 6.8 6 8.5"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13c2.7-1.2 4.8-3.3 6-6"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 14h6M17 11v3M15 20l3-6 3 6M16 18h4"
                      />
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#17392C]">
                      Preferred language
                    </h3>

                    <p className="mt-1 max-w-md text-xs leading-5 text-[#788B83]">
                      Choose the language MediLens uses for future medicine
                      explanations.
                    </p>
                  </div>
                </div>

                <div className="w-full sm:w-52">
                  <LanguageSelector
                    value={prefs.preferredLanguage}
                    onChange={(v) =>
                      updatePref("preferredLanguage", v)
                    }
                  />
                </div>
              </div>
            </div>

            <div className="h-px bg-[#DDE9E3]" />

            {/* Voice */}
            <div className="flex items-center justify-between gap-5 p-5 sm:p-6 lg:p-7">
              <div className="flex min-w-0 gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E8F5EE] text-[#2F8F68]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 10v4h3l4 3V7l-4 3H4Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 9.5a4 4 0 0 1 0 5"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.5 7a7.5 7.5 0 0 1 0 10"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#17392C]">
                    Voice output
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#788B83]">
                    Hear medicine explanations aloud.
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  updatePref(
                    "voiceOutputEnabled",
                    !prefs.voiceOutputEnabled
                  )
                }
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  prefs.voiceOutputEnabled
                    ? "bg-[#2F8F68]"
                    : "bg-[#D5DFDA]"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
                    prefs.voiceOutputEnabled
                      ? "right-1"
                      : "left-1"
                  }`}
                />
              </button>
            </div>

            <div className="h-px bg-[#DDE9E3]" />

            {/* Notifications */}
            <div className="flex items-center justify-between gap-5 p-5 sm:p-6 lg:p-7">
              <div className="flex min-w-0 gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E8F5EE] text-[#2F8F68]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 21h4"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#17392C]">
                    Reminder notifications
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#788B83]">
                    Receive notifications for your medication schedule.
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  updatePref(
                    "reminderNotificationsEnabled",
                    !prefs.reminderNotificationsEnabled
                  )
                }
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  prefs.reminderNotificationsEnabled
                    ? "bg-[#2F8F68]"
                    : "bg-[#D5DFDA]"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
                    prefs.reminderNotificationsEnabled
                      ? "right-1"
                      : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* ───────────────── ACCOUNT ───────────────── */}
        <section className="mb-8">
          <div className="mb-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#83948C]">
              Account
            </p>

            <h2 className="mt-1 text-xl font-bold text-[#17392C]">
              Manage your account
            </h2>
          </div>

          <div className="overflow-hidden rounded-[30px] border border-[#DDE9E3] bg-white shadow-sm">
            {/* Family */}
            <a
              href="/dashboard/family"
              className="group flex items-center justify-between gap-4 p-5 transition-colors hover:bg-[#F7FAF8] sm:p-6"
            >
              <div className="flex min-w-0 gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E8F5EE] text-[#2F8F68]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20"
                    />
                    <circle cx="9.5" cy="7" r="3" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 11a3 3 0 1 0 0-6"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 20v-1.5a4 4 0 0 0-3-3.87"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#17392C]">
                    Family profiles
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#788B83]">
                    Manage medication profiles for your family members.
                  </p>
                </div>
              </div>

              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0 transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M9 6l6 6-6 6"
                  stroke="#7D9087"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <div className="h-px bg-[#DDE9E3]" />

            {/* Sign out */}
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex min-w-0 gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FFF0F0] text-[#B34D4D]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 17l5-5-5-5"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12H3"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#17392C]">
                    Sign out
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#788B83]">
                    Sign out of your MediLens account on this device.
                  </p>
                </div>
              </div>

              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#E4B8B8] bg-[#FFF9F9] px-5 py-2.5 text-xs font-bold text-[#B34D4D] transition-all hover:border-[#D99B9B] hover:bg-[#FFF0F0] sm:w-auto"
              >
                Sign out
              </button>
            </div>
          </div>
        </section>

        {/* ───────────────── INFO ───────────────── */}
        <div className="flex gap-3 rounded-[24px] border border-[#CBEBDD] bg-[#E8F5EE] px-4 py-4 sm:px-5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#2C6B52]">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="9.5"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <path
                d="M12 8h.01M12 11v5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <p className="text-xs leading-5 text-[#2C6B52]">
            Changing your language updates all future medicine explanations
            automatically.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 py-8 text-center text-[11px] text-[#899594] sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2F8F68]" />
          MediLens · Your medication companion
        </div>
      </main>
    </div>
  );
}