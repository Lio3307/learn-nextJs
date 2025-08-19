import SideNav from "@/components/navbar/side-bar";
import Viewer from "@/components/viewer";
import Editor from "@/components/editor";

export default function NotesPage() {
  const isEdit = true;
  return (
    <main id="notes">
      <SideNav>
        {isEdit ? <Editor isEdit={isEdit} /> : <Viewer />}
      </SideNav>
    </main>
  );
}
