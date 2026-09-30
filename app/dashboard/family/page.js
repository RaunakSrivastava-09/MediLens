import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Prescription from "@/models/Prescription";
import DashboardNavbar from "@/components/DashboardNavbar";
import FamilyMemberCard from "@/components/FamilyProfile";

export default async function FamilyPage() {
  const session = await getServerSession(authOptions);
  await connectDB();

  const dependents = await User.find({ managedBy: session?.user?.id }).lean();

  const membersWithCounts = await Promise.all(
    dependents.map(async (dep) => {
      const activeCount = await Prescription.countDocuments({ userId: dep._id, status: "active" });
      return { ...dep, name: dep.name, activeMedicineCount: activeCount, missedToday: 0 };
    })
  );

  const ownActiveCount = await Prescription.countDocuments({
    userId: session?.user?.id,
    status: "active"
  });

  return (
    <div>
      <DashboardNavbar />
      <div className="max-w-md mx-auto px-6 py-8">
        <h1 className="text-lg font-semibold mb-6">Family profiles</h1>

        <FamilyMemberCard
          member={{ name: `${session?.user?.name} (You)`, activeMedicineCount: ownActiveCount }}
          index={0}
          isOwner
        />

        {membersWithCounts.map((m, i) => (
          <FamilyMemberCard key={m._id} member={m} index={i + 1} />
        ))}

        <button className="w-full flex items-center justify-center gap-2 border-[1.6px] border-dashed border-forest rounded-md2 py-4 text-forest text-sm font-semibold mt-2 mb-6">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="#173B2E" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Add a family member
        </button>

        {membersWithCounts.length > 0 && (
          <div className="flex gap-2.5 bg-amber-tint rounded-md2 px-3.5 py-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5">
              <path d="M12 3l9 16H3z" stroke="#C98A2C" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M12 10v4M12 17h.01" stroke="#C98A2C" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <p className="text-[11.5px] text-[#7A5A1E] leading-relaxed">
              You&apos;ll be notified if a family member misses a scheduled dose.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
