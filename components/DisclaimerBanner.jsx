export default function DisclaimerBanner({ text }) {
  return (
    <div className="flex gap-2.5 bg-amber-tint rounded-md2 px-3.5 py-3">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
        <circle cx="12" cy="12" r="9.5" stroke="#C98A2C" strokeWidth="1.7" />
        <path d="M12 8h.01M12 11v5" stroke="#C98A2C" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
      <p className="text-[11.5px] text-[#7A5A1E] leading-relaxed">
        {text || "Informational only — confirm with your pharmacist or doctor before use."}
      </p>
    </div>
  );
}
