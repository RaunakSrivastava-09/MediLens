"use client";

import { useEffect, useState } from "react";
import Loader from "./Loader";

// Weekly ring + streak/missed stats, matching the "adherence" mockup.
export default function AdherenceTracker() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("/api/adherence")
      .then((res) => res.json())
      .then(setStats);
  }, []);

  if (!stats) return <Loader label="Loading adherence..." />;

  const { adherencePercent, streak, missed } = stats;

  return (
    <div>
      <div className="flex justify-center my-7">
        <div
          className="w-[168px] h-[168px] rounded-full flex items-center justify-center"
          style={{
            background: `conic-gradient(#2C6B52 0% ${adherencePercent}%, #E7E5DC ${adherencePercent}% 100%)`
          }}
        >
          <div className="w-[130px] h-[130px] rounded-full bg-bg flex flex-col items-center justify-center">
            <span className="font-serif text-[27px] font-semibold">{adherencePercent}%</span>
            <span className="text-[11px] text-ink-soft mt-0.5">this month</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1 card p-4 text-center">
          <p className="font-serif text-[22px] font-semibold">{streak}</p>
          <p className="text-[11.5px] text-ink-soft mt-1">Day streak</p>
        </div>
        <div className="flex-1 card p-4 text-center">
          <p className="font-serif text-[22px] font-semibold">{missed}</p>
          <p className="text-[11.5px] text-ink-soft mt-1">Missed dose{missed === 1 ? "" : "s"}</p>
        </div>
      </div>
    </div>
  );
}
