import Link from "next/link";

// Compact banner shown on the dashboard when an interaction was flagged.
// Links through to the full detail page (app/interactions/[id]/page.js).
export function InteractionBanner({ interaction, detailHref }) {
  if (!interaction?.hasInteraction) return null;

  return (
    <Link
      href={detailHref || "#"}
      className="flex gap-2.5 bg-amber-tint rounded-md2 px-3.5 py-3.5 mb-6"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
        <path d="M12 3l9 16H3z" stroke="#C98A2C" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 10v4M12 17h.01" stroke="#C98A2C" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <p className="text-[12.5px] text-[#7A5A1E] leading-relaxed">
        Possible interaction between {interaction.withMedicine} and your other medicines —
        tap to see details.
      </p>
    </Link>
  );
}

// Full detail card, matching the "interaction-detail" mockup screen.
export default function InteractionDetail({ interaction, medicineA, medicineB }) {
  return (
    <div className="text-center">
      <div className="w-[88px] h-[88px] rounded-full bg-amber-tint flex items-center justify-center mx-auto mb-5">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <path d="M12 3l9 16H3z" stroke="#C98A2C" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M12 10v4M12 17h.01" stroke="#C98A2C" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>

      <h2 className="text-xl font-semibold mb-2">Possible interaction found</h2>
      <p className="text-sm text-ink-soft mb-6 max-w-xs mx-auto leading-relaxed">
        Detected automatically when {medicineA} was added to your active medicines.
      </p>

      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="card px-4 py-2.5 text-sm font-semibold">{medicineA}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="#93A099" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="card px-4 py-2.5 text-sm font-semibold">{medicineB}</span>
      </div>

      <div className="text-left mb-4">
        <p className="text-[11.5px] font-semibold text-ink-faint uppercase tracking-wide mb-1.5">
          What this means
        </p>
        <p className="text-sm leading-relaxed">{interaction.explanation}</p>
      </div>

      <div className="text-left mb-5">
        <p className="text-[11.5px] font-semibold text-ink-faint uppercase tracking-wide mb-1.5">
          Suggested action
        </p>
        <p className="text-sm leading-relaxed">{interaction.suggestedAction}</p>
      </div>
    </div>
  );
}
