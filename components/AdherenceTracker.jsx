"use client";

import { useEffect, useState } from "react";

import Loader from "./Loader";

// Weekly ring + streak/missed stats

export default function AdherenceTracker() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("/api/adherence")
      .then((res) => res.json())
      .then(setStats);
  }, []);

  if (!stats) {
    return <Loader label="Loading adherence..." />;
  }

  const { adherencePercent, streak, missed } = stats;

  return (
    <div className="w-full">
      {/* Adherence Ring */}
      <div className="flex justify-center py-4 sm:py-5">
        <div
          className="w-40 h-40 sm:w-44 sm:h-44 rounded-full flex items-center justify-center"
          style={{
            background: `conic-gradient(
              #2F8F68 0% ${adherencePercent}%,
              #E8F5EE ${adherencePercent}% 100%
            )`,
          }}
        >
          <div className="w-[122px] h-[122px] sm:w-[134px] sm:h-[134px] rounded-full bg-white flex flex-col items-center justify-center">
            <span className="text-3xl sm:text-[34px] font-semibold tracking-tight text-[#17392C]">
              {adherencePercent}%
            </span>

            <span className="text-xs text-[#71837B] mt-1">
              this month
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="rounded-2xl border border-[#DDE9E3] bg-[#F8FBF9] p-4 text-center">
          <p className="text-2xl font-semibold text-[#17392C]">
            {streak}
          </p>

          <p className="text-xs text-[#71837B] mt-1">
            Day streak
          </p>
        </div>

        <div className="rounded-2xl border border-[#DDE9E3] bg-[#F8FBF9] p-4 text-center">
          <p className="text-2xl font-semibold text-[#17392C]">
            {missed}
          </p>

          <p className="text-xs text-[#71837B] mt-1">
            Missed dose{missed === 1 ? "" : "s"}
          </p>
        </div>
      </div>
    </div>
  );
}