import React from "react";
import SideNav from "@/components/navbar/side-bar";

export default function NoteLayout({children}: {children: React.ReactNode}){
    return (
        <SideNav>
            {children}
        </SideNav>
    )
}