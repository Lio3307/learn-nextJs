"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Modal from "../modal";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../../config/firebase";
import { NotesType } from "@/app/type";
import { collection, getDocs } from "firebase/firestore";

export default function SideNav({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [getUserId, setGetUserId] = useState<string>("");

  const [notesData, setNotesData] = useState<NotesType[]>([]);

  useEffect(() => {
    const unsubs = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setGetUserId(user.uid);
        try {
          const collRef = collection(db, "Users", user.uid, "Notes");
          const collSnap = await getDocs(collRef);
          if (!collSnap.empty) {
            const dataSnap = collSnap.docs.map((doc) => ({
              ...(doc.data() as NotesType),
            }));
            setNotesData(dataSnap);
          }
          setIsLoading(false);
        } catch (error) {
          throw new Error(`Cannot get Notes : ${error}`);
        }
      } else {
        window.location.href = "/";
        return;
      }
    });

    return () => unsubs();
  }, []);

  const handleSignOut = async () => {
    const confirmSignOut = confirm("Are you sure want to sign out?");
    if (!confirmSignOut) return;
    try {
      await signOut(auth);
      alert("Successfully sign out");
      window.location.href = "/";
    } catch (error) {
      throw new Error(`Cannot sign out : ${error}`);
    }
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
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="text-white rounded-[0.65rem] cursor-pointer text-[1.6rem] hover:bg-white hover:text-black font-bold text-center my-2 border-1 border-white py-1 px-24"
            >
              +
            </button>
            {isLoading ? (
              <p>Loading...</p>
            ) : notesData.length === 0 ? (
              <div className="flex justify-center">
                <p className="text-neutral-300 text-[0.8rem] text-center">
                  You dont have note{" "}
                </p>
              </div>
            ) : (
              notesData.map((data) => {
                const active = pathname === `/dashboard/${data.noteId}`;
                return (
                  <Link
                    key={data.noteId}
                    href={`/notes/${data.noteId}`}
                    onClick={() => setOpen(false)}
                    className={`flex mt-2 items-center px-3 py-2 rounded-md font-medium transition-all duration-200 ${
                      active
                        ? "bg-blue-600 text-white font-semibold shadow-md"
                        : "text-gray-300 hover:text-white hover:bg-neutral-700"
                    }`}
                  >
                    {data.title}
                  </Link>
                );
              })
            )}
          </nav>

          <div className="p-4 border-t border-neutral-700">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSignOut();
              }}
              className="w-full px-3 py-2 cursor-pointer rounded-md font-semibold text-red-500 hover:text-white hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-neutral-800 to-neutral-900">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {isModalOpen && (
            <Modal onClose={() => setIsModalOpen(false)} userId={getUserId} />
          )}
          {isLoading ? <p>Loading...</p> : children}
        </div>
      </main>
    </div>
  );
}
