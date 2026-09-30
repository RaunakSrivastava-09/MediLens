"use client";

import { useState } from "react";

// Converts the given text to speech using the browser's built-in Web
// Speech API. No AI call, no server round-trip — the explanation text
// has already been generated (and localized) by the backend; this
// component just speaks it aloud on request.
export default function VoiceButton({ text, languageCode = "en", label }) {
  const [speaking, setSpeaking] = useState(false);

  const LANG_TAGS = {
    en: "en-US", hi: "hi-IN", bn: "bn-IN", ta: "ta-IN", te: "te-IN",
    mr: "mr-IN", gu: "gu-IN", kn: "kn-IN", ml: "ml-IN", pa: "pa-IN", ur: "ur-IN"
  };

  function speak() {
    if (!text || typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANG_TAGS[languageCode] || "en-US";
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }

  function stop() {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }

  return (
    <div className="flex items-center justify-between bg-mint-tint rounded-md2 px-4 py-3.5">
      <div className="flex items-center gap-2.5">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M4 10v4h4l5 4V6L8 10H4z" stroke="#173B2E" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M17 9a4.2 4.2 0 010 6" stroke="#173B2E" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
        <span className="text-sm font-semibold text-forest">{label || "Listen to explanation"}</span>
      </div>
      <button
        onClick={speaking ? stop : speak}
        className="w-9 h-9 rounded-full bg-forest flex items-center justify-center flex-shrink-0"
        aria-label={speaking ? "Stop" : "Play"}
      >
        {speaking ? (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <rect x="6" y="6" width="12" height="12" rx="1.5" fill="#fff" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M8 5v14l11-7z" fill="#fff" />
          </svg>
        )}
      </button>
    </div>
  );
}
