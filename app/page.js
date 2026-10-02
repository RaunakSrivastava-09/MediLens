import Link from "next/link";

import Navbar from "@/components/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F7FAF8] text-[#16352A]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#DDF4E9] blur-3xl opacity-70" />
        <div className="absolute top-80 -left-40 h-80 w-80 rounded-full bg-[#E7F6EF] blur-3xl opacity-60" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Left */}
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#CBEBDD] bg-[#E4F5EC] px-4 py-2 text-sm font-semibold text-[#247153]">
                <span className="h-2 w-2 rounded-full bg-[#2F8F68]" />
                AI-powered medication companion
              </div>

              <h1 className="text-5xl font-semibold leading-[1.04] tracking-[-0.035em] text-[#15372A] sm:text-6xl lg:text-[68px]">
                Understand your
                <br />
                medicines,
                <br />
                <span className="font-serif italic text-[#2F8F68]">
                  your way.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-[#61756C]">
                Photograph a prescription or medicine strip and MediLens
                explains what it&apos;s for, when to take it, and reminds you —
                automatically, every time.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/register"
                  className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[#1E5A43] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#1E5A43]/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#174936]"
                >
                  Scan a prescription
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-xl border border-[#D6E3DD] bg-white px-6 py-3.5 text-sm font-semibold text-[#29493D] transition-all duration-200 hover:border-[#9EC8B4] hover:bg-[#F1F8F4]"
                >
                  See how it works
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-12 flex flex-wrap gap-x-10 gap-y-6 border-t border-[#DDE7E2] pt-7">
                <div>
                  <p className="text-2xl font-bold text-[#17392C]">10+</p>
                  <p className="mt-1 text-xs font-medium text-[#788B83]">
                    Regional languages
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-[#17392C]">92%</p>
                  <p className="mt-1 text-xs font-medium text-[#788B83]">
                    Avg. adherence rate
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-[#17392C]">0</p>
                  <p className="mt-1 text-xs font-medium text-[#788B83]">
                    Prompts needed
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Medicine Preview */}
            <div className="relative">
              {/* Floating notification */}
              <div className="absolute -right-2 -top-6 z-10 hidden items-center gap-3 rounded-2xl border border-[#DCEAE3] bg-white px-4 py-3 shadow-xl shadow-[#17392C]/10 sm:right-6 sm:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E5F5ED] text-[#2F8F68]">
                  ✓
                </div>

                <div>
                  <p className="text-xs font-bold text-[#214235]">
                    Medicine understood
                  </p>
                  <p className="text-[11px] text-[#81938B]">
                    AI analysis complete
                  </p>
                </div>
              </div>

              {/* Medicine Card */}
              <div className="rounded-[28px] border border-[#DDE9E3] bg-white p-5 shadow-2xl shadow-[#17392C]/10 sm:p-7">
                {/* Card header */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#83948C]">
                      Medicine detected
                    </p>

                    <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#183A2D]">
                      Amoxicillin 500mg
                    </h2>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F5EE] text-xl text-[#2F8F68]">
                    💊
                  </div>
                </div>

                {/* Medicine information */}
                <div className="rounded-2xl border border-[#E2ECE7] bg-[#F8FBF9] p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#DFF2E8] text-[#2F8F68]">
                      ✦
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#29493D]">
                        What is it for?
                      </p>

                      <p className="mt-1 text-sm leading-6 text-[#71837B]">
                        An antibiotic commonly prescribed to treat bacterial
                        infections.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dosage */}
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-[#E2ECE7] bg-white p-4">
                    <p className="text-xs font-medium text-[#8A9A93]">
                      Dosage
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#29493D]">
                      1 capsule
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#E2ECE7] bg-white p-4">
                    <p className="text-xs font-medium text-[#8A9A93]">
                      Frequency
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#29493D]">
                      2× daily
                    </p>
                  </div>
                </div>

                {/* Reminder */}
                <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#EAF6EF] px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#2F8F68] shadow-sm">
                      🔔
                    </div>

                    <div>
                      <p className="text-sm font-bold text-[#29493D]">
                        Next reminder
                      </p>
                      <p className="text-xs text-[#7A8C84]">
                        Today at 8:00 PM
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#2F8F68]">
                    Active
                  </span>
                </div>

                {/* Language */}
                <div className="mt-5 flex items-center justify-between border-t border-[#E5ECE8] pt-5">
                  <div>
                    <p className="text-xs font-medium text-[#87978F]">
                      Explanation language
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#29493D]">
                      English
                    </p>
                  </div>

                  <button
                    type="button"
                    className="rounded-xl border border-[#D6E4DD] bg-white px-4 py-2 text-xs font-semibold text-[#2F765A] transition hover:bg-[#F1F8F4]"
                  >
                    हिंदी में सुनें
                  </button>
                </div>
              </div>

              {/* Bottom floating card */}
              <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl border border-[#DDE9E3] bg-white px-4 py-3 shadow-xl shadow-[#17392C]/10 md:flex">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5EE] text-[#2F8F68]">
                  AI
                </div>

                <div>
                  <p className="text-xs font-bold text-[#29493D]">
                    Simple explanation
                  </p>
                  <p className="text-[11px] text-[#83948C]">
                    No medical jargon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="relative overflow-hidden bg-[#17392C] py-20 lg:py-24"
      >
        <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-[#2F8F68] opacity-20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#72C59D] opacity-10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section heading */}
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#B7DDC9]">
              How it works
            </span>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Healthcare information,
              <br />
              made easier to understand.
            </h2>

            <p className="mt-5 text-base leading-7 text-[#B5C9C0]">
              MediLens turns complex prescriptions into simple, accessible
              information that fits naturally into your daily routine.
            </p>
          </div>

          {/* Feature cards */}
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.09]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2F8F68]/20 text-xl text-[#8ED4B0]">
                📷
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-[#7FB99D]">
                01
              </p>

              <h3 className="mt-2 text-lg font-bold text-white">
                Scan
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#AFC4BA]">
                Upload a prescription or medicine strip using your camera or
                device.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.09]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2F8F68]/20 text-xl text-[#8ED4B0]">
                ✦
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-[#7FB99D]">
                02
              </p>

              <h3 className="mt-2 text-lg font-bold text-white">
                Understand
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#AFC4BA]">
                AI explains the medicine, dosage, purpose, and important
                information in simple language.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.09]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2F8F68]/20 text-xl text-[#8ED4B0]">
                🔔
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-[#7FB99D]">
                03
              </p>

              <h3 className="mt-2 text-lg font-bold text-white">
                Remember
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#AFC4BA]">
                Create medication reminders so important doses are easier to
                keep track of.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.09]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2F8F68]/20 text-xl text-[#8ED4B0]">
                🌐
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-[#7FB99D]">
                04
              </p>

              <h3 className="mt-2 text-lg font-bold text-white">
                Your language
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#AFC4BA]">
                Access understandable medicine information in languages that
                feel comfortable to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#F7FAF8] px-6 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] bg-[#E5F3EB] px-6 py-12 text-center sm:px-10 lg:px-16">
          <div className="mx-auto max-w-2xl">
            <span className="text-3xl">💚</span>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#17392C] sm:text-4xl">
              Understand your medicines better.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#657B70]">
              Start with a prescription and let MediLens turn complex medical
              information into something easier to understand.
            </p>

            <div className="mt-8">
              <Link
                href="/register"
                className="inline-flex items-center gap-3 rounded-xl bg-[#1E5A43] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#1E5A43]/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#174936]"
              >
                Get started
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}