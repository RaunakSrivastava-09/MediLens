"use client";

import { useEffect, useState } from "react";
import VoiceButton from "./VoiceButton";
import DisclaimerBanner from "./DisclaimerBanner";
import Loader from "./Loader";

const ICON_BG = ["bg-mint-tint", "bg-[#EAF1FB]", "bg-[#F3EAFB]"];
const ICON_COLOR = ["#2C6B52", "#2E6BAF", "#7A4EAA"];

export function MedicineListItem({ medicine, index = 0, href }) {
  const bg = ICON_BG[index % ICON_BG.length];
  const color = ICON_COLOR[index % ICON_COLOR.length];

  return (
    <a href={href} className="flex items-center gap-3.5 card px-4 py-3.5 mb-2.5">
      <div className={`w-[42px] h-[42px] rounded-[11px] flex items-center justify-center flex-shrink-0 ${bg}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="10" width="18" height="8" rx="4" stroke={color} strokeWidth="1.8" />
          <path d="M9 10v8" stroke={color} strokeWidth="1.8" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13.5px] font-semibold truncate">{medicine.name}</p>
        <p className="text-[11.5px] text-ink-soft mt-0.5">
          {medicine.frequency} {medicine.dosage ? `· ${medicine.dosage}` : ""}
        </p>
      </div>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M9 6l6 6-6 6" stroke="#93A099" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

// Full medicine detail view: fetches the AI explanation (cached or fresh)
// and renders it with the voice button, matching the "medicine-detail"
// mockup screen.
export default function MedicineCard({ medicineName, languageCode = "en" }) {
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState(languageCode);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch("/api/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ medicineName, language: lang })
    })
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setExplanation(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [medicineName, lang]);

  if (loading) return <Loader label="Explaining this medicine..." />;
  if (!explanation) return <p className="text-sm text-danger">Could not load explanation.</p>;

  const spokenText = `${explanation.purpose}. Common side effects: ${explanation.sideEffects}. ${explanation.timing}`;

  return (
    <div>
      <h2 className="font-serif text-xl mb-3">{medicineName}</h2>

      <div className="mb-4">
        <VoiceButton text={spokenText} languageCode={lang} label="Listen to explanation" />
      </div>

      <div className="mb-4">
        <p className="text-[11.5px] font-semibold text-ink-faint uppercase tracking-wide mb-1.5">Used for</p>
        <p className="text-[13.5px] leading-relaxed">{explanation.purpose}</p>
      </div>
      <div className="mb-4">
        <p className="text-[11.5px] font-semibold text-ink-faint uppercase tracking-wide mb-1.5">
          Common side effects
        </p>
        <p className="text-[13.5px] leading-relaxed">{explanation.sideEffects}</p>
      </div>
      <div className="mb-5">
        <p className="text-[11.5px] font-semibold text-ink-faint uppercase tracking-wide mb-1.5">Timing</p>
        <p className="text-[13.5px] leading-relaxed">{explanation.timing}</p>
      </div>

      <div className="mb-5">
        <DisclaimerBanner />
      </div>
    </div>
  );
}
