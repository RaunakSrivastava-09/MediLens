"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

  return (
    <nav className="sticky top-0 z-50 border-b border-[#DDE9E3] bg-white/95 backdrop-blur">
      <div className="flex h-[62px] sm:h-[68px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#17392C] flex items-center justify-center shadow-sm">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 2v20M2 12h20"
                stroke="white"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <span className="text-[18px] font-semibold tracking-tight text-[#17392C]">
            MediLens
          </span>
        </Link>

        {/* Logged in */}
        {session ? (
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/settings"
              className="hidden sm:block rounded-lg px-3 py-2 text-sm text-[#71837B] hover:bg-[#F7FAF8] hover:text-[#17392C] transition"
            >
              Settings
            </Link>

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="w-9 h-9 rounded-full bg-[#E8F5EE] border border-[#DDE9E3] text-[#2F8F68] flex items-center justify-center text-xs font-bold hover:bg-[#DDF1E7] transition"
              title="Sign out"
            >
              {initials || "•"}
            </button>
          </div>
        ) : (
          /* Logged out */
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="rounded-lg px-3 py-2 text-sm font-medium text-[#71837B] hover:bg-[#F7FAF8] hover:text-[#17392C] transition"
            >
              Sign in
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-[#17392C] px-4 sm:px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#24513F] transition"
            >
              Get started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}