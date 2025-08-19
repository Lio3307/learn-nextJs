"use client";

import { NotesType } from "@/app/type";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Editor({
  isEdit,
  idNote,
}: {
  isEdit: boolean;
  idNote: string;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const [noteData, setNoteData] = useState<NotesType | null>(null);

  const [newTitle, setNewTitle] = useState<string | undefined>(noteData?.title)
  const [newDesc, setNewDesc] = useState<string | undefined>(noteData?.noteDesc)


  useEffect(() => {
    const unsubs = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsLoading(true);
        try {
          const docRef = doc(db, "Users", user.uid, "Notes", idNote);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const docData = docSnap.data() as NotesType;
            setNoteData(docData);
          }
          setIsLoading(false);
        } catch (error) {
          throw new Error(`Cannot get note with this id : ${error}`);
        }
      }
    });

    return () => unsubs();
  }, [idNote]);

  return (
    <div>
      <section>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="flex md:mt-0 mt-[2.4rem] gap-4 items-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-[0.67rem] shadow-md">
                Save
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
              value={newTitle}
              onChange={(e) => {
                e.preventDefault()
                if(!newTitle){
                  setNewTitle("")
                }
              }}
              type="text" />
              <textarea
              value={newDesc}
              onChange={(e) => {
                e.preventDefault()
                if(!newDesc){
                  setNewDesc("")
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
