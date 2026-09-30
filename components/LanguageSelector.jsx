"use client";

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी — Hindi" },
  { code: "bn", label: "বাংলা — Bengali" },
  { code: "ta", label: "தமிழ் — Tamil" },
  { code: "te", label: "తెలుగు — Telugu" },
  { code: "mr", label: "मराठी — Marathi" },
  { code: "gu", label: "ગુજરાતી — Gujarati" },
  { code: "kn", label: "ಕನ್ನಡ — Kannada" },
  { code: "ml", label: "മലയാളം — Malayalam" },
  { code: "pa", label: "ਪੰਜਾਬੀ — Punjabi" },
  { code: "ur", label: "اردو — Urdu" }
];

// A simple dropdown used both at signup (setting the saved default) and
// inline on a medicine card (a one-off override, per the "🌐 override"
// idea discussed for the explanation screen).
export default function LanguageSelector({ value, onChange, className = "" }) {
  return (
    <select
      className={`field ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {SUPPORTED_LANGUAGES.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  );
}
