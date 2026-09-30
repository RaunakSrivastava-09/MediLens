import Link from "next/link";

// Shown on the dashboard before a user has scanned any prescription yet —
// matches the "empty-state" mockup screen.
export default function EmptyState() {
  return (
    <div className="text-center py-10">
      <div className="w-[140px] h-[140px] rounded-full bg-mint-tint flex items-center justify-center mx-auto mb-8">
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="7" width="18" height="13" rx="2" stroke="#173B2E" strokeWidth="1.8" />
          <path d="M8 7l1.5-3h5L16 7" stroke="#173B2E" strokeWidth="1.8" />
          <circle cx="12" cy="13.5" r="3.4" stroke="#173B2E" strokeWidth="1.8" />
        </svg>
      </div>

      <h2 className="font-serif text-2xl mb-3">No medicines yet</h2>
      <p className="text-sm text-ink-soft max-w-xs mx-auto mb-8 leading-relaxed">
        Scan your first prescription or medicine strip and MediLens will explain it, track it, and remind
        you to take it.
      </p>

      <Link href="/upload" className="btn btn-primary w-full max-w-xs mx-auto mb-6">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="7" width="18" height="13" rx="2" stroke="#fff" strokeWidth="1.8" />
          <circle cx="12" cy="13.5" r="3.2" stroke="#fff" strokeWidth="1.8" />
        </svg>
        Scan your first prescription
      </Link>

      <div className="card px-5 py-4 max-w-xs mx-auto flex gap-2.5 text-left">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
          <circle cx="12" cy="12" r="9.5" stroke="#5B6B64" strokeWidth="1.6" />
          <path d="M12 8h.01M12 11v5" stroke="#5B6B64" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <p className="text-[11.5px] text-ink-soft leading-relaxed">
          Your data stays private to your account unless you choose to share it with family.
        </p>
      </div>
    </div>
  );
}
