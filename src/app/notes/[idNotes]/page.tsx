"use client"

import Editor from "@/components/editor";
import Viewer from "@/components/viewer";
import { useParams } from "next/navigation";

export default function NextDetailNote(){
    const {idNotes} = useParams<{idNotes: string}>()
    const isEdit = true

    return (
        <>
        {isEdit ? <Editor isEdit={isEdit} idNote={idNotes} /> : <Viewer idNote={idNotes}/>}
        </>
    )
}