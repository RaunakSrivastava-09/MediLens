const AVATAR_COLORS = [
  { bg: "bg-mint-tint", text: "text-forest" },
  { bg: "bg-[#F3EAFB]", text: "text-[#7A4EAA]" },
  { bg: "bg-[#EAF1FB]", text: "text-[#2E6BAF]" },
  { bg: "bg-amber-tint", text: "text-[#7A5A1E]" }
];

// One row per family member on the "Family profiles" screen — shows
// relation, active medicine count, and today's dose status.
export default function FamilyMemberCard({ member, index = 0, isOwner = false }) {
  const colors = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-3.5 card px-4 py-3.5 mb-3">
      <div className={`w-[46px] h-[46px] rounded-full flex items-center justify-center text-[15px] font-bold flex-shrink-0 ${colors.bg} ${colors.text}`}>
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{member.name}</p>
        <p className="text-[11.5px] text-ink-soft mt-0.5">
          {member.relationLabel ? `${member.relationLabel} · ` : ""}
          {member.activeMedicineCount} active medicine{member.activeMedicineCount === 1 ? "" : "s"}
        </p>
        {!isOwner && (
          <p className="text-[11px] mt-1.5 flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full inline-block ${
                member.missedToday ? "bg-amber" : "bg-forest-light"
              }`}
            />
            <span className={member.missedToday ? "text-[#7A5A1E]" : "text-ink-soft"}>
              {member.missedToday ? `Missed ${member.missedToday} dose` : "All doses taken today"}
            </span>
          </p>
        )}
      </div>
      {isOwner ? (
        <span className="chip bg-mint-tint text-forest-light">Owner</span>
      ) : (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
          <path d="M9 6l6 6-6 6" stroke="#93A099" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}
