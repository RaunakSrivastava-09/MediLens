"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import InteractionDetail from "@/components/InteractionAlert";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import Loader from "@/components/Loader";

// params.id here is the newly-added medicine name (URL-encoded), passed
// as a route param right after upload when an interaction was flagged.

export default function InteractionDetailPage({ params }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [interaction, setInteraction] = useState(null);

  const newMedicineName = decodeURIComponent(params.id);

  useEffect(() => {
    fetch("/api/interactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newMedicineName }),
    })
      .then((res) => res.json())
      .then(setInteraction);
  }, [newMedicineName]);

  return (
    <div className="min-h-screen bg-[#F7FAF8] text-[#16352A]">
      <Navbar />

      <main className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-7 sm:py-9 lg:py-11">
        {/* Header */}
        <div className="mb-7 sm:mb-9">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#5F736A] hover:text-[#17392C] transition-colors mb-5"
          >
            <span className="w-9 h-9 rounded-full bg-white border border-[#DDE9E3] flex items-center justify-center shadow-sm">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            Back
          </button>

          <div className="inline-flex items-center gap-2 rounded-full bg-[#E4F5EC] px-3 py-1.5 text-[11px] font-semibold text-[#2F8F68] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2F8F68]" />
            Medication safety
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-[36px] leading-tight font-semibold tracking-[-0.03em]">
            Interaction check.
            <br />
            <span className="font-serif italic font-normal text-[#2F8F68]">
              Let&apos;s keep your medicines safe.
            </span>
          </h1>

          <p className="mt-3 max-w-2xl text-sm sm:text-[15px] leading-6 text-[#71837B]">
            We&apos;re checking your new medicine against your currently
            active medicines for known interactions.
          </p>
        </div>

        {/* Medicine being checked */}
        <section className="bg-white border border-[#DDE9E3] rounded-[28px] p-5 sm:p-6 mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F5EE] flex items-center justify-center shrink-0">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M8.5 3.5h7A2.5 2.5 0 0118 6v12a2.5 2.5 0 01-2.5 2.5h-7A2.5 2.5 0 016 18V6a2.5 2.5 0 012.5-2.5Z"
                  stroke="#2F8F68"
                  strokeWidth="1.8"
                />
                <path
                  d="M9 8h6M9 12h6M9 16h3"
                  stroke="#2F8F68"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[#83948C]">
                New medicine
              </p>

              <p className="text-base sm:text-lg font-semibold text-[#16352A] mt-1 break-words">
                {newMedicineName}
              </p>
            </div>
          </div>
        </section>

        {/* Loading */}
        {!interaction ? (
          <div className="bg-white border border-[#DDE9E3] rounded-[28px] p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-11 h-11 rounded-2xl bg-[#E8F5EE] flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="animate-pulse"
                >
                  <path
                    d="M12 3v3M12 18v3M3 12h3M18 12h3M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M18.36 5.64l-2.12 2.12M7.76 16.24l-2.12 2.12"
                    stroke="#2F8F68"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div>
                <p className="font-semibold text-[#16352A]">
                  Checking your medicines
                </p>
                <p className="text-xs text-[#83948C] mt-1">
                  Looking for known interactions...
                </p>
              </div>
            </div>

            <Loader label="Checking for interactions..." />
          </div>
        ) : interaction.hasInteraction ? (
          <>
            {/* Interaction warning */}
            <section className="bg-white border border-[#DDE9E3] rounded-[28px] overflow-hidden">
              <div className="bg-[#FFF5EE] border-b border-[#F1DED0] px-5 sm:px-7 py-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F8E5D7] flex items-center justify-center shrink-0">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 3L21 19H3L12 3Z"
                        stroke="#A66A43"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 9v4M12 16.5v.5"
                        stroke="#A66A43"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#75472D]">
                      Potential interaction found
                    </p>
                    <p className="text-xs text-[#9A715B] mt-1 leading-5">
                      Review the information below before taking the medicine
                      together.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <InteractionDetail
                  interaction={interaction}
                  medicineA={newMedicineName}
                  medicineB={interaction.withMedicine}
                />
              </div>
            </section>

            {/* Disclaimer */}
            <div className="mt-5">
              <DisclaimerBanner text="This is informational only, based on general interaction data — always confirm with your pharmacist or doctor." />
            </div>

            {/* Action */}
            <button
              className="w-full mt-5 flex items-center justify-center gap-2 rounded-2xl bg-[#17392C] text-white px-5 py-4 text-sm font-semibold shadow-lg shadow-[#17392C]/10 hover:bg-[#214A39] transition-colors"
              onClick={() => router.push("/dashboard")}
            >
              Got it
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </>
        ) : (
          /* No interaction */
          <section className="bg-white border border-[#DDE9E3] rounded-[28px] p-6 sm:p-8">
            <div className="w-14 h-14 rounded-2xl bg-[#E8F5EE] flex items-center justify-center mb-5">
              <svg
                width="25"
                height="25"
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

            <p className="text-lg font-semibold text-[#16352A]">
              No known interaction found
            </p>

            <p className="text-sm text-[#71837B] leading-6 mt-2">
              No known interaction was found between{" "}
              <span className="font-semibold text-[#16352A]">
                {newMedicineName}
              </span>{" "}
              and your other active medicines.
            </p>

            <div className="mt-6 rounded-2xl bg-[#E8F5EE] px-4 py-4">
              <p className="text-xs sm:text-[13px] leading-5 text-[#557267]">
                This result is based on general interaction data. Continue to
                follow your doctor&apos;s or pharmacist&apos;s instructions.
              </p>
            </div>

            <button
              className="w-full mt-5 flex items-center justify-center gap-2 rounded-2xl bg-[#17392C] text-white px-5 py-4 text-sm font-semibold shadow-lg shadow-[#17392C]/10 hover:bg-[#214A39] transition-colors"
              onClick={() => router.push("/dashboard")}
            >
              Back to dashboard
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </section>
        )}

        {/* Footer */}
        <p className="text-center text-[11px] text-[#9AA9A3] mt-8 pb-3">
          MediLens · Your medication companion
        </p>
      </main>
    </div>
  );
}