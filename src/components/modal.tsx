"use client";

import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { createPortal } from "react-dom";
import { db } from "../../config/firebase";

type ModalProps = {
  onClose: () => void;
  userId: string;
};

export default function Modal({ onClose, userId }: ModalProps) {
  const portalRoot = document.getElementById("portal");
  const [createTitle, setCreateTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false)

  if (!portalRoot) return null;

  const handleConfirm = async () => {
    if (!createTitle.trim()) {
      alert("Input field cannot be empty!");
      return;
    }
    try {
        setIsLoading(true)
      const collRef = collection(db, "Users", userId, "Notes");
      const addNote = await addDoc(collRef, {
        title: createTitle,
        noteDesc: "",
      });
      await updateDoc(addNote, {
        noteId: addNote.id,
      });

      setCreateTitle("");
      setIsLoading(false)
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to create note!");
    }
  };

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-neutral-800 text-white rounded-lg shadow-lg p-6 relative w-[400px]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Create New Note</h2>

        <input
          type="text"
          value={createTitle}
          onChange={(e) => setCreateTitle(e.target.value)}
          placeholder="Enter note title..."
          className="w-full p-3 rounded-md bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className={`px-4 py-2 rounded-md bg-blue-600 ${ isLoading ? 'cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>,
    portalRoot
  );
}
