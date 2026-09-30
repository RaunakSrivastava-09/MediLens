export default function RefillAlertBanner({ medicineName, daysLeft }) {
  return (
    <div className="flex gap-2.5 bg-amber-tint rounded-md2 px-3.5 py-3">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
        <path d="M4.5 9a7.5 7.5 0 0113-5M19.5 15a7.5 7.5 0 01-13 5" stroke="#C98A2C" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17.5 4v4h-4M6.5 20v-4h4" stroke="#C98A2C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="text-[11.5px] text-[#7A5A1E] leading-relaxed">
        {medicineName} course ends in {daysLeft} day{daysLeft === 1 ? "" : "s"} — a refill may be needed soon.
      </p>
    </div>
  );
}
