"use client"


export default function Editor({isEdit}: {isEdit: boolean}) {
    return (
       <div>
  <section>
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
  <textarea
    className="w-full min-h-[32rem] p-3 rounded-md bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
    placeholder="Write something..."
  />
</div>

  </section>
</div>


    )
}