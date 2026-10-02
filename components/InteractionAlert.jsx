import Link from "next/link";

// Compact banner shown on the dashboard when an interaction was flagged.
export function InteractionBanner({ interaction, detailHref }) {
  if (!interaction?.hasInteraction) return null;

  return (
    <Link
      href={detailHref || "#"}
      className="flex items-start gap-2.5 rounded-2xl border border-[#F0DFC1] bg-[#FFF8EA] px-3.5 py-3 mb-5 hover:bg-[#FFF4DF] transition"
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        className="flex-shrink-0 mt-0.5"
      >
        <path
          d="M12 3l9 16H3z"
          stroke="#C98A2C"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M12 10v4M12 17h.01"
          stroke="#C98A2C"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>

      <p className="text-[11px] sm:text-xs text-[#7A5A1E] leading-relaxed">
        Possible interaction between {interaction.withMedicine} and your other
        medicines — tap to see details.
      </p>
    </Link>
  );
}

// Full detail card
export default function InteractionDetail({
  interaction,
  medicineA,
  medicineB,
}) {
  return (
    <div className="text-center">
      <div className="w-20 h-20 rounded-full bg-[#FFF8EA] border border-[#F0DFC1] flex items-center justify-center mx-auto mb-5">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 3l9 16H3z"
            stroke="#C98A2C"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M12 10v4M12 17h.01"
            stroke="#C98A2C"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <h2 className="text-xl font-semibold text-[#17392C] mb-2">
        Possible interaction found
      </h2>

      <p className="text-sm text-[#71837B] mb-5 max-w-sm mx-auto leading-relaxed">
        Detected automatically when {medicineA} was added to your active
        medicines.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
        <span className="rounded-xl border border-[#DDE9E3] bg-[#F8FBF9] px-3.5 py-2 text-sm font-semibold text-[#17392C]">
          {medicineA}
        </span>

        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="#93A099"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="rounded-xl border border-[#DDE9E3] bg-[#F8FBF9] px-3.5 py-2 text-sm font-semibold text-[#17392C]">
          {medicineB}
        </span>
      </div>

      <div className="text-left space-y-4">
        <div>
          <p className="text-[10px] font-semibold text-[#83948C] uppercase tracking-wider mb-1.5">
            What this means
          </p>

          <p className="text-sm text-[#4F625A] leading-relaxed">
            {interaction.explanation}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-semibold text-[#83948C] uppercase tracking-wider mb-1.5">
            Suggested action
          </p>

          <p className="text-sm text-[#4F625A] leading-relaxed">
            {interaction.suggestedAction}
          </p>
        </div>
      </div>
    </div>
  );
}