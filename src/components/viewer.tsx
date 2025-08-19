"use client"


import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth, db } from "../../config/firebase"
import { doc, getDoc } from "firebase/firestore"
import { NotesType } from "@/app/type"

export default function Viewer({idNote} : {idNote:string}){

    const [noteData, setNoteData] = useState<NotesType | null>(null)

    useEffect(() => {
        const unsubs = onAuthStateChanged(auth, async(user) => {
            if(user){
                try {
                    const docRef = doc(db, "Users", user.uid, "Notes", idNote)
                    const docSnap = await getDoc(docRef)
                    if(docSnap.exists()){
                        const docData = docSnap.data() as NotesType
                        setNoteData(docData)
                    }
                } catch (error) {
                    throw new Error(`Cannot get the data : ${error}`);
                    
                }
            }   
        })
        return () => unsubs()
    }, [idNote])
    return (
        <div>
            <p className="text-[1.4rem] text-white font-bold">Note title : {noteData?.title}</p>
            <p></p>
        </div>
    )
}