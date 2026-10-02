const AVATAR_COLORS = [
  { bg: "bg-[#E8F5EE]", text: "text-[#2F8F68]" },
  { bg: "bg-[#F3EAFB]", text: "text-[#7A4EAA]" },
  { bg: "bg-[#EAF1FB]", text: "text-[#2E6BAF]" },
  { bg: "bg-[#FFF8EA]", text: "text-[#7A5A1E]" },
];

// One row per family member on the "Family profiles" screen
export default function FamilyMemberCard({ member, index = 0, isOwner = false }) {
  const colors = AVATAR_COLORS[index % AVATAR_COLORS.length];

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-3.5 rounded-2xl border border-[#DDE9E3] bg-white px-4 py-3.5 mb-3 shadow-sm">
      <div
        className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${colors.bg} ${colors.text}`}
      >
        {initials}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#17392C] truncate">
          {member.name}
        </p>

        <p className="text-[11.5px] text-[#71837B] mt-0.5 truncate">
          {member.relationLabel ? `${member.relationLabel} · ` : ""}
          {member.activeMedicineCount} active medicine
          {member.activeMedicineCount === 1 ? "" : "s"}
        </p>

        {!isOwner && (
          <p className="text-[11px] mt-1.5 flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full flex-shrink-0 ${
                member.missedToday ? "bg-[#C98A2C]" : "bg-[#2F8F68]"
              }`}
            />

            <span
              className={
                member.missedToday
                  ? "text-[#7A5A1E]"
                  : "text-[#71837B]"
              }
            >
              {member.missedToday
                ? `Missed ${member.missedToday} dose`
                : "All doses taken today"}
            </span>
          </p>
        )}
      </div>

      {isOwner ? (
        <span className="flex-shrink-0 rounded-full bg-[#E8F5EE] px-2.5 py-1 text-[10px] font-semibold text-[#2F8F68]">
          Owner
        </span>
      ) : (
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          className="flex-shrink-0"
        >
          <path
            d="M9 6l6 6-6 6"
            stroke="#93A099"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}