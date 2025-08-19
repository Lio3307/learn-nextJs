"use client";

import { NotesType } from "@/app/type";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function Editor({
  isEdit,
  idNote,
}: {
  isEdit: boolean;
  idNote: string;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const [newTitle, setNewTitle] = useState<string | undefined>("");
  const [newDesc, setNewDesc] = useState<string | undefined>("");
  const [getUserId, setGetUserId] = useState<string>("");

  useEffect(() => {
    const unsubs = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setGetUserId(user.uid);
        setIsLoading(true);
        try {
          const docRef = doc(db, "Users", user.uid, "Notes", idNote);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const docData = docSnap.data() as NotesType;
            setNewTitle(docData?.title);
            setNewDesc(docData?.noteDesc);
          }
          setIsLoading(false);
        } catch (error) {
          throw new Error(`Cannot get note with this id : ${error}`);
        }
      }
    });

    return () => unsubs();
  }, [idNote]);

  const handleSaveNote = async () => {
    try {
      const docRef = doc(db, "Users", getUserId, "Notes", idNote);
      await updateDoc(docRef, {
        title: newTitle,
        noteDesc: newDesc,
      });
      alert("Successfully update note");
    } catch (error) {
      throw new Error(`Cannot update note : ${error}`);
    }
  };

  return (
    <div>
      <section>
        {isLoading ? (
          <div className="text-center text-gray-300 py-10">Loading...</div>
        ) : (
          <>
            {/* Action Buttons */}
            <div className="flex md:mt-0 mt-6 gap-4 items-center">
              <button
                disabled={isUpdating}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  try {
                    setIsUpdating(true);
                    handleSaveNote();
                  } finally {
                    setIsUpdating(false);
                  }
                }}
                className={`px-6 py-2 rounded-lg font-bold shadow-md text-white transition ${
                  isUpdating
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                }`}
              >
                {isUpdating ? "Updating..." : "Save"}
              </button>

              {isEdit ? (
                <button className="px-6 py-2 rounded-lg font-bold shadow-md bg-yellow-500 hover:bg-yellow-600 text-white transition">
                  Edit
                </button>
              ) : (
                <button className="px-6 py-2 rounded-lg font-bold shadow-md bg-gray-600 hover:bg-gray-700 text-white transition">
                  View
                </button>
              )}

              {isEdit && (
                <p className="ml-3 text-yellow-400 font-semibold underline underline-offset-2">
                  On Edit Mode
                </p>
              )}
            </div>

                            <p className="text-[0.89rem] text-white font-bold mt-6">Title : </p>

            <div className="w-full mt-2 space-y-4">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Note title..."
                className="w-full px-3 py-2 rounded-lg bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              <p className="text-[0.89rem] text-white font-bold">Desc : </p>
              <textarea
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full min-h-[23rem] p-3 rounded-lg bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none shadow-sm"
                placeholder="Write something..."
              />
            </div>
          </>
        )}
      </section>
    </div>
  );
}
