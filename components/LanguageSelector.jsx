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
  { code: "ur", label: "اردو — Urdu" },
];

export default function LanguageSelector({
  value,
  onChange,
  className = "",
}) {
  return (
    <select
      className={`w-full rounded-xl border border-[#DDE9E3] bg-[#F8FBF9] px-3.5 py-3 text-sm text-[#17392C] outline-none transition focus:border-[#2F8F68] focus:ring-1 focus:ring-[#2F8F68]/20 ${className}`}
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