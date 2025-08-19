"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", to: "" },
  { name: "Reports", to: "reports" },
  { name: "Settings", to: "settings" },
];

export default function SideNav({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const handleSignOut = () => {
    console.log("Signed out!");
  };

  return (
    <div className="h-screen bg-neutral-900 flex flex-col md:flex-row">
      <button
        onClick={() => setOpen(true)}
        aria-label="Open Sidebar"
        className="md:hidden fixed top-6 left-6 z-30 px-3 py-2 rounded-lg bg-neutral-800 text-white text-lg font-medium shadow-md hover:bg-neutral-700 transition"
      >
        ☰
      </button>

      {open && (
        <div
          className="fixed inset-0 md:hidden z-40 backdrop-blur-sm bg-black/40 transition-opacity"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 border-r border-neutral-700 shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto bg-gradient-to-b from-neutral-900 to-neutral-800 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between border-b border-neutral-700">
          <span className="font-semibold text-white text-lg">NoteThi</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="md:hidden text-3xl font-bold text-gray-400 hover:text-white transition-colors duration-300 bg-neutral-800 hover:bg-neutral-700 rounded-lg p-1.5"
          >
            ×
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <nav className="p-4 space-y-1">
            {navItems.map((t, i) => {
              const active = pathname === `/dashboard/${t.to}`;
              return (
                <Link
                  key={i}
                  href={`/dashboard/${t.to}`}
                  onClick={() => setOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-md font-medium transition-all duration-200 ${
                    active
                      ? "bg-blue-600 text-white font-semibold shadow-md"
                      : "text-gray-300 hover:text-white hover:bg-neutral-700"
                  }`}
                >
                  {t.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-neutral-700">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSignOut();
              }}
              className="w-full px-3 py-2 rounded-md font-semibold text-red-500 hover:text-white hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-neutral-800 to-neutral-900">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
