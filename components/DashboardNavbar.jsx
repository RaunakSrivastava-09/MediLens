"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function DashboardNavbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const initials = session?.user?.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "History", href: "/dashboard/history" },
    { name: "Reminders", href: "/dashboard/reminders" },
    { name: "Adherence", href: "/dashboard/adherence" },
    { name: "Summary", href: "/dashboard/summary" },
    { name: "Settings", href: "/dashboard/settings" },
  ];

  const isActive = (href) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname.startsWith(href);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[#DDE9E3] bg-white/95 backdrop-blur">
      <div className="w-full px-4 sm:px-6 lg:px-8">

        {/* Desktop */}
        <div className="hidden md:flex h-[68px] items-center justify-between gap-6">

          {/* Logo */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 shrink-0"
          >
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

          {/* Navigation + Account */}
          <div className="flex items-center gap-5 min-w-0">
            <div className="flex items-center gap-1">
              {links.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3 py-2 rounded-lg text-[13px] transition-all ${
                      active
                        ? "bg-[#E8F5EE] text-[#2F8F68] font-semibold"
                        : "text-[#71837B] hover:bg-[#F7FAF8] hover:text-[#17392C]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Profile */}
            <button
              onClick={handleSignOut}
              title="Sign out"
              className="w-9 h-9 rounded-full bg-[#E8F5EE] border border-[#DDE9E3] text-[#2F8F68] flex items-center justify-center text-xs font-bold hover:bg-[#DDF1E7] transition shrink-0"
            >
              {initials || "•"}
            </button>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">

          {/* Top Bar */}
          <div className="h-[62px] flex items-center justify-between">

            {/* Logo */}
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5"
            >
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

            {/* Menu + Profile */}
            <div className="flex items-center gap-2">

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-9 h-9 rounded-xl border border-[#DDE9E3] bg-[#F8FBF9] flex items-center justify-center text-[#17392C]"
                aria-label="Menu"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  {menuOpen ? (
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  ) : (
                    <path
                      d="M4 7h16M4 12h16M4 17h16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  )}
                </svg>
              </button>

              {/* Profile */}
              <button
                onClick={handleSignOut}
                title="Sign out"
                className="w-9 h-9 rounded-full bg-[#E8F5EE] border border-[#DDE9E3] text-[#2F8F68] flex items-center justify-center text-xs font-bold"
              >
                {initials || "•"}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="pb-3 pt-1 space-y-1">
              {links.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-xl px-4 py-2.5 text-sm transition ${
                      active
                        ? "bg-[#E8F5EE] text-[#2F8F68] font-semibold"
                        : "text-[#71837B] hover:bg-[#F7FAF8] hover:text-[#17392C]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}