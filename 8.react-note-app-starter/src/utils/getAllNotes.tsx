import { NoteCard } from "../components"
import { NotesContainer } from "../styles/styles"
import { Note } from "../types/note"

const filteredNotes = (notes: Note[], filter: string) => {

}

const getAllNotes = (mainNotes: Note[], filter: string) => {
    return (
        <>
        <div className="allNotes__notes-type">
            All Notes
        </div>
        <NotesContainer>
            {mainNotes.map((note) => (
                <NoteCard key = {note.id} note = {note} type = 'note'/>
            ))}
        </NotesContainer>
        </>
    )
}

export default getAllNotes;
