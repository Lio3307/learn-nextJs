"use client"


export default function Editor({isEdit}: {isEdit: boolean}) {
    return (
        <div>
             <section>
        <div>
          <button>Save</button>
          {isEdit ? (
            <button
              
            >
              Edit
            </button>
          ) : (
            <button
             
            >
              View
            </button>
          )}
        </div>
      </section>
        </div>
    )
}