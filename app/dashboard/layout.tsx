"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/serverActions/auth/logout";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/dashboard/routines", label: "Routines", icon: "📋" },
    { href: "/dashboard/progress", label: "Progress", icon: "📈" },
    { href: "/dashboard/summary", label: "Summary", icon: "📝" },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col">
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-background-light/80 dark:bg-background-dark/80 border-b-2 border-slate-200 dark:border-[#23482c] shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Navigation Links */}
            <div className="flex items-center gap-2">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all
                      ${
                        isActive
                          ? "bg-primary text-[#112215] shadow-lg shadow-primary/30"
                          : "text-primary-content hover:bg-slate-100 dark:hover:bg-[#23482c]/30"
                      }
                    `}
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Logout Button */}
            <form action={logoutAction}>
              <button 
                type="submit"
                className="flex items-center justify-center gap-2 rounded-full h-10 px-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-bold shadow-lg shadow-red-500/30 hover:scale-105 active:scale-95 transition-all"
              >
                <span>Logout</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" fill="currentColor">
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </nav>
      <section className="flex flex-1 items-start justify-center px-6 py-12">
        {children}
      </section>
    </div>
  );
}