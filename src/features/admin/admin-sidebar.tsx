"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminLogoutAction } from "./admin-actions";
import type { AdminSession } from "@/services/admin/admin-auth-service";

const C = {
  sidebarBg: "#0f172a",
  sidebarText: "#94a3b8",
  sidebarActive: "#3b82f6",
  sidebarHover: "#1e293b",
};

const menu = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    href: "/admin/games",
    label: "Games",
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    href: "/admin/products",
    label: "Products",
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  },
  {
    href: "/admin/categories",
    label: "Categories",
    icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z",
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
  },
  {
    href: "/admin/support-topics",
    label: "Support",
    icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
  },
];

export function AdminSidebar({ session }: { session: AdminSession }) {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r"
      style={{
        backgroundColor: C.sidebarBg,
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-5">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold"
          style={{ backgroundColor: "#3b82f6", color: "#fff" }}
        >
          DM
        </div>
        <div>
          <p className="text-sm font-semibold text-white">DiaMart</p>
          <p className="text-xs" style={{ color: C.sidebarText }}>
            Admin panel
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {menu.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all"
              style={{
                backgroundColor: isActive
                  ? "rgba(59,130,246,0.12)"
                  : "transparent",
                color: isActive ? "#3b82f6" : C.sidebarText,
              }}
              onMouseEnter={(e) => {
                if (!isActive)
                  e.currentTarget.style.backgroundColor = C.sidebarHover;
              }}
              onMouseLeave={(e) => {
                if (!isActive)
                  e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <svg
                className="h-5 w-5 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={item.icon} />
              </svg>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User card */}
      <div
        className="mx-3 mb-2 rounded-lg p-3"
        style={{ backgroundColor: C.sidebarHover }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold"
            style={{ backgroundColor: "#3b82f6", color: "#fff" }}
          >
            {session.email.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">
              {session.email}
            </p>
            <p className="text-xs" style={{ color: "#3b82f6" }}>
              {session.role}
            </p>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="border-t border-white/10 px-3 py-3">
        <form action={adminLogoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
            style={{ color: C.sidebarText }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = C.sidebarHover)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
