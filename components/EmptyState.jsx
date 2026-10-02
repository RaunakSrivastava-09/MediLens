import Link from "next/link";

// Shown on the dashboard before a user has scanned any prescription yet

export default function EmptyState() {
  return (
    <div className="w-full text-center py-8 sm:py-10">
      {/* Icon */}
      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#E8F5EE] flex items-center justify-center mx-auto mb-6 sm:mb-7">
        <svg
          width="46"
          height="46"
          viewBox="0 0 24 24"
          fill="none"
        >
          <rect
            x="3"
            y="7"
            width="18"
            height="13"
            rx="2"
            stroke="#17392C"
            strokeWidth="1.8"
          />
          <path
            d="M8 7l1.5-3h5L16 7"
            stroke="#17392C"
            strokeWidth="1.8"
          />
          <circle
            cx="12"
            cy="13.5"
            r="3.4"
            stroke="#17392C"
            strokeWidth="1.8"
          />
        </svg>
      </div>

      {/* Heading */}
      <h2 className="text-xl sm:text-2xl font-semibold text-[#17392C] mb-2.5">
        No medicines yet
      </h2>

      {/* Description */}
      <p className="text-sm text-[#71837B] max-w-sm mx-auto mb-6 sm:mb-7 px-2 leading-relaxed">
        Scan your first prescription or medicine strip and MediLens will
        explain it, track it, and remind you to take it.
      </p>

      {/* Button */}
      <Link
        href="/upload"
        className="w-full max-w-sm mx-auto mb-5 flex items-center justify-center gap-2 rounded-xl bg-[#17392C] px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-[#24513F] transition"
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
        >
          <rect
            x="3"
            y="7"
            width="18"
            height="13"
            rx="2"
            stroke="white"
            strokeWidth="1.8"
          />
          <circle
            cx="12"
            cy="13.5"
            r="3.2"
            stroke="white"
            strokeWidth="1.8"
          />
        </svg>

        Scan your first prescription
      </Link>

      {/* Privacy Note */}
      <div className="w-full max-w-sm mx-auto flex items-start gap-2.5 text-left rounded-2xl border border-[#DDE9E3] bg-[#F8FBF9] px-4 py-3.5">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          className="flex-shrink-0 mt-0.5"
        >
          <circle
            cx="12"
            cy="12"
            r="9.5"
            stroke="#71837B"
            strokeWidth="1.6"
          />
          <path
            d="M12 8h.01M12 11v5"
            stroke="#71837B"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>

        <p className="text-[11px] sm:text-xs text-[#71837B] leading-relaxed">
          Your data stays private to your account unless you choose to share
          it with family.
        </p>
      </div>
    </div>
  );
}