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
          <div>Loading...</div>
        ) : (
          <>
            <div className="flex md:mt-0 mt-[2.4rem] gap-4 items-center">
              <button
                disabled={isUpdating}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  try {
                    setIsUpdating(true);
                    handleSaveNote();
                  } finally {
                    setIsUpdating(false);
                  }
                }}
                className={`bg-blue-600 {isUpdating ? 'cursor-not-allowed' : 'hover:bg-blue-700 cursor-pointer'} text-white font-bold py-2 px-6 rounded-[0.67rem] shadow-md`}
              >
                {isUpdating ? "Updating..." : "Save"}
              </button>

              {isEdit ? (
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-[0.67rem] shadow-md">
                  Edit
                </button>
              ) : (
                <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-[0.67rem] shadow-md">
                  View
                </button>
              )}

              {isEdit && (
                <p className="text-yellow-400 font-bold underline underline-offset-2 ml-3">
                  On Edit Mode
                </p>
              )}
            </div>

            <div className="w-full mt-6">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => {
                  e.preventDefault();
                  if (!newTitle) {
                    setNewTitle("");
                  } else {
                    setNewTitle(e.target.value);
                  }
                }}
              />

              <textarea
                value={newDesc}
                onChange={(e) => {
                  e.preventDefault();
                  if (!newDesc) {
                    setNewDesc("");
                  } else {
                    setNewDesc(e.target.value);
                  }
                }}
                className="w-full min-h-[32rem] p-3 rounded-md bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Write something..."
              />
            </div>
          </>
        )}
      </section>
    </div>
  );
}
