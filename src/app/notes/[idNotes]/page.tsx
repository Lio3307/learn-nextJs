import Editor from "@/components/editor";
import Viewer from "@/components/viewer";
import { useParams } from "next/navigation";

export default function NextDetailNote(){
    const {idNote} = useParams<{idNote: string}>()
    const isEdit = true

    return (
        <>
        {isEdit ? <Editor isEdit={isEdit} idNote={idNote} /> : <Viewer idNote={idNote}/>}
        </>
    )
}