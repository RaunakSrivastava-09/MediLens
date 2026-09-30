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
      body: JSON.stringify({ newMedicineName })
    })
      .then((res) => res.json())
      .then(setInteraction);
  }, [newMedicineName]);

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.back()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 6l-6 6 6 6" stroke="#152420" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="text-base font-semibold">Interaction check</h1>
        </div>

        {!interaction ? (
          <Loader label="Checking for interactions..." />
        ) : interaction.hasInteraction ? (
          <>
            <InteractionDetail
              interaction={interaction}
              medicineA={newMedicineName}
              medicineB={interaction.withMedicine}
            />
            <div className="mt-5">
              <DisclaimerBanner text="This is informational only, based on general interaction data — always confirm with your pharmacist or doctor." />
            </div>
            <button className="btn btn-primary w-full mt-5" onClick={() => router.push("/dashboard")}>
              Got it
            </button>
          </>
        ) : (
          <p className="text-sm text-ink-soft">
            No known interaction found between {newMedicineName} and your other active medicines.
          </p>
        )}
      </div>
    </div>
  );
}
