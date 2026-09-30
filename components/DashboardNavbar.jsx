
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function DashboardNavbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

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

  return (
    <nav className="border-b border-line bg-bg">
      <div className="w-full px-4 sm:px-6">

        {/* Desktop Navbar */}
        <div className="hidden md:flex h-[68px] items-center justify-between gap-4">

          {/* Logo */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 shrink-0"
          >
            <div className="w-9 h-9 rounded-[10px] bg-forest flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2v20M2 12h20"
                  stroke="#fff"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <span className="font-serif text-lg font-semibold text-ink">
              MediLens
            </span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-4 min-w-0">

            {/* Navigation */}
            <div className="flex items-center gap-3 whitespace-nowrap">
              {links.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-1.5 text-[13px] whitespace-nowrap transition ${
                      active
                        ? "text-forest font-semibold"
                        : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Account */}
            <button
              onClick={() =>
                signOut({ callbackUrl: "/login" })
              }
              className="w-9 h-9 rounded-full bg-mint-tint text-forest flex items-center justify-center text-xs font-bold hover:opacity-80 transition shrink-0"
              title="Sign out"
            >
              {initials || "•"}
            </button>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden">

          <div className="h-[62px] flex items-center justify-between">
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5"
            >
              <div className="w-9 h-9 rounded-[10px] bg-forest flex items-center justify-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 2v20M2 12h20"
                    stroke="#fff"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <span className="font-serif text-lg font-semibold text-ink">
                MediLens
              </span>
            </Link>

            <button
              onClick={() =>
                signOut({ callbackUrl: "/login" })
              }
              className="w-9 h-9 rounded-full bg-mint-tint text-forest flex items-center justify-center text-xs font-bold"
              title="Sign out"
            >
              {initials || "•"}
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-3 whitespace-nowrap">
            {links.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-xs ${
                    active
                      ? "bg-mint-tint text-forest font-semibold"
                      : "text-ink-soft"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </nav>
  );
}

