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
    <nav className="flex items-center justify-between px-6 py-4 border-b border-line bg-bg">
      <Link href="/" className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-[10px] bg-forest flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2v20M2 12h20" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </div>
        <span className="font-serif text-lg font-semibold text-ink">MediLens</span>
      </Link>

      {session ? (
        <div className="flex items-center gap-4">
          <Link href="/dashboard/settings" className="text-sm text-ink-soft hover:text-ink">
            Settings
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-9 h-9 rounded-full bg-mint-tint text-forest flex items-center justify-center text-xs font-bold"
            title="Sign out"
          >
            {initials || "•"}
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-ink-soft">
            Sign in
          </Link>
          <Link href="/register" className="btn btn-primary px-5 py-2.5">
            Get started
          </Link>
        </div>
      )}
    </nav>
  );
}


