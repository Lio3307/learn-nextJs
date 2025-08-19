"use client"

import Editor from "@/components/editor";
import { useParams } from "next/navigation";

export default function NextDetailNote(){
    const {idNotes} = useParams<{idNotes: string}>()


    return (
        <>
        <Editor  idNote={idNotes} /> 
        </>
    )
}