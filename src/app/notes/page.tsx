"use client";

import { useState } from "react";

export default function NotesPage() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  return (
    <main id="notes">
      <section>
        <div>
          <button>Save</button>
          {isEdit ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsEdit((prev) => !prev);
              }}
            >
              Edit
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsEdit((prev) => !prev);
              }}
            >
              View
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
