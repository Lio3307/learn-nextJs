"use client"

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
    <div className="h-screen bg-neutral-900 text-gray-800 flex flex-col md:flex-row">
      <button
        onClick={() => setOpen(true)}
        aria-label="Open Sidebar"
        className="md:hidden fixed top-6 left-6 z-30 px-3 py-2 rounded-lg bg-neutral-900 text-white text-lg font-medium shadow-md"
      >
        ☰
      </button>

      {open && (
        <div
          className="fixed inset-0 md:hidden z-40 backdrop-blur-sm bg-black/20 transition-opacity"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 border-r border-gray-100 shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-3">
            
            <span className="font-semibold text-white text-lg">FinT</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="md:hidden text-3xl font-bold text-gray-500 hover:text-gray-700 transition-colors duration-300 bg-gray-100 hover:bg-gray-200 rounded-lg p-1.5"
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
                  className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
                    active
                      ? "bg-neutral-50 font-bold text-white "
                      : "text-white hover:text-black font-bold hover:bg-neutral-50 hover:text-neutra;-600"
                  }`}
                >
                  {t.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-100">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSignOut();
              }}
              className="w-full px-3 py-2 rounded-md font-bold text-red-600  cursor-pointer hover:bg-red-300 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
