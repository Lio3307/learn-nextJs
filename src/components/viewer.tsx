"use client"


import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { auth } from "../../config/firebase"

export default function Viewer(){


    useEffect(() => {
        const unsubs = onAuthStateChanged(auth, async(user) => {
            if(user){
                try {
                    
                } catch (error) {
                    throw new Error(`Cannot get the data : ${error}`);
                    
                }
            }
        })
        return () => unsubs()
    }, [])
    return (
        <div>

        </div>
    )
}